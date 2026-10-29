# Media files

Store each story's photos and video in a folder named after its slug:

    public/media/nyc-events/<slug>/cover.jpg
    public/media/nyc-events/<slug>/01.jpg
    public/media/press-media/<slug>/cover.jpg

Reference them in frontmatter as `/media/nyc-events/<slug>/cover.jpg`.

- Covers: JPEG or PNG, landscape, at least 1600 px wide. The share-card generator can only composite JPEG and PNG.
- Export at 2400 px on the long edge or less and under about 1.5 MB. The site serves resized AVIF and WebP automatically.
- Strip GPS location from EXIF before committing, especially for photos of minors in the MIND Youth Project.
- Large video files belong on YouTube or Vimeo, not in the repository.
