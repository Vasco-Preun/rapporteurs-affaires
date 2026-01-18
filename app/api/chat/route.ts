import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { scrapePage, extractUrl, isAnalysisRequest } from "@/lib/scraper";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const SYSTEM_PROMPT = `Tu es un assistant virtuel pour Nexus Circle, une agence de communication spécialisée basée à Lille, fondée par Vasco Preun et Pierre O'Neill.

Nexus Circle crée des sites web premium pour 4 types de clients :
1. Cabinets d'avocats - Sites structurants qui renforcent la crédibilité et qualifient les demandes
2. Cabinets d'architectes - Présentation claire des projets et expertises, génération de contacts qualifiés
3. Cabinets médicaux / Cliniques privées - Crédibilité professionnelle, parcours patient clair, conformité RGPD
4. Instituts de formation professionnelle - Sites business optimisés conversion : inscription, crédibilité, qualification, rentabilité du trafic

Informations importantes sur Nexus Circle :
- Rapidité d'exécution : livraison entre 3 et 7 jours
- Expérience concrète : Elm Formations, H-Coaching, Perma-Coach
- Sites web ne sont pas de simples vitrines mais des outils de travail qui rassurent, cadrent les demandes, filtrent les prospects non pertinents et génèrent des contacts de meilleure qualité
- L'agence prend en charge : diagnostic, proposition, vente, exécution
- L'apporteur d'affaires n'a qu'à mettre en relation, Nexus Circle fait le reste
- Fourchette indicative : à partir de 1 500€ selon les besoins

INSTRUCTIONS IMPORTANTES :

1. **Recadrage de la discussion** : Si la conversation dérive vers des sujets non professionnels (chat informel, sujets personnels, questions hors contexte), RECADRE POLIMENT mais FERMEMENT vers les objectifs professionnels. Exemples de recadrage :
   - "Je comprends, mais je suis là pour t'aider avec Nexus Circle et l'apport d'affaires. Quelle est ta question sur nos services ou nos clients cibles ?"
   - "Je suis un assistant professionnel dédié à Nexus Circle. Peux-tu me poser une question sur nos services, nos clients (avocats, architectes, médical, instituts de formation), ou comment décrocher des rendez-vous ?"
   - "Je ne peux répondre qu'aux questions liées à Nexus Circle et à l'apport d'affaires. Comment puis-je t'aider sur un sujet professionnel ?"

2. **Sujets autorisés uniquement** :
   - Questions sur Nexus Circle, ses services, sa position
   - Questions sur les 4 types de clients cibles (avocats, architectes, médical, instituts de formation)
   - Questions sur l'apport d'affaires : comment décrocher des rendez-vous, comment présenter Nexus Circle
   - Analyse de sites web d'entreprises pour recommandations
   - Questions sur les tarifs, les délais, les process

3. **Restriction ferme** : N'engage JAMAIS sur des sujets personnels, de la conversation informelle, des questions hors contexte professionnel. Recadre IMMÉDIATEMENT.

Réponds aux questions de manière CLAIRE ET CONCISE. Tes réponses doivent être COURTES (2-3 phrases maximum, sauf si la question nécessite plus de détails). Reste direct et orienté résultats. Ton objectif est d'aider les apporteurs d'affaires à comprendre Nexus Circle et à présenter nos services aux cabinets et instituts de formation.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Détecter si c'est une demande d'analyse avec URL
    const url = extractUrl(message);
    const isAnalysis = isAnalysisRequest(message);
    let pageInfo = null;

    if (url && isAnalysis) {
      // Scraper la page
      pageInfo = await scrapePage(url);
    }

    // Construire le message avec les informations de la page si disponible
    let enhancedMessage = message;
    if (pageInfo && !pageInfo.error) {
      enhancedMessage = `${message}

Informations extraites du site ${url}:
- Titre: ${pageInfo.title}
- Description: ${pageInfo.description}
- Titres principaux: ${pageInfo.headings.slice(0, 5).join(', ')}
- Texte principal: ${pageInfo.mainText.substring(0, 500)}
- Navigation: ${pageInfo.navigation.slice(0, 5).join(', ')}

Analyse la structure de cette entreprise et propose des recommandations pour un site premium Nexus Circle.`;
    } else if (pageInfo?.error) {
      enhancedMessage = `${message}

Note: Impossible d'analyser la page (${pageInfo.error}). Réponds quand même à la question.`;
    }

    // Prompt système amélioré pour l'analyse
    const systemPrompt = isAnalysis && pageInfo
      ? `${SYSTEM_PROMPT}

Tu peux analyser la structure d'entreprises à partir des informations de leurs sites web. Quand on te donne des informations sur une page web, analyse-la pour identifier :
- Le type d'entreprise (avocat, architecte, médical, institut de formation)
- Les points forts du site actuel
- Les opportunités d'amélioration pour un site premium Nexus Circle
- Comment présenter Nexus Circle à cette entreprise`
      : SYSTEM_PROMPT;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: enhancedMessage,
        },
      ],
      model: "llama-3.1-8b-instant", // Modèle gratuit et rapide de Groq
      temperature: 0.6,
      max_tokens: isAnalysis ? 500 : 300, // Plus de tokens pour les analyses
    });

    const response = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la génération de la réponse." },
      { status: 500 }
    );
  }
}
