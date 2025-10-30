export interface PredictionData {
  cards: Card[];
  message: string;
  message_alternative: MessageAlternative[];
  tone: string;
  total_energy: number;
}

export interface Card {
  energy: number;
  id: number;
  image: string;
  meaning: string;
  name: string;
}

export interface MessageAlternative {
  position: string;
  text: string;
}
