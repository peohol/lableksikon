import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import styles from "./SeparationConceptDemos.module.css";

function Rows({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return <div className={styles.rows}>{rows.map((row) => <div className={styles.row} key={row.label}><span className={styles.label}>{row.label}</span><span className={styles.value}>{row.value}</span></div>)}</div>;
}
function Flow({ items }: { items: string[] }) {
  return <ol className={styles.flow}>{items.map((item, i) => <li key={item}><span>{i + 1}</span>{item}</li>)}</ol>;
}

export function MobilfaseDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Se hva transportfasen kan være." label="Mobilfasen beveger prøven gjennom systemet" afterword="Fasen beveger seg; hvilken fysisk form den har, avhenger av kromatografitypen."><Rows rows={[{label:"LC",value:"væske / eluent"},{label:"GC",value:"gass / bæregass"},{label:"SFC",value:"superkritisk fluid"}]} /></DemonstrationFrame>;
}
export function StasjonarfaseDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Følg to stoffer som fordeler seg ulikt." label="Ulik vekselvirkning gir ulik retensjon" afterword="Stoffet som samlet sett holdes sterkere igjen, bruker lenger tid gjennom systemet."><Flow items={["Mobilfasen fører begge fremover","Stoff A tilbringer lite tid i stasjonærfasen","Stoff B tilbringer mer tid i stasjonærfasen","B eluerer senere enn A"]} /></DemonstrationFrame>;
}
export function RetensjonstidDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Mål tiden frem til toppmaksimum." label="Retensjonstid måles fra injeksjon til toppmaksimum" afterword="\\(t_R\\) inkluderer hold-up-tiden; justert retensjonstid trekker hold-up-tiden fra."><Rows rows={[{label:"Injeksjon",value:"\\(t = 0{,}00\\,\\mathrm{min}\\)"},{label:"Ikke-retinert markør",value:"\\(t_M = 0{,}60\\,\\mathrm{min}\\)"},{label:"Toppmaksimum",value:"\\(t_R = 2{,}40\\,\\mathrm{min}\\)"},{label:"Justert",value:"\\(t'_R = 1{,}80\\,\\mathrm{min}\\)"}]} /></DemonstrationFrame>;
}
export function GradientDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Se hvordan mobilfasen endres underveis." label="Gradienteluering: sammensetningen programmeres over tid" afterword="En gradient kan være kontinuerlig eller trinnvis."><Rows rows={[{label:"0 min",value:"10 % sterk komponent"},{label:"5 min",value:"35 %"},{label:"10 min",value:"70 %"}]} /></DemonstrationFrame>;
}
export function IsokratiskDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Sammenlign sammensetningen ved tre tidspunkt." label="Isokratisk: samme mobilfasesammensetning hele veien" afterword="Konstant sammensetning betyr ikke at alle andre metodeparametere nødvendigvis er konstante."><Rows rows={[{label:"0 min",value:"40 / 60"},{label:"5 min",value:"40 / 60"},{label:"10 min",value:"40 / 60"}]} /></DemonstrationFrame>;
}
export function ElueringsrekkefolgeDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Les toppene i den rekkefølgen de kommer ut." label="Elueringsrekkefølge er betingelsesavhengig" afterword="En annen kolonne eller mobilfase kan endre rekkefølgen."><Flow items={["A: svakest retinert","B: mellomliggende retensjon","C: sterkest retinert"]} /></DemonstrationFrame>;
}
export function ToppbreddeDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Skill mellom to vanlige breddekonvensjoner." label="Samme topp kan ha flere definerte bredder" afterword="Oppgi alltid hvilken bredde som er brukt."><Rows rows={[{label:"Ved basis",value:"\\(w_b = 0{,}40\\,\\mathrm{min}\\)"},{label:"Ved halv høyde",value:"\\(w_h = 0{,}24\\,\\mathrm{min}\\)"},{label:"Ikke synonym",value:"«halvbredde» \\(\\ne w_h\\)"}]} /></DemonstrationFrame>;
}
export function HaledannelseDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Sammenlign symmetri og hale." label="Haledannelse: bakre toppside avtar langsommere" afterword="Asymmetri kan påvirke både integrasjon og separasjon fra neste topp."><Rows rows={[{label:"Symmetrisk",value:"front ≈ bakside"},{label:"Halende",value:"bratt front, slak bakside"}]} /></DemonstrationFrame>;
}
export function PlatetallDemo() {
  return <DemonstrationFrame kind="formel" instruction="Hold retensjonstiden lik og gjør toppen smalere." label="Smalere topp gir høyere platetall" afterword="Formelen og tallet avhenger av hvilken toppbredde som brukes."><Rows rows={[{label:"\\(t_R\\)",value:"\\(5{,}0\\,\\mathrm{min}\\)"},{label:"\\(w_b = 0{,}50\\,\\mathrm{min}\\)",value:"\\(N = 1600\\)"},{label:"\\(w_b = 0{,}25\\,\\mathrm{min}\\)",value:"\\(N = 6400\\)"}]} /></DemonstrationFrame>;
}
export function SeparasjonsfaktorDemo() {
  return <DemonstrationFrame kind="formel" instruction="Sammenlign justert retensjon for to nabotopper." label="Separasjonsfaktor alfa er et forhold" afterword="\(\alpha\) beskriver retensjonsforskjell, ikke hele oppløsningen."><Rows rows={[{label:"\\(k_1\\)",value:"2,0"},{label:"\\(k_2\\)",value:"2,4"},{label:"\\(\\alpha = k_2/k_1\\)",value:"1,20"}]} /></DemonstrationFrame>;
}
export function DodvolumDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Bruk et presist ord for det du faktisk mener." label="«Dødvolum» skjuler flere forskjellige størrelser" afterword="IUPAC fraråder termen fordi den brukes tvetydig."><Rows rows={[{label:"Ikke-retinert transport",value:"hold-up-volum / hold-up-tid"},{label:"Slanger, injektor, detektor",value:"ekstrakolonnevolum"},{label:"«Dødvolum»",value:"unngå uten presisering"}]} /></DemonstrationFrame>;
}
export function InjeksjonsvolumDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Se avveiningen når injeksjonen økes." label="Større injeksjon kan gi mer analytt — og bredere bånd" afterword="Riktig volum bestemmes av hele metoden og kontrolleres mot systemegnethet."><Rows rows={[{label:"Liten injeksjon",value:"mindre prøveplugg"},{label:"Stor injeksjon",value:"mer analytt, større risiko for båndspredning"},{label:"Etter volumendring",value:"kontroller at systemegnetheten fortsatt er tilfredsstillende"}]} /></DemonstrationFrame>;
}