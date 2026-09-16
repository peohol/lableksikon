/** «1 begrep» / «18 begreper». Brukes i tellere over hele appen. */
export function termCountLabel(count: number): string {
  return count === 1 ? "1 begrep" : `${count} begreper`;
}

/** Posisjon i kategorien, slik den vises over begrepstittelen. */
export function positionLabel(index: number, total: number): string {
  return total === 1 ? "eneste begrep i kategorien" : `${index} av ${total}`;
}
