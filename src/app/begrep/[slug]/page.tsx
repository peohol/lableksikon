import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DepthDisclosure } from "@/components/DepthDisclosure";
import { PreviousNextNavigation } from "@/components/PreviousNextNavigation";
import { Prose } from "@/components/Prose";
import {
  categoryName,
  getNeighbours,
  getTerm,
  orderedTerms,
  positionInCategory,
} from "@/content";
import { TermDemonstration } from "@/demos/registry";
import { positionLabel } from "@/lib/labels";
import styles from "./page.module.css";

export function generateStaticParams() {
  return orderedTerms.map((term) => ({ slug: term.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) return {};
  return {
    title: term.title,
    description: term.definition,
    alternates: { canonical: `/begrep/${term.slug}` },
    openGraph: {
      title: `${term.title} — Lableksion`,
      description: term.definition,
      url: `/begrep/${term.slug}`,
    },
  };
}

export default async function TermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) notFound();

  const position = positionInCategory(term.slug);
  const neighbours = getNeighbours(term.slug);

  // Strukturert data: et oppslagsverk er nettopp en samling definerte begreper.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.title,
    description: term.definition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Lableksion",
      url: "/",
    },
    termCode: term.slug,
    url: `/begrep/${term.slug}`,
    inLanguage: "nb",
  };

  return (
    <article className={styles.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={styles.text}>
        <p className={styles.kickerRow}>
          <Link href={`/kategori/${term.category}`} className={`kicker kicker-accent ${styles.categoryLink}`}>
            {categoryName(term.category)}
          </Link>
          {position ? (
            <span className={`kicker ${styles.position}`}>
              {positionLabel(position.index, position.total)}
            </span>
          ) : null}
        </p>
        <h1 className={styles.title}>{term.title}</h1>
        <p className={styles.definition}>{term.definition}</p>
      </header>

      <div className={`${styles.text} ${styles.explanation}`}>
        <Prose blocks={term.explanation} variant="explanation" />
      </div>

      <TermDemonstration demo={term.demo} />

      <div className={styles.text}>
        <DepthDisclosure title={term.depth.title}>
          <Prose blocks={term.depth.blocks} variant="depth" />
        </DepthDisclosure>
      </div>

      {neighbours ? (
        <PreviousNextNavigation
          current={term}
          previous={neighbours.previous}
          next={neighbours.next}
        />
      ) : null}
    </article>
  );
}
