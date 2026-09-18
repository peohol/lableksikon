import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const fid: PublishedTerm = {
  slug: "fid",
  title: "Flammeionisasjonsdetektor",
  category: "deteksjon",
  definition: "GC-detektor der eluaten forbrennes i en hydrogenflamme og de dannede ladningsbærerne gir en målbar elektrisk strøm.",
  aliases: ["FID", "flammeionisering", "flame ionization detector"],
  explanation: [
    { kind: "p", text: "Gassen fra GC-kolonnen føres inn i en hydrogenflamme med et elektrisk potensial over flammeområdet. Mange organiske forbindelser danner ladningsbærere i flammen, og den målte strømmen følger mengden stoff som passerer per tidsenhet." },
    { kind: "p", text: "FID har bred respons for mange organiske forbindelser, men er relativt lite responsiv overfor en rekke uorganiske stoffer. Det er en destruktiv detektor: analytten forbrennes under målingen." },
  ],
  demo: "fid-flamme",
  depth: {
    title: "Dybde: FID-respons er ikke lik for alle molekyler",
    blocks: [
      { kind: "p", text: "Responsen avhenger av forbindelsens kjemiske sammensetning. For mange organiske forbindelser følger responsen i stor grad hvor mye detekterbart karbon som passerer flammen, men ulike funksjonelle grupper kan gi ulike responsfaktorer." },
      { kind: "p", text: "I motsetning til [GC-MS](begrep:gcms) gir FID ikke et massespektrum. Detektoren er robust og kvantitativ, men identiteten må støttes av kromatografien og eventuelt andre informasjonskilder." },
    ],
  },
  sources: [SOURCES.iupacFID, SOURCES.iupacChromDetector],
  status: "publisert",
};