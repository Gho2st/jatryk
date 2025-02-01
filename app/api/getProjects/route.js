import { NextResponse } from "next/server";
import { firestore } from "@/app/lib/firebase.config";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // Importujemy query i orderBy

export async function GET() {
  try {
    // Dodajemy sortowanie po polu 'order' rosnąco (ascending)
    const q = query(
      collection(firestore, "portfolio"),
      orderBy("order", "asc")
    );

    const querySnapshot = await getDocs(q); // Używamy zapytania z sortowaniem
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Błąd podczas pobierania projektów:", error);
    return NextResponse.json(
      { error: "Błąd podczas pobierania projektów" },
      { status: 500 }
    );
  }
}
