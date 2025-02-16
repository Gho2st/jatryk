import PortfolioSlug from "./portfolioSlug";

// Funkcja do pobierania projektu na podstawie slug
const fetchProject = async (slug) => {
  try {
    // Zamiana "-" na spacje
    const formattedSlug = slug.replace(/-/g, " ");
    const response = await fetch(
      `https://jatrykdesigner.pl/api/getProjectBySlug/${formattedSlug}`
    );
    if (!response.ok) {
      throw new Error("Projekt nie znaleziony");
    }
    const project = await response.json();
    return project;
  } catch (error) {
    console.error("Błąd podczas pobierania projektu:", error);
    return null;
  }
};

// Funkcja do generowania metadanych dynamicznie
export async function generateMetadata({ params }) {
  // Poczekaj na dostęp do params
  const { slug } = await params;
  const project = await fetchProject(slug);

  return {
    title: project ? project.title : "Projekt nie znaleziony",
    description: project ? project.description : "Opis niedostępny",
    alternates: {
      canonical: `/portfolio/${project.title}`,
    },
  };
}

export default async function Page({ params }) {
  // Poczekaj na dostęp do params
  const { slug } = await params;

  const project = await fetchProject(slug);

  return <PortfolioSlug project={project} />;
}
