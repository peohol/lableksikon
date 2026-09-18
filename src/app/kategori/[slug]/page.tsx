import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TermListItem } from "@/components/TermListItem";
import { getCategory, publishedCategories, termsInCategory } from "@/content";
import { termCountLabel } from "@/lib/labels";
import styles from "./page.module.css";

export function generateStaticParams() {
  return publishedCategories.map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.gloss,
    alternates: { canonical: `/kategori/${category.slug}` },
    openGraph: {
      type: "website",
      locale: "nb_NO",
      siteName: "Lableksion",
      title: `${category.name} — Lableksion`,
      description: category.gloss,
      url: `/kategori/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const terms = termsInCategory(category.slug);

  return (
    <div className={styles.page}>
      <Link href="/" className="text-link">
        ← Alle kategorier
      </Link>
      <h1 className={styles.title}>{category.name}</h1>
      <p className={`lead ${styles.gloss}`}>{category.gloss}</p>
      <p className={styles.count}>{termCountLabel(terms.length)}</p>
      <div>
        {terms.map((term) => (
          <TermListItem
            key={term.slug}
            slug={term.slug}
            title={term.title}
            definition={term.definition}
          />
        ))}
      </div>
    </div>
  );
}
