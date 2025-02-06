"use client";
import { useEffect, useState } from "react";
import PortfolioItem from "./PortfolioItem"; // Upewnij się, że ta ścieżka jest poprawna

export default function Portfolio() {
  const [projects, setProjects] = useState([]); // Stan przechowujący dane o projektach
  const [error, setError] = useState(null); // Stan przechowujący błędy
  const [isLoading, setIsLoading] = useState(true); // Stan do śledzenia ładowania

  // Funkcja do pobierania danych z API
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/getProjects"); // Twój endpoint do pobierania projektów
      if (!response.ok) {
        throw new Error("Nie udało się pobrać projektów.");
      }
      const data = await response.json();
      setProjects(data); // Ustawienie danych w stanie
    } catch (error) {
      setError(error.message); // W przypadku błędu ustawienie komunikatu
    } finally {
      setIsLoading(false); // Po zakończeniu ładowania ustawiamy isLoading na false
    }
  };

  // Pobranie projektów po załadowaniu komponentu
  useEffect(() => {
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center my-20">Ładowanie projektów...</div> // Komunikat ładowania
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-20">{error}</div>; // Wyświetlanie błędu w przypadku niepowodzenia
  }

  return (
    <section
      id="portfolio"
      className="px-6 md:px-16 lg:px-20 xl:px-32 pb-20 xl:pb-24 2xl:py-24 "
    >
      <div className="grid grid-cols-1 gap-6">
        {projects.length > 0 ? (
          projects.map((item) => (
            <PortfolioItem key={item.id} {...item} /> // Przekazywanie danych do PortfolioItem
          ))
        ) : (
          <div className="text-center mt-20">
            Brak projektów do wyświetlenia. Wróć za chwilkę!
          </div>
        )}
      </div>
    </section>
  );
}
