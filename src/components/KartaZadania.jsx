function KartaZadania({ id, tytul, opis }) {
    // funkcja wywoływana, gdy zaczynamy przeciągać tę kartę
    const obslugaDragStart = (event) => {
        // zapisujemy ID przeciąganego zadania w "schowku" transferu danych
        event.dataTransfer.setData('id-zadania', id)
    }

    return (
        <div
            className="karta-zadania"
            draggable="true"
            onDragStart={obslugaDragStart}
        >
            <h3>{tytul}</h3>
            <p>{opis}</p>
        </div>
    )
}

export default KartaZadania