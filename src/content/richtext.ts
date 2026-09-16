import type { Block } from "./schema";

/**
 * Inline-markup i lesetekst er bevisst minimal: bare begrepslenker, skrevet
 * som `[synlig tekst](begrep:slug)`. Teksten som vises kan bøyes fritt
 * («lineariteten»), mens slug-en er den eneste referansen til begrepet.
 * Definisjonen hentes alltid fra begrepet selv — aldri kopiert inn i teksten.
 */
const CONCEPT_LINK = /\[([^\]\n]+)\]\(begrep:([a-z0-9-]+)\)/g;

export type InlineNode =
  | { type: "text"; value: string }
  | { type: "concept"; slug: string; label: string };

export function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(CONCEPT_LINK)) {
    const index = match.index;
    if (index > lastIndex) {
      nodes.push({ type: "text", value: text.slice(lastIndex, index) });
    }
    nodes.push({ type: "concept", label: match[1] as string, slug: match[2] as string });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push({ type: "text", value: text.slice(lastIndex) });
  }
  return nodes;
}

/** Alle slugs det lenkes til fra en blokkliste. */
export function conceptLinksIn(blocks: Block[]): string[] {
  const slugs: string[] = [];
  for (const block of blocks) {
    const texts = block.kind === "ul" ? block.items : [block.text];
    for (const text of texts) {
      for (const node of parseInline(text)) {
        if (node.type === "concept") slugs.push(node.slug);
      }
    }
  }
  return slugs;
}

/** Ren tekst uten markup — brukes til metadata og tester. */
export function plainText(text: string): string {
  return parseInline(text)
    .map((node) => (node.type === "text" ? node.value : node.label))
    .join("");
}
