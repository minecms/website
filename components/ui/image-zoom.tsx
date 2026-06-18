"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type TransitionEvent,
} from "react";
import { createPortal } from "react-dom";

/** Отступ от краёв viewport при зуме (как в zoom-vanilla.js). */
const ZOOM_MARGIN = 80;
const SCROLL_CLOSE_THRESHOLD = 40;

interface PageRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ZoomSession {
  rect: PageRect;
  scale: number;
  translateX: number;
  translateY: number;
  src: string;
  alt: string;
  isOpen: boolean;
}

function getPageRect(el: HTMLElement): PageRect {
  const rect = el.getBoundingClientRect();
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  const scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    width: rect.width,
    height: rect.height,
  };
}

function getPageScrollY(): number {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function getPageScrollX(): number {
  return (
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0
  );
}

/** Масштаб зума — порт логики из zoom-vanilla.js. */
function computeScale(
  naturalWidth: number,
  naturalHeight: number,
  displayWidth: number,
): number {
  const maxHeight = window.innerHeight - ZOOM_MARGIN;
  const maxWidth = window.innerWidth - ZOOM_MARGIN;
  const zoomRatio = naturalWidth / displayWidth;

  if (naturalWidth < maxWidth && naturalHeight < maxHeight) {
    return zoomRatio;
  }

  const viewportRatio = maxWidth / maxHeight;
  const imageRatio = naturalWidth / naturalHeight;

  if (viewportRatio > imageRatio) {
    return (maxHeight / naturalHeight) * zoomRatio;
  }
  return (maxWidth / naturalWidth) * zoomRatio;
}

export interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  /** Растянуть изображение на родительский relative-контейнер. */
  fill?: boolean;
  loading?: "lazy" | "eager";
}

/**
 * Medium-style зум изображения (порт zoom-vanilla.js для React 19).
 * Клик — увеличить; повторный клик, скролл, Escape или свайп — уменьшить.
 * ⌘/Ctrl + клик — открыть оригинал в новой вкладке.
 */
export function ImageZoom({
  src,
  alt,
  className = "",
  fill = false,
  loading = "lazy",
}: ImageZoomProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number | null>(null);
  const touchYRef = useRef<number | null>(null);
  const sessionRef = useRef<ZoomSession | null>(null);
  const [session, setSession] = useState<ZoomSession | null>(null);
  const [mounted, setMounted] = useState(false);

  sessionRef.current = session;

  useEffect(() => setMounted(true), []);

  const dispose = useCallback(() => {
    setSession(null);
    scrollYRef.current = null;
    touchYRef.current = null;
    document.body.classList.remove(
      "zoom-overlay-open",
      "zoom-overlay-transitioning",
    );
  }, []);

  const close = useCallback(() => {
    setSession((current) => {
      if (!current?.isOpen) return current;
      document.body.classList.remove("zoom-overlay-open");
      document.body.classList.add("zoom-overlay-transitioning");
      return { ...current, isOpen: false };
    });
  }, []);

  const handleWrapTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.target !== wrapRef.current || event.propertyName !== "transform") {
        return;
      }
      if (sessionRef.current?.isOpen) return;
      dispose();
    },
    [dispose],
  );

  const openZoom = useCallback(
    (event: MouseEvent<HTMLImageElement>) => {
      const img = imgRef.current;
      if (!img || sessionRef.current) return;

      if (event.metaKey || event.ctrlKey) {
        window.open(img.currentSrc || img.src, "_blank", "noopener,noreferrer");
        return;
      }

      event.stopPropagation();

      const { naturalWidth, naturalHeight } = img;
      if (!naturalWidth || !naturalHeight) return;

      const rect = getPageRect(img);
      const scale = computeScale(naturalWidth, naturalHeight, rect.width);
      const centerY = rect.top + rect.height / 2;
      const centerX = rect.left + rect.width / 2;
      const viewportCenterY = getPageScrollY() + window.innerHeight / 2;
      const viewportCenterX = getPageScrollX() + window.innerWidth / 2;

      const nextSession: ZoomSession = {
        rect,
        scale,
        translateX: Math.round(viewportCenterX - centerX),
        translateY: Math.round(viewportCenterY - centerY),
        src: img.currentSrc || img.src,
        alt,
        isOpen: false,
      };

      setSession(nextSession);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSession((current) => {
            if (!current) return current;
            document.body.classList.add("zoom-overlay-open");
            return { ...current, isOpen: true };
          });
        });
      });
    },
    [alt],
  );

  useEffect(() => {
    if (!session) return;

    const onScroll = () => {
      if (scrollYRef.current === null) {
        scrollYRef.current = getPageScrollY();
        return;
      }
      if (Math.abs(scrollYRef.current - getPageScrollY()) >= SCROLL_CLOSE_THRESHOLD) {
        close();
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const onClick = (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      close();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.pageY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const startY = touchYRef.current;
      const currentY = event.touches[0]?.pageY;
      if (startY == null || currentY == null) return;
      if (Math.abs(currentY - startY) > 10) {
        close();
        touchYRef.current = null;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("click", onClick, true);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [session, close]);

  const thumbClass = [
    "image-zoom-thumb",
    fill ? "absolute inset-0 size-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const portal =
    session && mounted
      ? createPortal(
          <>
            <div className="zoom-overlay" aria-hidden />
            <div
              ref={wrapRef}
              className="zoom-img-wrap"
              style={{
                position: "absolute",
                top: session.rect.top,
                left: session.rect.left,
                width: session.rect.width,
                transform: session.isOpen
                  ? `translate(${session.translateX}px, ${session.translateY}px) translateZ(0)`
                  : "translate(0, 0) translateZ(0)",
              }}
              onTransitionEnd={handleWrapTransitionEnd}
            >
              <img
                src={session.src}
                alt={session.alt}
                className="zoom-img"
                draggable={false}
                style={{
                  width: session.rect.width,
                  transform: session.isOpen ? `scale(${session.scale})` : "scale(1)",
                }}
              />
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        data-action="zoom"
        className={thumbClass}
        onClick={openZoom}
        style={session ? { visibility: "hidden" } : undefined}
      />
      {portal}
    </>
  );
}
