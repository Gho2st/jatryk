import { NextResponse } from "next/server";
import { firestore } from "@/app/lib/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(req, { params }) {
  // Poczekaj na dostęp do params
  const { id } = await params; // Oczekujemy na params.id

  // Pobranie nowej wartości order
  const { order } = await req.json();

  // Sprawdzenie, czy order jest obecny
  if (order === undefined) {
    return NextResponse.json(
      { error: "Brak wymaganej wartości: order." },
      { status: 400 }
    );
  }

  try {
    // Zaktualizuj tylko 'order' w Firestore
    const projectRef = doc(firestore, "portfolio", id);
    await updateDoc(projectRef, { order });

    return NextResponse.json({
      message: "Kolejność projektu została zaktualizowana.",
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji kolejności:", error);
    return NextResponse.json(
      { error: "Błąd podczas aktualizacji kolejności" },
      { status: 500 }
    );
  }
}
