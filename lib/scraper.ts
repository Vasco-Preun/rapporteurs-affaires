/**
 * Fonction pour extraire les informations principales d'une page web
 */
export async function scrapePage(url: string): Promise<{
  title: string;
  description: string;
  headings: string[];
  mainText: string;
  navigation: string[];
  error?: string;
}> {
  try {
    // Nettoyer l'URL
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    // Récupérer le HTML avec timeout manuel
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        title: '',
        description: '',
        headings: [],
        mainText: '',
        navigation: [],
        error: `Erreur HTTP: ${response.status}`,
      };
    }

    const html = await response.text();

    // Extraire le titre
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extraire la meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extraire les titres (H1, H2, H3)
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi) || [];
    const h3Matches = html.match(/<h3[^>]*>([^<]+)<\/h3>/gi) || [];
    
    const headings = [
      ...h1Matches.map(h => h.replace(/<[^>]+>/g, '').trim()),
      ...h2Matches.map(h => h.replace(/<[^>]+>/g, '').trim()).slice(0, 5),
      ...h3Matches.map(h => h.replace(/<[^>]+>/g, '').trim()).slice(0, 3),
    ].filter(Boolean);

    // Extraire le texte principal (contenu des paragraphes)
    const pMatches = html.match(/<p[^>]*>([^<]+)<\/p>/gi) || [];
    const mainText = pMatches
      .map(p => p.replace(/<[^>]+>/g, '').trim())
      .filter(p => p.length > 20)
      .slice(0, 10)
      .join(' ');

    // Extraire les liens de navigation (liens dans nav, header, footer)
    const navMatches = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/gi) || [];
    const headerMatches = html.match(/<header[^>]*>([\s\S]*?)<\/header>/gi) || [];
    const allNavHtml = [...navMatches, ...headerMatches].join(' ');
    const linkMatches = allNavHtml.match(/<a[^>]*>([^<]+)<\/a>/gi) || [];
    const navigation = linkMatches
      .map(link => link.replace(/<[^>]+>/g, '').trim())
      .filter(link => link.length > 0 && link.length < 50)
      .slice(0, 10);

    return {
      title,
      description,
      headings,
      mainText: mainText.substring(0, 1000), // Limiter à 1000 caractères
      navigation,
    };
  } catch (error: any) {
    console.error('Scraping error:', error);
    return {
      title: '',
      description: '',
      headings: [],
      mainText: '',
      navigation: [],
      error: error.message || 'Erreur lors de l\'analyse de la page',
    };
  }
}

/**
 * Détecte si un message contient une URL
 */
export function extractUrl(message: string): string | null {
  // Regex pour détecter les URLs
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/gi;
  const matches = message.match(urlRegex);
  if (matches && matches.length > 0) {
    return matches[0];
  }
  return null;
}

/**
 * Détecte si un message demande une analyse de site/entreprise
 */
export function isAnalysisRequest(message: string): boolean {
  const analysisKeywords = [
    'analyse',
    'analyser',
    'structure',
    'site web',
    'page web',
    'entreprise',
    'cabinet',
    'site internet',
    'site',
  ];
  const lowerMessage = message.toLowerCase();
  return analysisKeywords.some(keyword => lowerMessage.includes(keyword));
}
