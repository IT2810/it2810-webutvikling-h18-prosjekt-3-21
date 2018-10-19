﻿# Dokumentasjon

I dette prosjektet har det blitt laget en "to do"-app hvor brukeren kan definere egne oppgaver han vil gjøre, i tillegg til å ha en skritteller med mål for antall skritt han går.
Appen er skrevet i React Native med bruk av Expo og fungerer på både iOS og Android.

## Komponentstruktur

Toppkomponenten er `App.js`, som bestemmer hvilke av de tre subkomponentene som skal rendres (`HomeScreen`, `EditTaskScreen` og `PedometerSensor`).
Dette gjøres med state'en `displayedScreen`.

Hjemskjermen består så av en av to subkomponenter, `TasksToDo.js` eller `TasksCompleted.js`, avhengig av state `displayedTab`.
Hver av disse subkomponentene består begge av `Task.js`-komponenter, der state `isCompleted` bestemmer om den gitte oppgaven skal rendres som fullført eller ikke.

`EditTaskScreen.js` er skjermen som rendres hvis en ny oppave skal legges til eller en eksisterende oppgave skal oppdateres.
Denne består ikke av noen subkomponenter.

`PedoSensor.js` er skjermen for skritteller-funksjonaliteten.
Skrittelleren ble implementert ved hjelp av Expo's Pedometer API. State til dette komponentet inneholder flere variabler:
* isPedometerAvailable: Representerer tilgjengeligheten av pedometeret til enheten, kan være "checking", "true" eller "false"
* stepCount7Days: Antall skritt gjennomført siste 7 dager, hentes asynkront når componenten abonnerer på resultat fra pedometer api'en.
* stepGoalToday: Lagrer daglig skrittmål, dette lastes inn når componentet mountes gjennom _loadGoal() og lagres når et nytt mål er satt og bekreftet gjennom _storeGoal()
* stepsToday, steps: stepsToday hentes ut fra pedometer apiet når componentet mountes og er antall steg gjort siden starten av dagen. Steps oppdateres kontinuerlig når skritt telleren er åpen gjennom et abonnement på Pedometer.watchStepCount()
* showGoalSetup: Brukes for å bestemme i rendringen om konfigurering av mål skal vises eller ikke, settes til true når set goal trykkes på, settes til false når confirm trykkes på.
* configStepGoalPending: Mellomlagring av skritt mål, stepGoalToday settes lik denne når confirm trykkes på.

Oversikt over flyt i componenten:
* componentDidMount():
** Kaller _subscribe(), som sjekker om pedometer er tilgjengelig, abonnerer på skritt oppdateringer og henter asynkront ut steg utført siste 7 dager og siste dag.
** Deretter kalles _LoadGoal() som laster inn nåværende step-goal fra async storage, hvis det ikke eksisterer noe mål i async storage settes målet til 1000 steg
* Komponenten er mountet:
** Bruker getStepPercent() i rendringen for å oppdatere nåværende status i progress bar og tekst.
** Hvis brukeren trykker på set goal så vises konfigurasjonsknappene. Pluss og minus øker og senker nåværende mål via onPressIncrementGoal() og onPressDecrementGoal(). Når brukeren trykker på confirm så lagres målet via _storeGoal, og stepGoalsToday settes lik configStepGoalPending. Deretter trigges en ny render siden staten er oppdatert og ny informasjon vises på skjermen
* componentWillUnmount():
** Kaller _unsubscribe() som avabonnerer på Pedometer apien

Annet:
* Skrittelleren fungerer på iOS uten noe tillegssoftware, men på Android er brukeren nødt til å installere google health for at skrittelleren skal bli tilgjengelig



## Skritteller

## AsyncStorage

AsyncStorage er et key-value lagringssystem som gjør det enkelt å lagre ukryptert data asynkront.
Lagringssystemet er globalt tilgjengelig for hele appen, og under panseret så vil den bruke RocksDB eller
SQLite, avhengig av hva som er tilgjengelig. AsyncStorage er enkelt å bruke fordi det lar oss bruke et intuitivt
JavaScript API for å sette og hente ut gjenstande som lagres. Når vi i vår app lagrer oppgavene, så trenger vi bare å sette
en id som key og oppgaveobjektet som value. Dette oppgaveobjektet blir "stringified" med JSON når det lagres.
Når vi henter ut en oppgave fra AsyncStorage så blir denne returnert som et "promise" objekt. Årsaken til dette
er at AsyncStorage er asynkront, og vi må selv håndtere og hente ut oppgaven fra dette promiseobjektet.
Oppgavene lagres som JSON-objekter, med en unik id, en oppgavebeskrivelse og verdien `isCompleted` (`=true/false`). Id'en er et heltall som begynner på 0 dersom ingen oppgaver er laget tidligere og inkrementers for hver oppgave som lages. Dette gjøres med verdien `counter`, som er strengt stigende og sørger for at to forskjellige oppgaver aldri vil få samme id.

## Testing

Testing er gjort med Jest.
`App.js` testes først med sjekk på at den returnerer en `<View>`-komponent, før den sammenlignes med et tidligere snapshot av hvordan brukergrensesnittet skal se ut.
Dette skjer i `App.test.js`.
Deretter kjøres `HomeScreen.test.js` (bør forandre navn på denne, for det testes mer enn bare Homescreen her), hvor det sjekkes at state-forandringer skjer som det skal.
Først sjekkes den nåværende state'en for å være sikker på at alt har blitt satt riktig opp, før funksjoner som skifter state'en kalles og ny sjekkes kjøres igjen for å bekrefte at state-forandringen har blitt gjennomført. Dette gjøres initielt i `App.js`, hvor skifter mellom de forskjellige hovedkomponentene testes (`HomeScreen`, `EditTaskScreen` og `PedometerSensor`).
Deretter sjekkes `HomeScreen.js`, hvor det sjekkes at man kan skifte mellom oppgaver som ikke er utført og de som er utført.
`EditTaskScreen.js` testes ved å sjekke at man kan gå tilbake til hjemskjermen.
Testing av AsyncStorage gjøres ved at det blir lacket en mock av AsyncStorage. Klassen som gjør dette heter MockStorage og er
direkte kopiert av mockStorage.js gitt av bruker "free-soul" på følgende StackOverflow tråd https://stackoverflow.com/questions/40952566/how-to-test-async-storage-with-jest. Denne mockStorage klassen blir brukt i AsyncStorage.test.js for å teste funksjonaliteten til AsyncStorage. Måten testingen av AsyncStorage fungerer på er at
vi tester at objekter som blir satt, slettet, hentet, cleared fungerer på den måten som AsyncStorage mener at det skal.
For å teste at vår funksjonalitet fungerer som det skal ville vi ha laget en egen AsyncStorageMangager klasse som vil ligge oppå
funksjonaliteten til AsyncStorage som spesifikt ville satt nye task objekter, lest ut objekter, fjernet og updatert eksisterende objekter. Da kunne vi ha testet den funskjonaliteten som er spesifikk for vår app, f.eks at hvis en gitt funksjon som skal lage en ny task som skal bli laget, så vil den ha en større id enn de som allerede har eksistert tidligere i AsyncStorage. Vi kunne også teste at hvis en task blir flyttet til completed så blir den tilstanden for om en task er completed satt til true.
En annen måte vi kunne ha testet om vår funksjonalitet bruker AsyncStorage på en korrekt måte er ved å lage tester som rendrer de ulike komponentene for så bruke funksjonene i de komponentene for å lage nye tasks og hente de ut. Deretter kan vi se om hvordan vi setter, henter, sletter og bruker AsyncStorage gir korrekt resultat, som om at id'en til en ny task er strengt stigende, og at rett task blir slettet.
