export default async function sitemap() {
  let projects = [];

  try {
    const response = await fetch(
      "https://www.jatrykdesigner.pl/api/getProjects"
    );
    if (!response.ok) {
      throw new Error("Błąd pobierania projektów");
    }
    projects = await response.json();
  } catch (error) {
    console.error("Nie udało się pobrać projektów:", error);
  }

  return [
    {
      url: "https://www.jatrykdesigner.pl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.jatrykdesigner.pl/kontakt",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Dynamiczne linki do projektów
    ...projects.map((project) => ({
      url: `https://www.jatrykdesigner.pl/portfolio/${project.title}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    {
      url: "https://www.jatrykdesigner.pl/o-mnie",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
