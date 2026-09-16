import { categoryName, getTerm, parseInline, type Block } from "@/content";
import { ConceptLink } from "./ConceptLink";
import styles from "./Prose.module.css";

/**
 * Løpende lesetekst. Begrepslenker slås opp her, på serveren, slik at
 * forhåndsvisningen får tittel og definisjon fra begrepets egen post.
 */
function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((node, index) => {
        if (node.type === "text") return <span key={index}>{node.value}</span>;
        const target = getTerm(node.slug);
        // Validering hindrer at dette skjer; fallback holder teksten lesbar.
        if (!target) return <span key={index}>{node.label}</span>;
        return (
          <ConceptLink
            key={index}
            slug={target.slug}
            label={node.label}
            title={target.title}
            definition={target.definition}
            categoryName={categoryName(target.category)}
          />
        );
      })}
    </>
  );
}

export function Prose({
  blocks,
  variant,
}: {
  blocks: Block[];
  variant: "explanation" | "depth";
}) {
  return (
    <div className={variant === "depth" ? styles.depth : styles.explanation}>
      {blocks.map((block, index) => {
        if (block.kind === "h3") {
          return (
            <h3 key={index} className={`kicker kicker-accent ${styles.heading}`}>
              {block.text}
            </h3>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={index} className={styles.list}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className={styles.paragraph}>
            <InlineText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
