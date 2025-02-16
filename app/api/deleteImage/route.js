import { NextRequest, NextResponse } from "next/server";
import { firestore, storage } from "@/app/lib/firebase.config";
import { ref, deleteObject } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// Usuwanie zdjęcia
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const imageURL = searchParams.get("imageURL");
    const projectId = searchParams.get("projectId");
    const isMainImage = searchParams.get("isMainImage") === "true";

    if (!imageURL || !projectId) {
      return NextResponse.json(
        { error: "Brak wymaganych parametrów" },
        { status: 400 }
      );
    }

    // 1. Usunięcie zdjęcia z Firebase Storage
    const imageRef = ref(storage, imageURL);
    await deleteObject(imageRef);

    // 2. Aktualizacja Firestore - usuwamy URL z obiektu projektu
    const projectRef = doc(firestore, "portfolio", projectId);
    const projectDoc = await getDoc(projectRef);

    if (!projectDoc.exists()) {
      return NextResponse.json(
        { error: "Projekt nie istnieje" },
        { status: 404 }
      );
    }

    const projectData = projectDoc.data();
    let updatedData = {};

    if (isMainImage) {
      updatedData.imageURL = ""; // Usuwamy główne zdjęcie
    } else {
      updatedData.additionalImages = projectData.additionalImages.filter(
        (url) => url !== imageURL
      ); // Usuwamy tylko jedno zdjęcie z listy dodatkowych
    }

    await updateDoc(projectRef, updatedData);

    return NextResponse.json({
      message: "Zdjęcie usunięte z Storage i Firestore",
    });
  } catch (error) {
    console.error("Błąd podczas usuwania zdjęcia:", error);
    return NextResponse.json(
      { error: "Nie udało się usunąć zdjęcia" },
      { status: 500 }
    );
  }
}
