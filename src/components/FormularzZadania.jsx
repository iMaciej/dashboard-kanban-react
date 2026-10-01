import { useState } from 'react'

function FormularzZadania({ onDodajZadanie }) {
    const [tytul, setTytul] = useState('')
    const [opis, setOpis] = useState('')

    const obslugaWyslania = (event) => {
        event.preventDefault()

        if (tytul.trim() === '') {
            return // nie dodawaj pustych zadań
        }

        onDodajZadanie(tytul, opis)

        // czyszczenie formularza po dodaniu - ustawiamy state z powrotem na puste
        setTytul('')
        setOpis('')
    }

    return (
        <form className="formularz-zadania" onSubmit={obslugaWyslania}>
            <input
                type="text"
                placeholder="Tytuł zadania"
                value={tytul}
                onChange={(event) => setTytul(event.target.value)}
            />
            <input
                type="text"
                placeholder="Opis (opcjonalnie)"
                value={opis}
                onChange={(event) => setOpis(event.target.value)}
            />
            <button type="submit">Dodaj zadanie</button>
        </form>
    )
}

export default FormularzZadania