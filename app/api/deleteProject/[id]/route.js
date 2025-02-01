import { NextRequest, NextResponse } from "next/server";
import { firestore, storage } from "@/app/lib/firebase.config"; // Zaimportuj storage z Firebase
import { doc, deleteDoc, getDoc } from "firebase/firestore"; // Funkcje do pracy z Firestore
import { ref, deleteObject } from "firebase/storage"; // Funkcje do usuwania obiektów z Firebase Storage

// Zmieniona funkcja DELETE z asynchronicznym dostępem do params
export async function DELETE(req, { params }) {
  const { id } = await params; // Czekamy na params przed użyciem

  try {
    // Pobieramy projekt z Firestore, aby uzyskać URL zdjęć
    const projectDocRef = doc(firestore, "portfolio", id);
    const projectDoc = await getDoc(projectDocRef);

    if (!projectDoc.exists()) {
      return NextResponse.json(
        { error: "Projekt nie znaleziony" },
        { status: 404 }
      );
    }

    const projectData = projectDoc.data();

    // Usuwamy główne zdjęcie z Firebase Storage, jeśli istnieje
    if (projectData.imageURL) {
      const imageRef = ref(storage, projectData.imageURL);
      await deleteObject(imageRef);
    }

    // Usuwamy dodatkowe zdjęcia z Firebase Storage, jeśli istnieją
    if (
      projectData.additionalImages &&
      projectData.additionalImages.length > 0
    ) {
      for (const imageURL of projectData.additionalImages) {
        const additionalImageRef = ref(storage, imageURL);
        await deleteObject(additionalImageRef);
      }
    }

    // Usuwamy dokument projektu z Firestore
    await deleteDoc(projectDocRef);

    return NextResponse.json({ message: "Projekt i zdjęcia zostały usunięte" });
  } catch (error) {
    console.error("Błąd usuwania:", error);
    return NextResponse.json(
      { error: "Błąd podczas usuwania projektu" },
      { status: 500 }
    );
  }
}
