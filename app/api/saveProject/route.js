import { firestore } from "@/app/lib/firebase.config";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, imageURL, longDescription, additionalImages } =
    await req.json();

  try {
    // Pobranie wszystkich istniejących projektów
    const projectsSnapshot = await getDocs(collection(firestore, "portfolio"));
    const projects = projectsSnapshot.docs.map((doc) => doc.data());

    // Przypisanie numeru porządkowego dla nowego projektu
    const newOrder =
      projects.length > 0 ? Math.max(...projects.map((p) => p.order)) + 1 : 0;

    const newProject = {
      title,
      description,
      imageURL,
      longDescription,
      additionalImages,
      createdAt: Timestamp.now(),
      order: newOrder,
    };

    const docRef = await addDoc(collection(firestore, "portfolio"), newProject);
    return NextResponse.json({ message: "Projekt zapisany!", id: docRef.id });
  } catch (error) {
    console.error("Błąd zapisu:", error);
    return NextResponse.json(
      { error: "Błąd podczas zapisywania projektu" },
      { status: 500 }
    );
  }
}
