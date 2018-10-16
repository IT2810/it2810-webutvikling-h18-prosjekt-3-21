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

## Async storage
Oppgavene lagres som JSON-objekter, med en unik id, en oppgavebeskrivelse og verdien `isCompleted` (`=true/false`). 
Id'en er et heltall som begynner på 0 dersom ingen oppgaver er laget tidligere og inkrementers for hver oppgave som lages.
Dette gjøres med verdien `counter`, som er srengt stigende og sørger for at to forskjellige oppgaver aldri vil få samme id. 


## Testing
Testing er gjort med Jest. 
`App.js` testes først med sjekk på at den returnerer en `<View>`-komponent, før den sammenlignes med et tidligere snapshot av hvordan brukergrensesnittet skal se ut. 
Dette skjer i `App.test.js`.
Deretter kjøres `HomeScreen.test.js` (bør forandre navn på denne, for det testes mer enn bare Homescreen her), hvor det sjekkes at state-forandringer skjer som det skal.
Først sjekkes den nåværende state'en for å være sikker på at alt har blitt satt riktig opp, før funksjoner som skifter state'en kalles og ny sjekkes kjøres igjen for å bekrefte at state-forandringen har blitt gjennomført. Dette gjøres initielt i `App.js`, hvor skifter mellom de forskjellige hovedkomponentene testes (`HomeScreen`, `EditTaskScreen` og `PedometerSensor`). 
Deretter sjekkes `HomeScreen.js`, hvor det sjekkes at man kan skifte mellom oppgaver som ikke er utført og de som er utført.
`EditTaskScreen.js` testes ved å sjekke at man kan gå tilbake til hjemskjermen.


