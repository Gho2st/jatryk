import PortfolioSlug from "./portfolioSlug";

// Funkcja do pobierania projektu na podstawie slug
const fetchProject = async (slug) => {
  try {
    const response = await fetch(
      // `http://localhost:3000/api/getProjectBySlug/${slug}`
      `https://jatrykdesigner.pl/api/getProjectBySlug/${slug}`
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
  const project = await fetchProject(params.slug);

  return {
    title: project ? project.title : "Projekt nie znaleziony",
    description: project ? project.description : "Opis niedostępny",
    alternates: {
      canonical: `/portfolio${project.title}`,
    },
  };
}

export default async function Page({ params }) {
  const project = await fetchProject(params.slug);

  return <PortfolioSlug project={project} />;
}
