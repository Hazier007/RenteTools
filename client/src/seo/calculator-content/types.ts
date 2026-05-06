export interface FaqItem {
  question: string;
  answer: string;
}

export type EducationalBlock =
  | { kind: "p"; text: string }
  | { kind: "formula"; text: string }
  | { kind: "ul"; items: string[] };

export interface EducationalSection {
  heading: string;
  blocks: EducationalBlock[];
}

export interface CalculatorEducationalContent {
  sections: EducationalSection[];
  faqs: FaqItem[];
}
