# Skrifter

Newsreader og IBM Plex Sans ligger selvhostet her, som variable woff2-filer i
latin-utsnittet (dekker æ, ø og å). Begge er lisensiert under SIL Open Font
License 1.1 — lisensfilene ligger ved siden av.

Filene er hentet fra npm-pakkene `@fontsource-variable/newsreader` og
`@fontsource-variable/ibm-plex-sans`. Selvhosting gjør at bygget ikke er
avhengig av nettverk, og at ingen sideoppslag går til en tredjepart.

Oppdatering:

```
npm install --no-save @fontsource-variable/newsreader @fontsource-variable/ibm-plex-sans
cp node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-{normal,italic}.woff2 src/fonts/
cp node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2 src/fonts/
npm uninstall @fontsource-variable/newsreader @fontsource-variable/ibm-plex-sans
```
