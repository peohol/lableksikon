import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const grovfeil: PublishedTerm = {
  slug: "grovfeil",
  title: "Grov feil",
  category: "feilkilder",
  definition: "En klar feilhandling eller funksjonssvikt som kan gjøre en måling eller et resultat ugyldig, for eksempel prøveforbytting, feilregistrering eller alvorlig avvik fra prosedyren.",
  aliases: ["grovfeil", "blunder", "spurious error", "mistake", "tabbe", "forbyttet prøve", "transkripsjonsfeil"],
  explanation: [
    { kind: "p", text: "«Grov feil» brukes her om det Eurachem kaller spurious error eller blunder. VIM skiller slike feilhandlinger fra measurement error: tilfeldig og systematisk målefeil er egenskaper ved måleprosessen, mens en tabbe er en hendelse som for eksempel feil prøve-ID, feil enhet eller alvorlig instrumentfeil." },
    { kind: "p", text: "Når en grov feil oppdages, skal den ikke bare «regnes inn» som vanlig variasjon. Berørt arbeid må undersøkes gjennom [avviksbehandling](begrep:avviksbehandling). Hvis feilen kan korrigeres nøyaktig og etterprøvbart, som en entydig transkripsjonsfeil, kan korrigering være mulig; ellers kan resultatet være ugyldig." },
  ],
  demo: "grovfeil-skille",
  depth: {
    title: "Dybde: uteligger er et observasjonsmønster, ikke en årsaksdiagnose",
    blocks: [
      { kind: "p", text: "En [uteligger](begrep:uteligger) kan være et tegn på en grov feil, men er ikke bevis for det. Et ekstremt resultat kan også skyldes reell variasjon eller en annen fordeling enn forventet. Derfor bør et resultat ikke forkastes bare fordi en statistisk test merker det som avvikende." },
      { kind: "p", text: "Eurachems veiledning om [måleusikkerhet](begrep:maleusikkerhet) tar ikke sikte på å dekke grove feil eller tabber. Slike hendelser skal forebygges, oppdages og håndteres som avvik, ikke bygges inn som en normal usikkerhetskomponent." },
    ],
  },
  sources: [SOURCES.vimMeasurementError, SOURCES.eurachemQuam2012],
  status: "publisert",
};
