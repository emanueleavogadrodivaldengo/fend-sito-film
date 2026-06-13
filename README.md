# 🎬 PrimeStream — Movie & TV App (stile Amazon Prime Video)

Applicazione web per esplorare film e serie TV tramite le API di **TMDB**, con un design ispirato ad Amazon Prime Video.

## 📁 Struttura del progetto

```
movieappavogadro/
├── index.html          # Home — film e serie trending della settimana
├── film.html           # Pagina film popolari
├── serie.html          # Pagina serie TV popolari
├── dettagli.html       # Pagina dettaglio film/serie
├── profile.html        # Pagina profilo (statica)
├── css/
│   └── style.css       # Stile globale dark/streaming (tema Prime Video)
├── js/
│   ├── config.js       # API Key e Access Token (escluso da Git)
│   ├── api.js          # Funzione fetchFromTMDB condivisa
│   ├── main.js         # Logica home (trending film + serie)
│   ├── movies.js       # Logica pagina film popolari
│   ├── serie.js        # Logica pagina serie TV popolari
│   └── detail.js       # Logica pagina dettaglio
└── img/
    ├── logo.png
    └── avatar.png
```

## 🚀 Come aprire il sito in locale

1. Clona la repository:
```bash
git clone https://github.com/emanueleavogadrodivaldengo/git-emavodevops-app.git
```

2. Entra nella cartella del progetto:
```bash
cd git-emavodevops-app
```

3. Crea il file `js/config.js` con le tue credenziali TMDB (vedi sezione sotto).

4. Apri il progetto con Live Server (estensione VS Code) oppure con:
```bash
npx serve .
```

5. Visita `http://localhost:3000` (o la porta indicata dal terminale).

> ⚠️ Il sito non funzionerà aprendo direttamente `index.html` dal file system (protocollo `file://`) a causa delle chiamate API. È necessario un server locale.

## 🔑 Configurazione API Key

Crea il file `js/config.js` nella cartella `js/` e inserisci le tue credenziali TMDB:

```js
// js/config.js
// Sostituisci con la tua API Key e il tuo Access Token presi da themoviedb.org
const API_KEY = "LA_TUA_API_KEY";
const ACCESS_TOKEN = "IL_TUO_ACCESS_TOKEN";
```

Per ottenere le credenziali:
1. Registrati su [themoviedb.org](https://www.themoviedb.org/)
2. Vai su Impostazioni → API
3. Richiedi una API Key di tipo Developer

## 🌐 Endpoint TMDB utilizzati

| Pagina          | Endpoint                  |
|-----------------|---------------------------|
| `index.html`    | `GET /trending/movie/week`|
| `index.html`    | `GET /trending/tv/week`   |
| `film.html`     | `GET /movie/popular`      |
| `serie.html`    | `GET /tv/popular`         |
| `dettagli.html` | Dettaglio singolo film/serie |

Tutte le richieste usano il parametro `language=it-IT` per ricevere titoli e descrizioni in italiano.

- Base URL: `https://api.themoviedb.org/3`
- Base URL immagini: `https://image.tmdb.org/t/p/w500`

## 📄 Pagine del sito

- **Home** (`index.html`) — mostra i film e le serie più visti della settimana in due righe scrollabili orizzontalmente
- **Movies** (`film.html`) — griglia dei film più popolari del momento
- **Serie** (`serie.html`) — griglia delle serie TV più popolari del momento
- **Dettagli** (`dettagli.html`) — pagina di dettaglio con poster, overview, voto, anno, lingua e durata/stagioni
- **Profilo** (`profile.html`) — pagina statica con info sull'autore e link alla repository GitHub

## 🛠️ Tecnologie usate

- HTML5, CSS3, JavaScript
- Fetch API + async/await
- TMDB API v3

## 👤 Autore

**Emanuele Avogadro di Valdengo** — Studente ITS
