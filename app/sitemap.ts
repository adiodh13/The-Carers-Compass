export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const guidePages = [
    "/course/how-to-use",
    "/course/section-1",
    "/course/section-2",
    "/course/section-3",
    "/course/section-4",
    "/course/section-5",
    "/course/finish",
  ];
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/note-from-the-creator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/course-outline`, changeFrequency: "weekly", priority: 0.8 },
    ...guidePages.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
