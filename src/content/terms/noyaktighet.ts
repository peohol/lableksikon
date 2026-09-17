import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const noyaktighet: PublishedTerm = {
  slug: "noyaktighet",
  title: "Riktighet, presisjon og nøyaktighet",
  category: "kvalitet",
  definition:
    "Nøyaktighet beskriver hvor nær et måleresultat ligger den sanne verdien; begrepet er kvalitativt og er nært knyttet til både riktighet og presisjon.",
  aliases: ["accuracy", "trueness", "riktighet", "skjevhet", "bias", "nøyaktig"],
  explanation: [
    {
      kind: "p",
      text: "Tre ord ligger tett, men betyr ikke det samme. [Presisjon](begrep:presisjon) beskriver hvor godt gjentatte målinger stemmer overens. Riktighet beskriver hvor nær gjennomsnittet av svært mange gjentatte målinger ligger en referanseverdi. Nøyaktighet handler om hvor nær et enkelt måleresultat ligger den sanne verdien.",
    },
    {
      kind: "p",
      text: "I praksis vurderer man ikke nøyaktighet med ett eget tall. God nøyaktighet forutsetter at både tilfeldige og systematiske feil er små. Systematiske avvik undersøkes blant annet som [skjevhet](begrep:skjevhet), mens tilfeldige variasjoner beskrives gjennom presisjon.",
    },
  ],
  demo: "riktighet-skiver",
  depth: {
    title: "Dybde: VIM skiller mellom accuracy, trueness og precision",
    blocks: [
      {
        kind: "p",
        text: "VIM definerer measurement accuracy som nærhet mellom en målt verdi og en sann verdi for målestørrelsen. Accuracy er ikke en størrelse og gis derfor ikke en numerisk verdi. Begrepet er relatert til både riktighet og presisjon, men skal ikke brukes som synonym for noen av dem.",
      },
      {
        kind: "p",
        text: "Measurement trueness er nærhet mellom gjennomsnittet av et uendelig antall gjentatte målinger og en referanseverdi. Riktighet er heller ikke en størrelse; numeriske mål på systematisk avvik uttrykkes blant annet som [skjevhet](begrep:skjevhet).",
      },
      {
        kind: "p",
        text: "Denne terminologien er viktig fordi god [presisjon](begrep:presisjon) ikke garanterer god riktighet, og god riktighet ikke garanterer liten spredning i enkeltmålinger.",
      },
    ],
  },
  sources: [SOURCES.vim, SOURCES.eurachemValidation],
  status: "publisert",
};
