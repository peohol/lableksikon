import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const presisjon: PublishedTerm = {
  slug: "presisjon",
  title: "Presisjon",
  category: "kvalitet",
  definition: "Hvor godt gjentatte målinger stemmer overens med hverandre under spesifiserte betingelser.",
  aliases: ["precision", "spredning", "RSD", "standardavvik", "gjentak", "pilkast"],
  explanation: [
    { kind: "p", text: "Tenk på pilkast. Presisjon handler om hvor tett pilene sitter samlet, ikke om de treffer midten. En tett klynge i feil del av skiva kan derfor være svært presis og samtidig systematisk feil." },
    { kind: "p", text: "Presisjon må alltid knyttes til betingelsene for gjentakelsen. [Repeterbarhet](begrep:repeterbarhet), [intermediær presisjon](begrep:intermediar) og [reproduserbarhet](begrep:reproduserbarhet) beskriver ulike nivåer av slike betingelser." },
  ],
  demo: "presisjon-spredning",
  depth: {
    title: "Dybde: standardavvik, RSD og presisjonsbetingelser",
    blocks: [
      { kind: "p", text: "Presisjon uttrykkes vanligvis med mål på spredning, som standardavvik, varians eller relativt standardavvik (RSD). Estimatet er selv usikkert når antallet replikater er lite." },
      { kind: "p", text: "Et presisjonstall uten opplysninger om forsøksbetingelser er ufullstendig. Korttidsvariasjon i én serie og variasjon over flere laboratorier svarer på ulike spørsmål og kan ikke brukes om hverandre." },
      { kind: "p", text: "Presisjon beskriver tilfeldig variasjon, ikke [systematisk skjevhet](begrep:skjevhet). Begge deler er relevante når et måleresultat og dets [måleusikkerhet](begrep:maleusikkerhet) vurderes." },
    ],
  },
  sources: [SOURCES.vimPrecision, SOURCES.eurachem2025],
  status: "publisert",
};
