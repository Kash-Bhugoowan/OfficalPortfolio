import Image from "next/image";

const photos = [
  "71f4c22dd1a90eed70c69648f028f3917fe1bdfa.png",
  "91e21e703f1e67d0e3373a13d9cc1ed76c448e5f.png",
  "9555cd500a5714c4f2c808a9dc8f0a608997cca5.png",
  "c7e47e92088469266a96384486a9e31813b53e58.png",
  "ecba11a8eb36c9fe7bebed58a974f9315eda7f4f.png",
  "event-1.jpg",
  "event-2.jpg",
  "event-3.jpg",
  "event-4.jpg",
];

// Repeated enough times that a full set always spans the visible window
// at any viewport width, so the loop never runs out of content mid-scroll.
const repeatedPhotos = Array.from({ length: 4 }, () => photos).flat();

function GalleryCard({ src }: { src: string }) {
  return (
    <div className="relative h-60 w-96 shrink-0 overflow-hidden rounded-xl">
      <Image
        src={`/images/home_gallery/${src}`}
        alt="Karishma at a design workshop or industry event"
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <div className="mx-auto w-full max-w-[1800px] overflow-hidden">
      <div className="animate-marquee-reverse flex w-max items-center gap-2.5">
        {repeatedPhotos.map((src, i) => (
          <GalleryCard key={`${src}-${i}`} src={src} />
        ))}
      </div>
    </div>
  );
}
