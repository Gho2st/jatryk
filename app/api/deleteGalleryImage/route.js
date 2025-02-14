import { NextResponse } from "next/server";
import { storage } from "@/app/lib/firebase.config";
import { ref, deleteObject } from "firebase/storage";

export async function DELETE(req) {
  try {
    const body = await req.json();
    console.log("Otrzymano żądanie usunięcia:", body); // 🔍 Log do sprawdzenia

    if (!body.imagePath) {
      return NextResponse.json(
        { error: "Brak ścieżki zdjęcia" },
        { status: 400 }
      );
    }

    const imageRef = ref(storage, body.imagePath);
    await deleteObject(imageRef);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd podczas usuwania zdjęcia:", error);
    return NextResponse.json(
      { error: "Nie udało się usunąć zdjęcia" },
      { status: 500 }
    );
  }
}
