export type ServiceCategory = "entreprise" | "influenceur";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  features?: string[];
  priceRange?: string;
}

export type ScriptType = "appel" | "dm" | "sms" | "email" | "objection";

export interface ScriptItem {
  id: string;
  title: string;
  type: ScriptType;
  content: string;
  tags?: string[];
  duration?: string; // pour les scripts d'appel
}

export interface ArgumentItem {
  id: string;
  service: string;
  problem: string;
  benefit: string;
  example: string;
  closingQuestion: string;
  tags?: string[];
}

export interface PrimeItem {
  id: string;
  title: string;
  description: string;
  amount?: string;
  conditions: string;
  status: "active" | "upcoming" | "completed";
  startDate?: string;
  endDate?: string;
}

export interface ExampleItem {
  id: string;
  businessType: string;
  context: string;
  message: string;
  objective: string;
  tags?: string[];
}

export type VideoCategory = "youtube" | "nexus";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  youtubeId?: string; // ID YouTube pour embed
  url?: string; // URL complète ou embed personnalisé
  thumbnail?: string;
  duration?: string;
  tags?: string[];
  content?: string; // Texte explicatif qui accompagne la vidéo sur le thème de prospection
}

