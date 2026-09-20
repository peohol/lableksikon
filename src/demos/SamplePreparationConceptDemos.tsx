import { DemonstrationFrame } from "@/components/DemonstrationFrame";
import styles from "./SamplePreparationConceptDemos.module.css";

function Rows({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return <div className={styles.rows}>{rows.map((r) => <div className={styles.row} key={r.label}><span className={styles.label}>{r.label}</span><span className={styles.value}>{r.value}</span></div>)}</div>;
}
function Flow({ items }: { items: string[] }) {
  return <ol className={styles.flow}>{items.map((item, i) => <li key={item}><span aria-hidden="true">{i + 1}</span>{item}</li>)}</ol>;
}

export function RepresentativDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Sammenlign to uttak fra et heterogent parti." label="Prøvetakingsplanen avgjør hva prøven representerer" afterword="Et uttak kan være stort og presist analysert uten å være representativt for målpopulasjonen."><Rows rows={[{label:"Uttak A",value:"bare fra overflaten"},{label:"Uttak B",value:"fordelt over definerte deler av partiet"},{label:"Mål",value:"egenskapen i hele det definerte partiet"}]} /></DemonstrationFrame>;
}
export function DelproveDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Følg prøven når den reduseres i flere trinn." label="Delprøver er prøver av en større prøve" afterword="Hvert reduksjonstrinn må bevare relevant representativitet."><Flow items={["Laboratorieprøve","Deling / blanding","Testprøve","Testportion til analyse"]} /></DemonstrationFrame>;
}
export function HomogeniseringDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Se hvordan fordelingen mellom små uttak endres." label="Homogenisering reduserer variasjon mellom delprøver" afterword="Homogenitet gjelder alltid en bestemt egenskap og prøvestørrelse."><Rows rows={[{label:"Før",value:"2, 15, 4 og 19 enheter"},{label:"Etter blanding",value:"9, 10, 11 og 10 enheter"},{label:"Poeng",value:"mindre variasjon mellom like store uttak"}]} /></DemonstrationFrame>;
}
export function EkstraksjonDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Følg analytten fra matriks til ekstrakt." label="Ekstraksjon overfører analytten til en annen fase" afterword="Overføringen trenger ikke være 100 % for at metoden skal være egnet."><Flow items={["Analytt i prøvematriks","Kontakt med ekstraksjonsfase","Fordeling mellom fasene","Ekstrakt til videre analyse"]} /></DemonstrationFrame>;
}
export function OppkonsentreringDemo() {
  return <DemonstrationFrame kind="formel" instruction="Hold analyttmengden lik og reduser sluttvolumet." label="Mindre sluttvolum gir høyere konsentrasjon" afterword="Oppkonsentreringsfaktor og gjenvinning er forskjellige størrelser."><Rows rows={[{label:"Analyttmengde",value:"10 ng"},{label:"Startvolum",value:"10 mL → 1 ng/mL"},{label:"Sluttvolum",value:"1 mL → 10 ng/mL"}]} /></DemonstrationFrame>;
}
export function FortynningDemo() {
  return <DemonstrationFrame kind="formel" instruction="Følg samme analyttmengde når volumet økes." label="Fortynning senker konsentrasjonen" afterword="Ideelt bevares analyttmengden i aliquoten mens konsentrasjonen faller."><Rows rows={[{label:"Aliquot",value:"1,0 mL ved 100 µg/mL"},{label:"Sluttvolum",value:"10,0 mL"},{label:"Ny konsentrasjon",value:"10 µg/mL"}]} /></DemonstrationFrame>;
}
export function FortynningsfaktorDemo() {
  return <DemonstrationFrame kind="formel" instruction="Beregn forholdet mellom sluttvolum og aliquot." label="Fortynningsfaktoren korrigerer tilbake til opprinnelig konsentrasjon" afterword="Flere fortynningstrinn kombineres ved å multiplisere faktorene."><Rows rows={[{label:"Aliquot",value:"2,0 mL"},{label:"Sluttvolum",value:"20,0 mL"},{label:"Faktor",value:"\\(20{,}0/2{,}0 = 10\\)"},{label:"Målt",value:"3,0 mg/L → opprinnelig 30 mg/L"}]} /></DemonstrationFrame>;
}
export function FiltreringDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Skill mellom det som går gjennom og det som holdes tilbake." label="Et filter deler prøven i filtrat og retentat" afterword="Om analytten skal finnes i én eller begge fraksjoner bestemmes av målestørrelsen."><Rows rows={[{label:"Filtrat",value:"væske + komponenter som passerer filteret"},{label:"Retentat",value:"materiale som holdes tilbake"},{label:"Risiko",value:"adsorpsjon eller tap av partikkelbundet analytt"}]} /></DemonstrationFrame>;
}
export function OppslutningDemo() {
  return <DemonstrationFrame kind="stegvis" instruction="Se hensikten med kjemisk matriksforenkling." label="Oppslutning gjør prøven egnet for videre måling" afterword="Målet er egnet prøveoppløsning og matriksforenkling, ikke nødvendigvis at absolutt alt fast stoff forsvinner."><Flow items={["Fast / kompleks prøve","Reagens + energi","Matriks brytes ned eller løses","Måleløsning til analyse"]} /></DemonstrationFrame>;
}
export function ProvemengdeDemo() {
  return <DemonstrationFrame kind="sammenligning" instruction="Sammenlign små og større uttak fra et heterogent materiale." label="Prøvemengden påvirker hvor mye heterogenitet som fanges" afterword="Metodedokumentasjon kan angi en minste prøvemengde der ytelsesdataene fortsatt gjelder."><Rows rows={[{label:"Svært lite uttak",value:"få partikler → større uttaksvariasjon"},{label:"Større uttak",value:"flere partikler → ofte mer stabil sammensetning"},{label:"Begrensning",value:"opparbeiding og instrument må tåle mengden"}]} /></DemonstrationFrame>;
}
