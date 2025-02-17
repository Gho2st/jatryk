import PortfolioSlug from "./portfolioSlug";

// Funkcja do pobierania projektu na podstawie slug
const fetchProject = async (slug) => {
  try {
    const response = await fetch(
      `https://jatrykdesigner.pl/api/getProjectBySlug/${slug}`
      // `http://localhost:3000/api/getProjectBySlug/${slug}`
    );

    if (!response.ok) {
      console.error("Błąd odpowiedzi:", response.status, response.statusText); // Logowanie błędu odpowiedzi
      throw new Error("Projekt nie znaleziony xd");
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
  try {
    // Poczekaj na dostęp do params
    const { slug } = await params;

    const project = await fetchProject(slug);

    return {
      title: project ? project.title : "Projekt nie znaleziony",
      description: project ? project.description : "Opis niedostępny",
      alternates: {
        canonical: `/portfolio/${encodeURIComponent(project.url)}`,
      },
    };
  } catch (error) {
    console.error("Błąd podczas generowania metadanych:", error);
    return {
      title: "Projekt nie znaleziony",
      description: "Opis niedostępny",
    };
  }
}

export default async function Page({ params }) {
  try {
    // Poczekaj na dostęp do params
    const { slug } = await params;
    console.log("Slug w Page:", slug); // Logowanie sluga w funkcji Page

    const project = await fetchProject(slug);
    console.log("Pobrany projekt w Page:", project); // Logowanie pobranego projektu

    return <PortfolioSlug project={project} />;
  } catch (error) {
    console.error("Błąd w funkcji Page:", error);
    return <div>Błąd podczas ładowania projektu.</div>; // Możesz wyświetlić jakiś fallback w przypadku błędu
  }
}
