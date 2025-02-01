import { firestore, storage } from "@/app/lib/firebase.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject, getMetadata } from "firebase/storage";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    // Pobierz wszystkie projekty z kolekcji Firestore
    const projectCollectionRef = collection(firestore, "portfolio");
    const snapshot = await getDocs(projectCollectionRef);
    const projects = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })); // Pobieranie projektów z danymi

    // Usuń każdy projekt z Firestore i jego zdjęcie z Firebase Storage
    for (let project of projects) {
      // Usuń dokument z Firestore
      await deleteDoc(doc(firestore, "portfolio", project.id));

      // Jeśli projekt ma zdjęcie, usuń je z Firebase Storage
      if (project.imageURL) {
        const imageRef = ref(storage, project.imageURL); // Pełna ścieżka do obrazu

        try {
          // Sprawdź, czy plik istnieje w Firebase Storage
          await getMetadata(imageRef);

          // Jeśli plik istnieje, usuń go
          await deleteObject(imageRef);
          console.log(
            `Plik ${project.imageURL} został usunięty z Firebase Storage.`
          );
        } catch (error) {
          if (error.code === "storage/object-not-found") {
            console.log(
              `Plik ${project.imageURL} nie został znaleziony w Firebase Storage.`
            );
          } else {
            console.error("Błąd podczas usuwania pliku:", error);
          }
        }
      }
    }

    // Zwróć odpowiedź o sukcesie
    return NextResponse.json({
      message: "Wszystkie projekty zostały usunięte!",
    });
  } catch (error) {
    console.error("Błąd podczas usuwania projektów:", error);
    return NextResponse.json(
      { error: "Nie udało się usunąć projektów" },
      { status: 500 }
    );
  }
}
