// =============================================
// movies.js — Logica pagina Film Popolari
// Carica e mostra la griglia dei film più visti
// =============================================

const caricaFilmPopolari = async () => {
    const endpoint = '/movie/popular';
    // Recupera i film popolari tramite la funzione API condivisa
    const risultati = await fetchFromTMDB(endpoint);
    // Nessun dato disponibile
    if (!risultati) return;

    const listaFilm = risultati;
    // Seleziona il contenitore HTML dei film
    const contenitoreFilm = document.getElementById("film");

    // Crea una card per ogni film nella lista
    for (let i = 0; i < listaFilm.length; i++) {
        // Wrapper della card
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("film");

        // Poster del film
        const poster = document.createElement("img");
        poster.src = BASE_URL_IMG + listaFilm[i].poster_path;

        // Pannello info visibile al hover
        const pannelloInfo = document.createElement("div");
        pannelloInfo.classList.add("schedaINT");

        // Titolo
        const titolo = document.createElement("p");
        titolo.innerText = listaFilm[i].title;
        titolo.classList.add("film-titolo");

        // Valutazione
        const voto = document.createElement("p");
        voto.innerText = "⭐ " + listaFilm[i].vote_average.toFixed(1);
        voto.classList.add("film-voto");

        // Lingua originale
        const lingua = document.createElement("p");
        lingua.innerText = "🌐 " + listaFilm[i].original_language.toUpperCase();
        lingua.classList.add("film-lingua");

        // Data di rilascio
        const dataRilascio = document.createElement("p");
        dataRilascio.innerText = "📅 " + listaFilm[i].release_date;
        dataRilascio.classList.add("film-data");
        
        // Bottone per aprire la pagina dettaglio
        const btnInfo = document.createElement("button");
        btnInfo.innerText = "Scopri di più";
        btnInfo.classList.add("btn-dettagli");
        btnInfo.addEventListener("click", (e) => {
            e.stopPropagation(); 
            window.location.href = `dettagli.html?id=${listaFilm[i].id}&endpoint=${encodeURIComponent(endpoint)}`;
        });

        // Sinossi con troncamento
        const sinossi = document.createElement("p");
        sinossi.innerText = listaFilm[i].overview;
        sinossi.classList.add("film-overview");
        const lineeMax = listaFilm[i].overview.length < 30 ? 3 : 6;
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

        // Mostra pannello al hover del mouse
        cardWrapper.addEventListener("mouseenter", () => {
            pannelloInfo.style.display = "flex";
        });
        // Nasconde pannello quando il mouse esce
        cardWrapper.addEventListener("mouseleave", () => {
            pannelloInfo.style.display = "none";
        });

        // Gestione tap su mobile
        cardWrapper.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (pannelloInfo.style.display === "flex") {
                pannelloInfo.style.display = "none";
            } else {
                document.querySelectorAll(".schedaINT").forEach(s => s.style.display = "none");
                pannelloInfo.style.display = "flex";
            }
        });

        contenitoreFilm.appendChild(cardWrapper);
    }
};

// Avvia il caricamento
caricaFilmPopolari();
