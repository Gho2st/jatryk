import { NextResponse } from "next/server";
import { storage } from "@/app/lib/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file");

    if (!files.length) {
      return NextResponse.json({ error: "Brak plików" }, { status: 400 });
    }

    const fileURLs = [];

    for (const file of files) {
      const fileRef = ref(storage, `portfolio/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(snapshot.ref);
      fileURLs.push(fileURL);
    }

    return NextResponse.json({ urls: fileURLs });
  } catch (error) {
    console.error("Błąd przesyłania zdjęć:", error);
    return NextResponse.json(
      { error: "Błąd przesyłania zdjęć" },
      { status: 500 }
    );
  }
}
