import PortfolioSlug from "./portfolioSlug";

// Funkcja do pobierania projektu na podstawie slug
const fetchProject = async (slug) => {
  try {
    console.log("Próba pobrania projektu dla sluga:", slug); // Logowanie próby pobrania projektu
    const response = await fetch(
      `https://jatrykdesigner.pl/api/getProjectBySlug/${slug}`
      // `http://localhost:3000/api/getProjectBySlug/${slug}`
    );

    if (!response.ok) {
      console.error("Błąd odpowiedzi:", response.status, response.statusText); // Logowanie błędu odpowiedzi
      throw new Error("Projekt nie znaleziony xd");
    }

    const project = await response.json();
    console.log("Odpowiedź z serwera:", project); // Logowanie odpowiedzi z serwera

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
    console.log("Slug w generateMetadata:", slug); // Logowanie sluga w generateMetadata

    const project = await fetchProject(slug);
    console.log("Pobrany projekt:", project); // Logowanie pobranego projektu

    return {
      title: project ? project.title : "Projekt nie znaleziony",
      description: project ? project.description : "Opis niedostępny",
      alternates: {
        canonical: `/portfolio/${project.url}`,
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
