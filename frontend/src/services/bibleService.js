import { FALLBACK_VERSES } from '../constants/versiculos';

const CACHE_KEY = 'bible_verse_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutos

function getCachedVerse() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const { verse, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return verse;
  } catch {
    return null;
  }
}

function cacheVerse(verse) {
  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ verse, timestamp: Date.now() }));
}

function getRandomFallback() {
  const index = Math.floor(Math.random() * FALLBACK_VERSES.length);
  return FALLBACK_VERSES[index];
}

export async function fetchBibleVerse(ignoreCache = false) {
  if (!ignoreCache) {
    const cached = getCachedVerse();
    if (cached) return cached;
  }

  try {
    const response = await fetch('https://bolls.life/get-random-verse/TBPT/', {
      signal: AbortSignal.timeout(5000),
    });
    const data = await response.json();
    const verse = {
      texto: data.text,
      referencia: `${data.bookname} ${data.chapter}:${data.verse}`,
    };
    cacheVerse(verse);
    return verse;
  } catch {
    const fallback = getRandomFallback();
    cacheVerse(fallback);
    return fallback;
  }
}
