import { NextResponse } from "next/server";
import { firestore } from "@/app/lib/firebase.config"; // Importowanie konfiguracji Firebase
import { collection, query, where, getDocs } from "firebase/firestore"; // Importowanie query i where do filtrowania

// Funkcja obsługująca zapytania GET
export async function GET(request, { params }) {
  // Odczekaj na rozpakowanie params przed użyciem jego właściwości
  const { slug } = await params; // Używamy `await`, by rozpakować params

  try {
    // Tworzymy zapytanie do kolekcji "portfolio" z filtrowaniem po polu 'url'
    const q = query(
      collection(firestore, "portfolio"),
      where("url", "==", slug) // Szukamy dokumentu, którego 'url' jest równe slug
    );

    // Wykonujemy zapytanie
    const querySnapshot = await getDocs(q);

    // Sprawdzamy, czy znaleziono dokument
    if (querySnapshot.empty) {
      console.error("Projekt o url", slug, "nie został znaleziony.");
      return NextResponse.json(
        { error: "Projekt nie znaleziony" },
        { status: 404 }
      );
    }

    // Pobieramy pierwszy (jedyny) dokument z wyników
    const projectDoc = querySnapshot.docs[0];

    // Zwracamy dane projektu w formacie JSON
    return NextResponse.json({
      id: projectDoc.id,
      ...projectDoc.data(),
    });
  } catch (error) {
    console.error("Błąd podczas pobierania projektu:", error);
    return NextResponse.json(
      { error: "Błąd podczas pobierania projektu" },
      { status: 500 }
    );
  }
}
