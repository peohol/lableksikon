import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const provelagring: PublishedTerm = {
  slug: "provelagring",
  title: "Prøvelagring",
  category: "prove",
  definition: "Kontrollerte betingelser og tidsrom mellom prøvetaking eller mottak og analyse som skal bevare prøvens integritet tilstrekkelig for formålet.",
  aliases: ["sample storage", "oppbevaring", "holdbarhet", "stabilitet", "frysing", "lagringstid"],
  explanation: [
    { kind: "p", text: "En prøve trenger ikke være kjemisk uforanderlig for å kunne lagres, men endringene må være små nok til at resultatet fortsatt er gyldig for formålet. Temperatur, lys, tid, beholder, pH og fryse-tine-sykluser kan være viktige." },
    { kind: "p", text: "Stabilitet er analytt- og matriksavhengig. En oppbevaringsbetingelse som fungerer for ett stoff i plasma, kan være uegnet for et annet stoff eller en annen prøvetype." },
  ],
  demo: "provelagring-betingelser",
  depth: {
    title: "Dybde: lagring kan endre både analytt og matriks",
    blocks: [
      { kind: "p", text: "Under lagring kan analytten brytes ned, fordampe, adsorbere til beholderen, reagere kjemisk eller omfordeles mellom faser. Matriksen kan også endres på måter som påvirker [matriseeffekt](begrep:matriseeffekt) eller prøveopparbeiding." },
      { kind: "p", text: "Eurachem anbefaler lagringsbetingelser som beskytter prøvens integritet og hindrer forringelse, [kontaminering](begrep:kontaminering), [krysskontaminering](begrep:krysskontaminering) og tap av identitet. Spesifikke krav fra metode eller leverandør skal følges når de finnes." },
      { kind: "p", text: "Stabilitetsstudier bør gjenspeile faktisk arbeidsflyt, inkludert forventet lagringstid, transport, temperaturavvik og relevante fryse-tine-sykluser." },
    ],
  },
  sources: [SOURCES.eurachemQac2026, SOURCES.eurachem2025],
  status: "publisert",
};
