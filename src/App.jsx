import { useState } from 'react'
import KartaZadania from './components/KartaZadania'
import FormularzZadania from './components/FormularzZadania'
import './App.css'

function App() {
  const [zadania, setZadania] = useState([
    { id: 1, tytul: 'Nauczyć się React', opis: 'Podstawy komponentów i propsów', status: 'do-zrobienia' },
    { id: 2, tytul: 'Zbudować tablicę kanban', opis: 'Projekt do portfolio', status: 'w-trakcie' },
    { id: 3, tytul: 'Poznać useState', opis: 'Zarządzanie stanem aplikacji', status: 'gotowe' },
  ])

  const zadaniaWKolumnie = (status) => zadania.filter((z) => z.status === status)

  const obslugaDragOver = (event) => {
    event.preventDefault()
  }

  const obslugaDrop = (event, nowyStatus) => {
    event.preventDefault()
    const idZadania = Number(event.dataTransfer.getData('id-zadania'))

    setZadania((poprzednieZadania) =>
      poprzednieZadania.map((zadanie) =>
        zadanie.id === idZadania ? { ...zadanie, status: nowyStatus } : zadanie
      )
    )
  }

  // dodaje nowe zadanie do stanu - zawsze trafia do kolumny "do-zrobienia"
  const dodajZadanie = (tytul, opis) => {
    const noweZadanie = {
      id: Date.now(), // prosty sposób na unikalne ID - znacznik czasu w milisekundach
      tytul,
      opis,
      status: 'do-zrobienia',
    }
    setZadania((poprzednieZadania) => [...poprzednieZadania, noweZadanie])
  }

  return (
    <div>
      <h1>Moja tablica kanban</h1>
      <FormularzZadania onDodajZadanie={dodajZadanie} />
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