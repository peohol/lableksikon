import type { PublishedTerm } from "../schema";

export const internstandard: PublishedTerm = {
  slug: "internstandard",
  title: "Internstandard",
  category: "kalibrering",
  definition:
    "Et kjent stoff som tilsettes alle prøver, slik at variasjon i behandlingen kan regnes bort.",
  aliases: ["IS", "isotopmerket", "tilsetning", "forhold", "ratio", "tap"],
  explanation: [
    {
      kind: "p",
      text: "Tenk at du skal måle hvor mye saft det er i et glass, men søler litt på veien til vekta. Svaret blir for lavt, og du merker det ikke. Tilsetter du en kjent mengde av et annet stoff i samme glass, søles det like mye av begge — og forholdet mellom dem står stille.",
    },
    {
      kind: "p",
      text: "Internstandarden følger prøven gjennom hele opparbeidingen, og vi regner på forholdet mellom signalene i stedet for på signalet alene. Tap, fortynningsfeil og svingninger i instrumentet rammer da begge likt og faller ut av regnestykket.",
    },
  ],
  demo: "internstandard-forhold",
  depth: {
    title: "Dybde: valg av internstandard og hva den ikke fikser",
    blocks: [
      {
        kind: "p",
        text: "En god internstandard oppfører seg mest mulig som analytten gjennom ekstraksjon, kromatografi og ionisering, men kan måles atskilt. I massespektrometri er isotopmerkede analoger idealet.",
      },
      {
        kind: "p",
        text: "Kalibreringen gjøres på responsforholdet analytt/IS mot konsentrasjon. Tilsetningen må skje tidlig, før tapene oppstår — tilsatt til slutt korrigerer den bare for instrumentet.",
      },
      {
        kind: "p",
        text: "Internstandard kompenserer for proporsjonale tap, ikke for feil som rammer bare analytten. Eluerer IS langt fra analytten, kan [matriseeffekt](begrep:matriseeffekt) treffe de to ulikt.",
      },
    ],
  },
  status: "publisert",
};
