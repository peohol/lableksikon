import type { PublishedTerm } from "../schema";

export const presisjon: PublishedTerm = {
  slug: "presisjon",
  title: "Presisjon",
  category: "kvalitet",
  definition:
    "Hvor likt resultatet blir når samme prøve måles flere ganger under samme betingelser.",
  aliases: ["spredning", "gjentak", "RSD", "standardavvik", "pilkast", "repeterbarhet"],
  explanation: [
    {
      kind: "p",
      text: "Tenk på pilkast. Presisjon handler bare om hvor tett pilene sitter samlet, ikke om de treffer blinken. Sitter alle pilene i samme hjørne av skiva, er kastet presist — og likevel feil.",
    },
    {
      kind: "p",
      text: "På laben betyr det at du kan måle samme prøve seks ganger og få nesten samme tall hver gang, selv om nivået er systematisk forskjøvet. Hvor nær sannheten tallet ligger, hører til [riktighet](begrep:noyaktighet) og [måleusikkerhet](begrep:maleusikkerhet).",
    },
  ],
  demo: "presisjon-spredning",
  depth: {
    title: "Dybde: standardavvik, RSD og hvilken presisjon som måles",
    blocks: [
      {
        kind: "p",
        text: "Presisjon tallfestes som standardavviket s for n gjentatte målinger, oftest relativt: RSD = s / x̄ · 100 %. Med få gjentak er s selv et usikkert estimat, og n = 6 er et vanlig minimum i metodevalidering.",
      },
      {
        kind: "p",
        text: "Nivået må oppgis. Repeterbarhet er samme operatør, samme instrument, samme dag. Intermediær presisjon varierer dag og operatør innen ett laboratorium. Reproduserbarhet er mellom laboratorier, og gir alltid høyere RSD.",
      },
      {
        kind: "p",
        text: "Presisjon inngår som ett bidrag i [måleusikkerhet](begrep:maleusikkerhet), men dekker ikke systematisk skjevhet.",
      },
    ],
  },
  status: "publisert",
};
