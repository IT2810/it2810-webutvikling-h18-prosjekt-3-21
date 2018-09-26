# PIMM med React Native

Innleveringsfrist fredag 12/10 for prosjektet. Guppearbeid på sal med evaluering av prosjekter 15/10.
Prosjekt 3 teller 20% av karakteren.
Selve prosjektet levereres automatisk fra github classroom ved utløp av fristen. I BB skal dere lever et dokument som viser den enkeltes bidrag i prosjektet.

I dette prosjektet er utfordringen å designe og implementere en "Personal Information and Motivation Manager" app for mobil, med React Native. 
Det er ikke meningen at dere skal lage en komplett applikasjon, men dere skal demonstrere funksjonaliteten og bruk av teknologien.

En personal information manager er en app som lar deg holde orden på kontakter, avtaler, todos etc. I praksis en avansert kalender. Vi har lagt til ordet "motivation" for å gjøre oppgaven litt mer utfordrende og kreativt (og for at den skal avvike litt fra standard kalender-app). Med motivation mener vi at applikasjonen skal støtte en form for registrering av personlige mål og resultater enten fysisk eller intellektuell aktivitet. Det er opp til gruppa og definere hva det skal være og intensjonen er å gi en oppgave som skal inspirere til utforsking av tenkologien. 

Oppgaven utføres i grupper på 3.

Oppgaven evalueres i forhold til krav og læringsmålene som er beskrevet under. 

# Krav applikasjonens innhold og funksjonalitet

Løsningen skal være en prototyp innenfor det som er beskrevet over. Det er gruppa som bestemmer design, innhold og funksjonalitet i applikasjonen. Applikasjonen skal demonstrere teknologibruken og hvor my funksjonalitet dere vil ha med er opp til dere. Det holder for eksempel å vise hvordan du håndterer én type data. For å komme i havn innen den korte fristen er det viktig å avgrense seg.

* Du skal kunne legge til nye elementer som oppgaver, todos, avtaler, motivasjoner og/eller målinger etc. Velg selv hva dere vil jobbe med.
* Tilstand skal lagres (vha AsyncStorage) slik at data tas vare på selv om appen avsluttes og startes. 
* Appen skal vise ett eksempel på noe som er utover basic React Native UI-problematikk (som bruk av gps, skritt-teller, direkte kommunikasjon med andre enheter - eller hva som helst annet relevant dere ønsker å utforske og som er innenfor begrensingene å få til).


# Krav til bruk av teknologi

## REACT NATIVE

* Løsningen skal baseres på React Native med bruk av Expo verktøyet (http://expo.io).
* Bruk expo-cli og skriptet expo init for å komme i gang (den som tidligere var create-react-native-app er slått sammen med Expo CLI). 
* Appen skal bruke AsyncStorage slik at data lagres på enheten mellom hver gang appen kjører.
* I dette prosjektet oppfordres dere til å finne gode og relevante tredjepartskomponenter og bibliotek, samt bruke Expo api'et.

## PLATTFORMUAVHENGIG

* Applikasjonen skakl fungere både på ios og andriod. 

## BRUK AV GIT, KODING

* Koden i prosjektet skal være ryddig strukturert, ha fornuftig kommentering og ha navngiving av komponenter, variabler og funksjoner i tråd med anbefalinger (best practise).
* Gruppa skal bruke git i utviklingen (se under for lenke til prosjekt 3 repository i github classroom).
* Utviklingen skal dekomponeres i task som hver beskrives kort med en issue. Commits markeres med hvilken issue de bidrar til/løser. 
* Ved innleveringsfristen vil github classroom automtisk lagre en snapshot av prosjektet som blir den formelle innleveringen. 
* På evalueringsdagen 15/10 skal siste versjon av systemet være tilgjengelig på github repositoriet

# Krav til testing

* Det skal utvikles tester med Jest og Enzyme og prosjektet skal vise god og systematisk testing av React applikasjoner.

# Krav til dokumentasjon

* Prosjektet dokumenteres med en README.md i git repositoriet.
* Dokumentasjonen skal diskutere, forklare og vise til alle de viktigste valgene og løsningene som gruppa gjør (inklusive valg av komponenter og api).
* Koden skal være lettlest og godt strukturert slik at den er lett å sette seg inn i. Bruk av kommentarer skal være tilpasset at eksterne skal inspisere koden.
* Gruppas valg av teknologi som utforskes (jmfr krav til innhold) skal dokumenteres i tutorials form slik at andre lett kan lære av eksempelet dere lager (dvs. gi en liten introduksjon til hva og hvordan).
* Gruppa skal oppsummere den enkeltes bidrag i prosjektet i en egen fil som leveres i BB (dette er personopplysninger som ingen vil at skal ligge på git ;-)


# Læringsmål for oppgaven

* Videregående  kunnskap og ferdigheter i React (og grunnleggende fredigheter i React Native)
* Ferdigheter i å finne og velge gode tredjeparts komponenter.
* Ferdigheter i å lage/bygge brukerfunksjonalitet ved hjelp av biblioteker og api.
* Videregående kompetanse i bruk av git og dokumentasjon/styring av utviklingsoppgaver med issues. 
* Ferdigheter i gruppearbeid med fokus på samarbeid og læring, fordeling og koordinering av arbeidsoppgaver, utvikling og samarbeidende utvikling med git.

# Plagiatkontroll

* Kopiering og gjenbruk av kode/løsninger som er utviklet av andre vil kun godkjennes hvis det er gjort på en måte som gir/viser læringsutbytte!
* I programmering er det naturlig å la seg inspirere av andres løsninger, gjenbruke fragmenter av kode etc. Husk å dokumentere kilder så unngår du å bli tatt for plagiering. Gjenbruk av løsninger fra innleverte prosjekt tidligere år eller andre former for omfattende kopiering, regnes som fusk.

