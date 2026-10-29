import Image from "next/image";
import type { StoryImage, StoryVideo } from "@/lib/schema";

export function VideoEmbed({ video }: { video: StoryVideo }) {
  const src =
    video.provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.id}?rel=0`
      : video.provider === "vimeo"
        ? `https://player.vimeo.com/video/${video.id}?dnt=1`
        : null;
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden bg-card">
        {src ? (
          <iframe
            src={src}
            title={video.title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video controls preload="metadata" poster={video.thumbnail} className="absolute inset-0 h-full w-full">
            <source src={video.src} />
          </video>
        )}
      </div>
      <figcaption className="mt-2 text-sm text-muted">
        <span className="text-ink-2">{video.title}</span>
        {video.credit ? <span> · Video: {video.credit}</span> : null}
      </figcaption>
    </figure>
  );
}

export function Figure({ image, priority, sizes }: { image: StoryImage; priority?: boolean; sizes: string }) {
  return (
    <figure>
      <div className="relative aspect-[3/2] overflow-hidden bg-card">
        <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      {image.caption || image.credit ? (
        <figcaption className="mt-2 text-sm text-muted">
          {image.caption ? <span className="text-ink-2">{image.caption}</span> : null}
          {image.credit ? <span> Photo: {image.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Photo essay grid. Each image opens at full resolution in a new tab. */
export function Gallery({ images, title }: { images: StoryImage[]; title: string }) {
  if (!images.length) return null;
  return (
    <section aria-labelledby="gallery-heading" className="mt-14">
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <h2 id="gallery-heading" className="font-display text-2xl text-ink">Photo Story</h2>
        <span className="kicker !text-muted">{images.length} photos</span>
      </div>
      <ul className="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2">
        {images.map((img, i) => (
          <li key={img.src} className={i % 5 === 0 ? "sm:col-span-2" : ""}>
            <figure>
              <a href={img.src} target="_blank" rel="noopener" aria-label={`Open full-size photo: ${img.alt}`}>
                <div className={`relative overflow-hidden bg-card ${i % 5 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={i % 5 === 0 ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 640px) 380px, 100vw"}
                    className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </a>
              <figcaption className="mt-2 text-sm text-muted">
                {img.caption ? <span className="text-ink-2">{img.caption} </span> : null}
                {img.credit ? <span>Photo: {img.credit}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="sr-only">End of photo story for {title}.</p>
    </section>
  );
}
