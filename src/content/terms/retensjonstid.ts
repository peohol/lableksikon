import type { PublishedTerm } from "../schema";
import { SOURCES } from "../sources";

export const retensjonstid: PublishedTerm = {
  slug: "retensjonstid",
  title: "Retensjonstid",
  category: "separasjon",
  definition: "Tiden fra prøveinjeksjon til toppmaksimum for den aktuelle komponenten.",
  aliases: ["retention time", "tR", "rt"],
  explanation: [
    { kind: "p", text: "Retensjonstiden beskriver hvor lenge en komponent bruker gjennom det kromatografiske systemet før toppmaksimum registreres. Den totale retensjonstiden inkluderer tiden en ikke-retinert komponent ville brukt gjennom systemet." },
    { kind: "p", text: "Retensjonstid kan støtte identifikasjon, men er ikke alene et entydig identitetsbevis. Den påvirkes blant annet av [mobilfase](begrep:mobilfase), [stasjonærfase](begrep:stasjonarfase), strømning og temperatur." },
  ],
  demo: "retensjonstid-tidslinje",
  depth: {
    title: "Dybde: total og justert retensjonstid",
    blocks: [
      { kind: "p", text: "IUPAC skiller total retensjonstid \\(t_R\\) fra hold-up-tid \\(t_M\\). Den justerte retensjonstiden er tiden utover hold-up-tiden: \\(t'_R = t_R - t_M\\)." },
      { kind: "p", text: "Når to topper sammenlignes, er det ikke bare avstanden i retensjonstid som avgjør om de er godt separert. [Toppbredden](begrep:toppbredde) inngår også i [kromatografisk oppløsning](begrep:opplosning)." },
    ],
  },
  sources: [SOURCES.iupacTotalRetentionTime, SOURCES.iupacHoldUpTime],
  status: "publisert",
};