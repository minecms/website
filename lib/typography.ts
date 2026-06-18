/** Inserts non-breaking spaces before Russian short words (типографика). */
export function typo(text: string): string {
  const words = [
    "что",
    "как",
    "из",
    "за",
    "на",
    "но",
    "не",
    "ни",
    "об",
    "от",
    "во",
    "до",
    "со",
    "то",
    "же",
    "ли",
    "бы",
    "по",
    "и",
    "в",
    "с",
    "к",
    "у",
    "о",
    "а",
  ];
  let result = text;
  for (const w of words) {
    result = result.replace(
      new RegExp(`(^|\\s+)(${w})(\\s+)`, "gi"),
      (_, before, word) => `${before}${word}\u00A0`,
    );
  }
  return result;
}
