import { useState } from 'react'
import KartaZadania from './components/KartaZadania'
import './App.css'

function App() {
  const [zadania, setZadania] = useState([
    { id: 1, tytul: 'Nauczyć się React', opis: 'Podstawy komponentów i propsów', status: 'do-zrobienia' },
    { id: 2, tytul: 'Zbudować tablicę kanban', opis: 'Projekt do portfolio', status: 'w-trakcie' },
    { id: 3, tytul: 'Poznać useState', opis: 'Zarządzanie stanem aplikacji', status: 'gotowe' },
  ])

  const zadaniaWKolumnie = (status) => zadania.filter((z) => z.status === status)

  // wywoływane non-stop podczas przeciągania nad kolumną - MUSI zapobiec
  // domyślnemu zachowaniu przeglądarki, inaczej "upuszczenie" nie zadziała
  const obslugaDragOver = (event) => {
    event.preventDefault()
  }

  // wywoływane w momencie upuszczenia karty na kolumnie
  const obslugaDrop = (event, nowyStatus) => {
    event.preventDefault()
    const idZadania = Number(event.dataTransfer.getData('id-zadania'))

    // setZadania z funkcją zamiast wartości - "weź poprzedni stan (poprzednieZadania)
    // i zwróć nową tablicę na jego podstawie" - bezpieczny sposób aktualizacji stanu
    setZadania((poprzednieZadania) =>
      poprzednieZadania.map((zadanie) =>
        zadanie.id === idZadania ? { ...zadanie, status: nowyStatus } : zadanie
      )
    )
  }

  return (
    <div>
      <h1>Moja tablica kanban</h1>
      <div className="tablica">
        {[
          { status: 'do-zrobienia', etykieta: 'Do zrobienia' },
          { status: 'w-trakcie', etykieta: 'W trakcie' },
          { status: 'gotowe', etykieta: 'Gotowe' },
        ].map((kolumna) => (
          <div
            key={kolumna.status}
            className="kolumna"
            onDragOver={obslugaDragOver}
            onDrop={(event) => obslugaDrop(event, kolumna.status)}
          >
            <h2>{kolumna.etykieta}</h2>
            {zadaniaWKolumnie(kolumna.status).map((zadanie) => (
              <KartaZadania key={zadanie.id} id={zadanie.id} tytul={zadanie.tytul} opis={zadanie.opis} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App