import { z } from "zod";
import { DEMO_IDS } from "@/demos/ids";

/** Slug-format: små bokstaver, tall og bindestrek. Brukes direkte i URL-er. */
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug må være små bokstaver, tall og bindestrek");

export const categorySchema = z.object({
  slug: slugSchema,
  /** Kategorinavn slik det vises i kicker, kategoriside og forrige/neste. */
  name: z.string().min(1),
  /** Kategoriens spørsmålslinje på forsiden og kategorisiden. */
  gloss: z.string().min(1),
});

export type Category = z.infer<typeof categorySchema>;

/**
 * Blokkformat for lesetekst. Inline-markup i `text` er begrenset til
 * begrepslenker: `[synlig tekst](begrep:slug)`. Definisjoner kopieres aldri
 * inn i teksten — lenken refererer til slug, og forhåndsvisningen henter
 * definisjonen fra begrepet selv.
 */
export const blockSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("p"), text: z.string().min(1) }),
  z.object({ kind: z.literal("h3"), text: z.string().min(1) }),
  z.object({ kind: z.literal("ul"), items: z.array(z.string().min(1)).min(2) }),
]);

export type Block = z.infer<typeof blockSchema>;

export const demoIdSchema = z.enum(DEMO_IDS);
export type DemoId = z.infer<typeof demoIdSchema>;

/**
 * Et publisert begrep. Alt som trengs for den offentlige siden må være på
 * plass: definisjon, enkel forklaring, demonstrasjon og dybde. Det finnes
 * ingen offentlig «ufullstendig begrep»-tilstand (handoff, låst beslutning).
 */
export const publishedTermSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  category: slugSchema,
  /** Den eneste kilden til definisjonen: søk, lister, popover og begrepsside. */
  definition: z.string().min(1),
  explanation: z.array(blockSchema).min(1),
  depth: z.object({
    title: z.string().min(1),
    blocks: z.array(blockSchema).min(1),
  }),
  demo: demoIdSchema,
  /** Synonymer og beslektede ord for søk. Skrives i grunnform. */
  aliases: z.array(z.string().min(1)),
  status: z.literal("publisert"),
});

export type PublishedTerm = z.infer<typeof publishedTermSchema>;

/**
 * Begrep som ennå ikke har komplett innhold. Disse finnes bare som redaksjonell
 * kø — de får aldri en offentlig side, og er usynlige i søk, lister og A–Å.
 */
export const draftTermSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  category: slugSchema,
  definition: z.string().min(1),
  aliases: z.array(z.string()),
  status: z.literal("utkast"),
});

export type DraftTerm = z.infer<typeof draftTermSchema>;

export type Term = PublishedTerm | DraftTerm;
