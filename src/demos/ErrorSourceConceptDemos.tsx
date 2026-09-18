import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import styles from "./QualityConceptDemos.module.css";

export function GrovfeilDemo() {
  return (
    <DemonstrationFrame
      kind="sammenligning"
      instruction="Sammenlign normal målevariasjon med en hendelse som gjør resultatet ugyldig."
      label="Grov feil er ikke det samme som tilfeldig eller systematisk målefeil"
      afterword="Et ekstremt resultat kan gi mistanke, men årsaken må undersøkes. «Uteligger» er ikke i seg selv en diagnose på tabbe."
    >
      <div className={styles.columns}>
        <div>
          <span className={styles.cardTitle}>Tilfeldig målefeil</span>
          <span>Repeterte resultater varierer uforutsigbart rundt et nivå.</span>
          <span>Håndteres gjennom presisjon og måleusikkerhet.</span>
        </div>
        <div>
          <span className={styles.cardTitle}>Systematisk målefeil</span>
          <span>Resultater påvirkes på en konstant eller forutsigbar måte.</span>
          <span>Kjente betydelige effekter korrigeres når det er mulig.</span>
        </div>
        <div>
          <span className={styles.cardTitle}>Grov feil / tabbe</span>
          <span>Forbyttet prøve, feil enhet eller entydig feilregistrering.</span>
          <span>Stopp, undersøk og håndter berørt resultat som avvik.</span>
        </div>
      </div>
    </DemonstrationFrame>
  );
}
