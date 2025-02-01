import { NextResponse } from "next/server";
import { firestore } from "@/app/lib/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(req, { params }) {
  // Poczekaj na dostęp do params
  const { id } = await params; // Oczekujemy na params.id

  // Pobranie danych z body żądania
  const { title, description, imageURL, longDescription, additionalImages } =
    await req.json();

  // Sprawdzenie, czy wszystkie wymagane dane są obecne
  if (!title || !description || !imageURL) {
    return NextResponse.json(
      { error: "Brak wymaganych danych: title, description, imageURL." },
      { status: 400 }
    );
  }

  try {
    // Zaktualizuj dokument w Firestore
    const projectRef = doc(firestore, "portfolio", id);
    await updateDoc(projectRef, {
      title,
      description,
      imageURL,
      longDescription,
      additionalImages,
    });

    return NextResponse.json({
      message: "Projekt został zaktualizowany.",
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji projektu:", error);
    return NextResponse.json(
      { error: "Błąd podczas aktualizacji projektu" },
      { status: 500 }
    );
  }
}
