import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Siden finnes ikke.</h1>
      <p className={styles.body}>
        Lenken kan være utdatert, eller begrepet er ikke publisert ennå. Søk i headeren, eller gå
        videre herfra.
      </p>
      <div className={styles.actions}>
        <Link href="/" className="button button-primary">
          Vis alle kategorier
        </Link>
        <Link href="/a-aa" className="button button-secondary">
          Alle begreper A–Å
        </Link>
      </div>
    </div>
  );
}
