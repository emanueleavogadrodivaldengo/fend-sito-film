// =============================================
// main.js — Logica Home page (trending settimanale)
// Mostra film e serie TV del momento
// =============================================

// Funzione per caricare e mostrare i film trending della settimana
const caricaFilmTrending = async () => {
    const endpoint = '/trending/movie/week';
    // Recupera i dati tramite la funzione condivisa in api.js
    const risultati = await fetchFromTMDB(endpoint);
    // Se la risposta è vuota, termina
    if (!risultati) return;

    const listaFilm = risultati;
    // Seleziona il contenitore film nella pagina HTML
    const contenitoreFilm = document.getElementById("film");

    // Itera su tutti i film ricevuti
    for (let i = 0; i < listaFilm.length; i++) {
        // Crea il wrapper esterno della card
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("film");

        // Crea l'immagine del poster
        const poster = document.createElement("img");
        poster.src = BASE_URL_IMG + listaFilm[i].poster_path;

        // Crea il pannello informativo che appare al hover
        const pannelloInfo = document.createElement("div");
        pannelloInfo.classList.add("schedaINT");

        // Titolo del film
        const titolo = document.createElement("p");
        titolo.innerText = listaFilm[i].title;
        titolo.classList.add("film-titolo");

        // Voto medio
        const voto = document.createElement("p");
        voto.innerText = "⭐ " + listaFilm[i].vote_average.toFixed(1);
        voto.classList.add("film-voto");

        // Lingua originale
        const lingua = document.createElement("p");
        lingua.innerText = "🌐 " + listaFilm[i].original_language.toUpperCase();
        lingua.classList.add("film-lingua");

        // Data di uscita
        const dataRilascio = document.createElement("p");
        dataRilascio.innerText = "📅 " + listaFilm[i].release_date;
        dataRilascio.classList.add("film-data");

        // Bottone per navigare alla pagina dei dettagli
        const btnInfo = document.createElement("button");
        btnInfo.innerText = "Scopri di più";
        btnInfo.classList.add("btn-dettagli");
        btnInfo.addEventListener("click", (e) => {
            e.stopPropagation(); 
            window.location.href = `dettagli.html?id=${listaFilm[i].id}&endpoint=${encodeURIComponent(endpoint)}`;
        });

        // Sinossi / overview
        const sinossi = document.createElement("p");
        sinossi.innerText = listaFilm[i].overview;
        sinossi.classList.add("film-overview");
        const lineeMax = listaFilm[i].overview.length < 30 ? 3 : 6;
        sinossi.style.webkitLineClamp = lineeMax;

        // Assembla il pannello informativo
        pannelloInfo.appendChild(titolo);
        pannelloInfo.appendChild(voto);
        pannelloInfo.appendChild(lingua);
        pannelloInfo.appendChild(dataRilascio);
        pannelloInfo.appendChild(btnInfo);
        pannelloInfo.appendChild(sinossi);

        // Assembla la card completa
        cardWrapper.appendChild(poster);
        cardWrapper.appendChild(pannelloInfo);

        // Mostra il pannello al passaggio del mouse
        cardWrapper.addEventListener("mouseenter", () => {
            pannelloInfo.style.display = "flex";
        });
        // Nasconde il pannello quando il mouse esce
        cardWrapper.addEventListener("mouseleave", () => {
            pannelloInfo.style.display = "none";
        });

        // Gestione touch per dispositivi mobili
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


// Funzione per caricare e mostrare le serie TV trending della settimana
const caricaSerieTrending = async () => {
    const endpoint = '/trending/tv/week';
    // Recupera i dati tramite la funzione condivisa in api.js
    const risultati = await fetchFromTMDB(endpoint);
    // Se la risposta è vuota, termina
    if (!risultati) return;

    const listaSerie = risultati; 
    // Seleziona il contenitore serie nella pagina HTML
    const contenitoreSerie = document.getElementById("serie"); 

    // Itera su tutte le serie ricevute
    for (let i = 0; i < listaSerie.length; i++) {
        // Crea il wrapper esterno della card
        const cardWrapper = document.createElement("div");
        cardWrapper.classList.add("film");

        // Crea l'immagine del poster
        const poster = document.createElement("img");
        poster.src = BASE_URL_IMG + listaSerie[i].poster_path;

        // Crea il pannello informativo
        const pannelloInfo = document.createElement("div");
        pannelloInfo.classList.add("schedaINT");

        // Titolo della serie (usa .name per le serie TV)
        const titolo = document.createElement("p");
        titolo.innerText = listaSerie[i].name; 
        titolo.classList.add("film-titolo");

        // Voto medio
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

        // Bottone per la pagina dettagli
        const btnInfo = document.createElement("button");
        btnInfo.innerText = "Scopri di più";
        btnInfo.classList.add("btn-dettagli");
        btnInfo.addEventListener("click", (e) => {
            e.stopPropagation(); 
            window.location.href = `dettagli.html?id=${listaSerie[i].id}&endpoint=${encodeURIComponent(endpoint)}`;
        });

        // Sinossi
        const sinossi = document.createElement("p");
        sinossi.innerText = listaSerie[i].overview;
        sinossi.classList.add("film-overview");
        const lineeMax = listaSerie[i].overview.length < 30 ? 3 : 6;
        sinossi.style.webkitLineClamp = lineeMax;

        // Assembla il pannello
        pannelloInfo.appendChild(titolo);
        pannelloInfo.appendChild(voto);
        pannelloInfo.appendChild(lingua);
        pannelloInfo.appendChild(dataRilascio);
        pannelloInfo.appendChild(btnInfo);
        pannelloInfo.appendChild(sinossi);

        // Assembla la card
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

// Avvia il caricamento dei contenuti trending
caricaFilmTrending();
caricaSerieTrending();
