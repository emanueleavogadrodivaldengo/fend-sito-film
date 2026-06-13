// URL base per le chiamate API a TMDB v3
const BASE_URL = 'https://api.themoviedb.org/3';
// URL base per le immagini dei poster
const BASE_URL_IMG = 'https://image.tmdb.org/t/p/w500';

// Funzione generica per effettuare richieste a TMDB
async function fetchFromTMDB(endpoint) {
  try {
    const risposta = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=it-IT`);
    if (!risposta.ok) throw new Error('Errore nella risposta API');
    const dati = await risposta.json();
    return dati.results;
  } catch (errore) {
    console.error('Errore durante la fetch:', errore);
    alert("Contenuto non disponibile");
    return [];
  }
}
