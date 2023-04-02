import SanityClient from '../lib/SanityClient';
import { cache } from 'react';
import { groq } from 'next-sanity';
import { FAQDocument } from '../types/faq';
import { Language } from '../types/language';

async function getData() {
  const clientFetch = cache(SanityClient.fetch.bind(SanityClient));
  const data = await clientFetch(groq`*[_type == "faq"]`);

  return data;
}

export default async function Home({ params: { lang } }: { params: { lang: Language } }) {
  const faqItems = await getData();
  console.log(lang);
  return (
    <main>
      <pre>{JSON.stringify(faqItems, null, 2)}</pre>

      <h1>FAQ</h1>
      {faqItems.map((item: FAQDocument) => {
        return (
          <div key={item._id}>
            <p>{item.question[lang]}</p>
            <p>{item.answer[lang]}</p>
          </div>
        );
      })}
    </main>
  );
}
