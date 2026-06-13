// =============================================
// serie.js — Logica pagina Serie TV Popolari
// Carica e mostra la griglia delle serie più viste
// =============================================

const caricaSeriePopolari = async () => {
    const endpoint = '/tv/popular';
    // Recupera le serie popolari tramite la funzione API condivisa
    const risultati = await fetchFromTMDB(endpoint);
    // Nessun dato disponibile
    if (!risultati) return;

    const listaSerie = risultati; 
    // Seleziona il contenitore HTML delle serie
    const contenitoreSerie = document.getElementById("serie"); 

    // Crea una card per ogni serie nella lista
    for (let i = 0; i < listaSerie.length; i++) {
        // Wrapper della card
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("film");

        // Poster della serie
        const poster = document.createElement("img");
        poster.src = BASE_URL_IMG + listaSerie[i].poster_path;

        // Pannello info visibile al hover
        const pannelloInfo = document.createElement("div");
        pannelloInfo.classList.add("schedaINT");

        // Nome della serie (si usa .name per le serie TV)
        const titolo = document.createElement("p");
        titolo.innerText = listaSerie[i].name; 
        titolo.classList.add("film-titolo");

        // Valutazione
        const voto = document.createElement("p");
        voto.innerText = "⭐ " + listaSerie[i].vote_average.toFixed(1);
        voto.classList.add("film-voto");

        // Lingua originale
        const lingua = document.createElement("p");
        lingua.innerText = "🌐 " + listaSerie[i].original_language.toUpperCase();
        lingua.classList.add("film-lingua");

        // Data prima messa in onda
        const dataRilascio = document.createElement("p");
        dataRilascio.innerText = "📅 " + listaSerie[i].first_air_date; 
        dataRilascio.classList.add("film-data");

        // Bottone per aprire la pagina dettaglio
        const btnInfo = document.createElement("button");
        btnInfo.innerText = "Scopri di più";
        btnInfo.classList.add("btn-dettagli");
        btnInfo.addEventListener("click", (e) => {
            e.stopPropagation(); 
            window.location.href = `dettagli.html?id=${listaSerie[i].id}&endpoint=${encodeURIComponent(endpoint)}`;
        });

        // Sinossi con troncamento
        const sinossi = document.createElement("p");
        sinossi.innerText = listaSerie[i].overview;
        sinossi.classList.add("film-overview");
        const lineeMax = listaSerie[i].overview.length < 30 ? 3 : 6;
        sinossi.style.webkitLineClamp = lineeMax;

        // Assembla pannello info
        pannelloInfo.appendChild(titolo);
        pannelloInfo.appendChild(voto);
        pannelloInfo.appendChild(lingua);
        pannelloInfo.appendChild(dataRilascio);
        pannelloInfo.appendChild(btnInfo);
        pannelloInfo.appendChild(sinossi);

        // Assembla card
        cardWrapper.appendChild(poster);
        cardWrapper.appendChild(pannelloInfo);

        // Hover desktop
        cardWrapper.addEventListener("mouseenter", () => {
            pannelloInfo.style.display = "flex";
        });
        cardWrapper.addEventListener("mouseleave", () => {
            pannelloInfo.style.display = "none";
        });

        // Touch mobile
        cardWrapper.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (pannelloInfo.style.display === "flex") {
                pannelloInfo.style.display = "none";
            } else {
                document.querySelectorAll(".schedaINT").forEach(s => s.style.display = "none");
                pannelloInfo.style.display = "flex";
            }
        });

        contenitoreSerie.appendChild(cardWrapper); 
    }
};

// Avvia il caricamento
caricaSeriePopolari();
