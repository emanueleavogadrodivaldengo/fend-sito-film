// =============================================
// detail.js — Logica pagina dettaglio film/serie
// Recupera l'ID e l'endpoint dall'URL e mostra
// tutte le informazioni del contenuto selezionato
// =============================================

// Recupera i parametri dalla query string dell'URL
const parametri = new URLSearchParams(window.location.search);
const idContenuto = parametri.get("id");
const endpointOriginale = decodeURIComponent(parametri.get("endpoint"));

// Funzione principale per caricare i dettagli
const mostraDettagli = async () => {
    // Chiama l'API usando l'endpoint originale
    const risultati = await fetchFromTMDB(`/${endpointOriginale}`);
    // Se non ci sono risultati, interrompi
    if (!risultati) return;

    const listaElementi = risultati;

    // Cerca l'elemento con l'ID corrispondente
    for (let i = 0; i < listaElementi.length; i++) {
        if (listaElementi[i].id == parseInt(idContenuto)) {
            const elemento = listaElementi[i];

            // Recupera il div contenitore dall'HTML e applica lo stile backdrop
            const contenitore = document.getElementById("elemento");
            contenitore.classList.add("elemento-backdrop");

            // Crea l'immagine del poster
            const poster = document.createElement("img");
            poster.src = `https://image.tmdb.org/t/p/w300${elemento.poster_path}`;
            poster.classList.add("det-poster");

            // Crea la colonna con le informazioni testuali
            const colonnaInfo = document.createElement("div");
            colonnaInfo.classList.add("det-info");

            // Titolo (supporta sia film .title che serie .name)
            const titolo = document.createElement("h1");
            titolo.innerText = elemento.title || elemento.name;
            titolo.classList.add("det-titolo");

            // Descrizione / sinossi
            const descrizione = document.createElement("p");
            descrizione.innerText = elemento.overview;
            descrizione.classList.add("det-overview");

            // Griglia metadati (voto, anno, stagioni, durata, lingua)
            const metadati = document.createElement("div");
            metadati.classList.add("det-meta-grid");

            // Estrai anno dalla data di uscita
            const anno = (elemento.release_date || elemento.first_air_date || "").split("-")[0];
            // Stagioni solo per le serie TV
            const stagioni = elemento.number_of_seasons ? `${elemento.number_of_seasons} stagioni` : "";
            // Durata solo per i film
            const durata = elemento.runtime ? `${elemento.runtime} min` : "";
            const voto = elemento.vote_average.toFixed(1);

            // Costruisci le righe dei metadati in HTML
            metadati.innerHTML = `
                <div class="det-meta-row"><span class="det-label">Voto</span><span>⭐ ${voto}</span></div>
                <div class="det-meta-row"><span class="det-label">Anno</span><span>${anno}</span></div>
                ${stagioni ? `<div class="det-meta-row"><span class="det-label">Stagioni</span><span>${stagioni}</span></div>` : ""}
                ${durata ? `<div class="det-meta-row"><span class="det-label">Durata</span><span>${durata}</span></div>` : ""}
                <div class="det-meta-row"><span class="det-label">Lingua</span><span>${elemento.original_language.toUpperCase()}</span></div>
            `;

            colonnaInfo.appendChild(titolo);
            colonnaInfo.appendChild(descrizione);

            // Bottone per tornare alla pagina precedente
            const btnIndietro = document.createElement("button");
            btnIndietro.innerText = "← Torna al catalogo";
            btnIndietro.classList.add("btn-dettagli");
            btnIndietro.style.width = "220px";
            btnIndietro.addEventListener("click", () => history.back());
            
            colonnaInfo.appendChild(btnIndietro);
            colonnaInfo.appendChild(metadati);

            // Inserisci poster e info nel contenitore principale
            contenitore.appendChild(poster);
            contenitore.appendChild(colonnaInfo);
        }
    }
};

// Avvia il caricamento dei dettagli
mostraDettagli();
