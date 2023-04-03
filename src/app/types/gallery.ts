import { LocaleString } from './language';
import { SanityDocument } from '@sanity/client';

export interface GalleryDocument extends SanityDocument {
  image: any; // Image schema
  altText: LocaleString;
}

export interface GalleryImage {
  id: string;
  url: string;
  altText: string;
}
