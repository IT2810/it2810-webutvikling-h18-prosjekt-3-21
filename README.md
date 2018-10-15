# Dokumentasjon
I dette prosjektet har det blitt laget en "to do"-app hvor brukeren kan definere egne oppgaver han vil gjøre, i tillegg til å ha en skritteller med mål for antall skritt han går.
Appen er skrevet i React Native med bruk av Expo og fungerer på både iOS og Android.

## Komponentstruktur

## Skritteller

## Async storage

## Testing
Testing er gjort med Jest. 
`App.js` testes først med sjekk på at den returnerer en `<View>`-komponent, før den sammenlignes med et tidligere snapshot av hvordan brukergrensesnittet skal se ut. 
Dette skjer i `App.test.js`.
Deretter kjøres `HomeScreen.test.js` (bør forandre navn på denne, for det testes mer enn bare Homescreen her), hvor det sjekkes at state-forandringer skjer som det skal.
Først sjekkes den nåværende state'en for å være sikker på at alt har blitt satt riktig opp, før funksjoner som skifter state'en kalles og ny sjekkes kjøres igjen for å bekrefte at state-forandringen har blitt gjennomført. Dette gjøres initielt i `App.js`, hvor skifter mellom de forskjellige hovedkomponentene testes (`HomeScreen`, `EditTaskScreen` og `PedometerSensor`). 
Deretter sjekkes `HomeScreen.js`, hvor det sjekkes at man kan skifte mellom oppgaver som ikke er utført og de som er utført.
`EditTaskScreen.js` testes ved å sjekke at man kan gå tilbake til hjemskjermen.


