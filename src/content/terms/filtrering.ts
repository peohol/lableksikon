import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const filtrering: PublishedTerm = {
  slug: "filtrering",
  title: "Filtrering",
  category: "provetaking",
  definition: "Separasjon der en prøve føres gjennom et porøst medium som holder tilbake materiale etter størrelse og andre filter–prøve-interaksjoner.",
  aliases: ["filtration", "filter", "membran", "syringe filter"],
  explanation: [
    { kind: "p", text: "I analytisk prøveopparbeiding brukes filtrering ofte for å fjerne partikler før videre behandling eller instrumentanalyse. Filterets porestørrelse og materiale må passe formålet." },
    { kind: "p", text: "Filtrering er ikke nødvendigvis nøytral for analytten. Stoff kan adsorberes til filteret, og analytt som sitter på partikler kan fjernes sammen med partiklene. Hva som skal måles må derfor avgjøre om og hvordan prøven filtreres." },
  ],
  demo: "filtrering-fraksjoner",
  depth: {
    title: "Dybde: filtratet og materialet på filteret kan representere ulike målestørrelser",
    blocks: [
      { kind: "p", text: "Ved analyse av «oppløst» fraksjon kan partikkelfjerning være en definert del av måleprosedyren. Ved analyse av totalinnhold kan den samme filtreringen gi systematisk lavt resultat dersom analytten er partikkelbundet." },
      { kind: "p", text: "Filterblank, adsorpsjonstap og [kontaminering](begrep:kontaminering) fra filtermaterialet kan være relevante kontrollpunkter ved validering." },
    ],
  },
  sources: [SOURCES.iupacSamplePretreatment, SOURCES.eurachemQac2026],
  status: "publisert",
};