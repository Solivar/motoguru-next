import SanityClient from '../lib/SanityClient';
import { cache } from 'react';
import { groq } from 'next-sanity';
import { FAQItem } from '../types/faq';
import { Language } from '../types/language';
import imageUrlBuilder from '@sanity/image-url';
import { GalleryImage } from '../types/gallery';
import Gallery from '../components/Gallery';

async function getFAQ(language: Language) {
  const clientFetch = cache(SanityClient.fetch.bind(SanityClient));
  const data = await clientFetch(
    groq`*[_type == "faq"]{"id": _id, "question": question.${language}, "answer": answer.${language}}`,
  );

  return data;
}

async function getGallery(language: Language) {
  const clientFetch = cache(SanityClient.fetch.bind(SanityClient));
  const galleryDocuments: any = await clientFetch(
    groq`*[_type == "gallery" && enabled == true]{"id": _id, "altText": altText.${language}, image, orderRank}|order(orderRank)`,
  );

  const builder = imageUrlBuilder(SanityClient);
  const galleryItems: GalleryImage[] = [];

  for (const document of galleryDocuments) {
    galleryItems.push({
      id: document.id,
      altText: document.altText,
      url: builder.image(document.image).width(1600).height(800).url(),
    });
  }

  return galleryItems;
}

export default async function Home({ params: { lang } }: { params: { lang: Language } }) {
  const faqItems: FAQItem[] = await getFAQ(lang);
  const galleryItems: GalleryImage[] = await getGallery(lang);

  return (
    <main>
      <pre>{JSON.stringify(faqItems, null, 2)}</pre>

      <h1>FAQ</h1>
      {faqItems.map(item => {
        return (
          <div key={item.id}>
            <p>{item.question}</p>
            <p>{item.answer}</p>
          </div>
        );
      })}

      <Gallery items={galleryItems} />
    </main>
  );
}
