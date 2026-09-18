import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const fragmentering: PublishedTerm = {
  slug: "fragmentering",
  title: "Fragmentering",
  category: "deteksjon",
  definition: "Spalting av et ion slik at det dannes ett eller flere mindre fragmenter, hvorav minst ett kan være et ladd produktion.",
  aliases: ["fragmentation", "fragmention", "product ion", "MS/MS", "CID"],
  explanation: [
    { kind: "p", text: "Fragmentering kan oppstå allerede under [ionisering](begrep:ionisering), eller fremkalles bevisst i tandem-[massespektrometri](begrep:massespektrometri), for eksempel ved kollisjonsindusert dissosiasjon." },
    { kind: "p", text: "Produktionenes m/z og relative intensiteter kan gi strukturell informasjon og øke selektiviteten. I [MRM](begrep:mrm) overvåkes bestemte kombinasjoner av forløperion og produktion." },
  ],
  demo: "fragmentering-spalting",
  depth: {
    title: "Dybde: forløperion, produktion og nøytralt tap",
    blocks: [
      { kind: "p", text: "Når et valgt forløperion dissosierer, kan ladningen bli igjen på ett av fragmentene mens et annet fragment forlater prosessen som nøytral art. Det målte produktionet trenger derfor ikke alene å bevare hele forløperionets masse." },
      { kind: "p", text: "Fragmentmønstre er betingelsesavhengige. Kollisjonsenergi, ionetype og instrument påvirker hvilke produktioner som dannes og hvor intense de blir." },
    ],
  },
  sources: [SOURCES.iupacFragmentation, SOURCES.iupacFragmentIon, SOURCES.iupacMSMS],
  status: "publisert",
};