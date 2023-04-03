import { SanityDocument } from '@sanity/client';
import { Languages } from './language';

export interface FAQDocument extends SanityDocument {
  question: Languages;
  answer: Languages;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
