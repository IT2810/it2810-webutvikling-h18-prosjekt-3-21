# Dokumentasjon

I dette prosjektet har det blitt laget en "to do"-app hvor brukeren kan definere egne oppgaver han vil gjøre, i tillegg til å ha en skritteller med mål for antall skritt han går.
Appen er skrevet i React Native med bruk av Expo og fungerer på både iOS og Android.

## Komponentstruktur

Toppkomponenten er `App.js`, som bestemmer hvilke av de tre subkomponentene som skal rendres (`HomeScreen`, `EditTaskScreen` og `PedometerSensor`).
Dette gjøres med state'en `displayedScreen`.

Hjemskjermen består så av en av to subkomponenter, `TasksToDo.js` eller `TasksCompleted.js`, avhengig av state `displayedTab`.
Hver av disse subkomponentene består begge av `Task.js`-komponenter, der state `isCompleted` bestemmer om den gitte oppgaven skal rendres som fullført eller ikke.

`EditTaskScreen.js` er skjermen som rendres hvis en ny oppave skal legges til eller en eksisterende oppgave skal oppdateres.
Denne består ikke av noen subkomponenter.

`PedometerSensor.js` er skjermen for skritteller-funksjonaliteten.

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
direkte kopiert av mockStorage.js gitt av bruker "free-soul" på følgende StackOverflow tråd https://stackoverflow.com/questions/40952566/how-to-test-async-storage-with-jest. Denne mockStorage klassen blir brukt i AsyncStorage.test.js for å teste funksjonaliteten til AsyncStorage. Måten testingen av AsyncStorage fungerer nå er at
vi tester at objekter som blir satt, fjernet, hentet, cleared fungerer på den måten som AsyncStorage mener at det skal.
For å teste at vår funksjonalitet fungerer som det skal ville vi ha laget en egen AsyncStorageMangager klasse som vil ligge oppå
funksjonaliteten til AsyncStorage som spesifikt ville satt nye task objekter, lest ut objekter, fjernet og updatert eksisterende objekter. Da kunne vi ha testet den funskjonaliteten som er spesifikk for vår app, f.eks at hvis en gitt funksjon som skal lage en ny task som skal bli laget, så vil den ha en større id enn de som allerede har eksistert tidligere i AsyncStorage. Vi kunne også teste at hvis en task blir flyttet til completed så blir den tilstanden for om en task er completed satt til true.
