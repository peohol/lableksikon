import type { PublishedTerm } from "../schema";

export const standardavvik: PublishedTerm = {
  slug: "standardavvik",
  title: "Standardavvik",
  category: "statistikk",
  definition: "Et mål på hvor langt målingene typisk ligger fra gjennomsnittet.",
  aliases: ["s", "sigma", "spredning", "varians", "formel", "RSD"],
  explanation: [
    {
      kind: "p",
      text: "Standardavviket er et mål på hvor langt målingene typisk ligger fra gjennomsnittet. Er alle tallene nesten like, er det lite. Spriker de, er det stort.",
    },
    {
      kind: "p",
      text: "Regnestykket gjør tre ting: finner avstanden fra gjennomsnittet for hver måling, kvadrerer avstandene slik at fortegnet ikke betyr noe, og tar til slutt kvadratroten for å komme tilbake til samme enhet som målingene.",
    },
  ],
  demo: "standardavvik-formel",
  depth: {
    title: "Dybde: utvalg mot populasjon, frihetsgrader og pooling — lang gjennomgang",
    blocks: [
      { kind: "h3", text: "Utvalg eller populasjon" },
      {
        kind: "p",
        text: "Formelen over gjelder et utvalg, og deler på n − 1. Populasjonsstandardavviket σ deler på n, og brukes bare når alle enheter i populasjonen faktisk er målt. I laboratoriesammenheng er det praktisk talt aldri tilfelle, så s er standardvalget. Forskjellen er merkbar ved små n: med n = 3 gir n − 1 et estimat som er rundt 22 % høyere enn n-varianten, og det er den høyere verdien som er riktig.",
      },
      { kind: "h3", text: "Frihetsgrader" },
      {
        kind: "p",
        text: "Antall frihetsgrader er antall uavhengige opplysninger som er tilgjengelige for å estimere spredningen. Når gjennomsnittet er beregnet fra de samme dataene, er n − 1 av avvikene fritt varierende; det siste er bestemt av at avvikene summerer til null. Frihetsgradene bestemmer også hvilken t-verdi som skal brukes når standardavviket omregnes til et konfidensintervall, og hvor sterkt et enkelt uteliggende punkt får slå ut.",
      },
      { kind: "h3", text: "Sammenslått standardavvik" },
      {
        kind: "p",
        text: "Et standardavvik basert på seks målinger er selv et usikkert tall; den relative estimeringsfeilen er omtrent 1/√(2(n−1)), altså rundt 32 % ved n = 6. Derfor slås spredningsestimater fra flere serier sammen til et pooled standardavvik, der hver serie vektes med sine frihetsgrader: s_p² = Σ(νᵢ · sᵢ²) / Σνᵢ. Et pooled s fra tjue serier er et langt mer stabilt grunnlag for kontrollgrenser og for usikkerhetsbudsjettet enn et enkelt gjentaksforsøk.",
      },
      { kind: "h3", text: "Forholdet til usikkerhet" },
      {
        kind: "p",
        text: "Standardavviket beskriver tilfeldig variasjon og går inn som standardusikkerhet for det bidraget. Det fanger ikke systematisk skjevhet: en metode kan ha svært lite s og likevel ligge konsekvent 15 % for lavt. Se [riktighet, presisjon og nøyaktighet](begrep:noyaktighet) og [måleusikkerhet](begrep:maleusikkerhet).",
      },
    ],
  },
  status: "publisert",
};
