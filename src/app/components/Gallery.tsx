import Image from 'next/image';
import { GalleryImage } from '../types/gallery';

export default function Gallery({ items }: { items: GalleryImage[] }) {
  return (
    <>
      <h2>Gallery</h2>

      {items.map(item => {
        return (
          <li key={item.id}>
            <Image
              src={item.url}
              alt={item.altText ?? ''}
              width={720}
              height={360}
            />
          </li>
        );
      })}
    </>
  );
}
