import { NextResponse } from "next/server";
import { storage } from "@/app/lib/firebase.config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export async function GET() {
  try {
    const folderRef = ref(storage, "gallery"); // Referencja do folderu w Storage
    const result = await listAll(folderRef); // Pobieramy listę plików

    // Pobieramy URL-e do każdego pliku
    const imageUrls = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );
    // console.log(imageUrls);
    return NextResponse.json(imageUrls);
  } catch (error) {
    console.error("Błąd podczas pobierania zdjęć:", error);
    return NextResponse.json(
      { error: "Błąd podczas pobierania zdjęć" },
      { status: 500 }
    );
  }
}
