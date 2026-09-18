import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const masseopplosning: PublishedTerm = {
  slug: "masseopplosning",
  title: "Masseoppløsning",
  category: "deteksjon",
  definition: "Et massespektrometers evne til å skille ionetoppsignaler som ligger nær hverandre i m/z.",
  aliases: ["mass resolution", "resolving power", "masseoppløsning", "HRMS", "FWHM"],
  explanation: [
    { kind: "p", text: "To ioner kan ha svært nærliggende m/z. Høyere masseoppløsning gjør det mulig å skille smalere eller tettere liggende topper og dermed redusere noen typer spektral interferens." },
    { kind: "p", text: "Når oppløsning oppgis som et tall, må definisjonen følge med. I massespektrometri brukes ofte m/Δm, men Δm kan bestemmes fra toppbredde ved en angitt høyde, for eksempel FWHM, eller fra en angitt dal mellom to topper." },
  ],
  demo: "masseopplosning-topper",
  depth: {
    title: "Dybde: «oppløsning» og «resolving power» krever en konvensjon",
    blocks: [
      { kind: "p", text: "IUPAC beskriver flere konvensjoner. Et tall som 60 000 er derfor ikke fullstendig spesifisert uten å vite m/z og hvordan Δm er definert. Sammenligning mellom instrumenter krever samme konvensjon." },
      { kind: "p", text: "«Unit mass resolution» er en egen kvalitativ betegnelse: et enkeltladet ion skal kunne skilles tydelig fra naboer 1 u fra hverandre, vanligvis med begrenset overlapp. Dette er ikke synonymt med høyoppløselig massespektrometri." },
    ],
  },
  sources: [SOURCES.iupacMassResolution, SOURCES.iupacMassResolvingPower, SOURCES.iupacUnitMassResolution],
  status: "publisert",
};