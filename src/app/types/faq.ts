import { SanityDocument } from '@sanity/client';
import { Languages } from './language';

export interface FAQDocument extends SanityDocument {
  question: Languages;
  answer: Languages;
}
