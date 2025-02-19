"use client";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  // Maksymalny rozmiar pliku: 4.5 MB
  const MAX_FILE_SIZE = 4.5 * 1024 * 1024;

  // Pobiera wszystkie zdjęcia z Firebase Storage
  const fetchGallery = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/getGallery");
      const data = await response.json();
      setGallery(data); // Aktualizacja galerii
    } catch (error) {
      setMessage("❌ Błąd podczas pobierania galerii");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Funkcja do generowania unikalnej nazwy pliku
  const generateUniqueFileName = (originalFileName) => {
    const timestamp = new Date().getTime(); // Dodanie znacznika czasu
    const fileExtension = originalFileName.split(".").pop(); // Rozszerzenie pliku
    return `${timestamp}_${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExtension}`; // Unikalna nazwa
  };

  // Obsługa uploadu zdjęcia
  const handleImageUpload = async (file) => {
    if (!file) return;

    // Sprawdzanie rozmiaru pliku
    if (file.size > MAX_FILE_SIZE) {
      setMessage("❌ Plik jest za duży. Maksymalny rozmiar to 4.5 MB.");
      return;
    }

    setUploading(true);
    setMessage("");

    const uniqueFileName = generateUniqueFileName(file.name); // Tworzymy unikalną nazwę pliku
    const formData = new FormData();
    formData.append("file", file, uniqueFileName); // Przesyłamy plik z unikalną nazwą

    try {
      const response = await fetch("/api/uploadGalleryImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.urls) {
        setMessage("✅ Zdjęcie dodane pomyślnie!");
        fetchGallery(); // Odświeżenie galerii po dodaniu zdjęcia
      } else {
        setMessage("❌ Błąd podczas dodawania zdjęcia.");
      }
    } catch (error) {
      setMessage("❌ Błąd podczas wysyłania zdjęcia.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Obsługa usuwania zdjęcia
  const handleDeleteImage = async (imagePath) => {
    if (!imagePath) return;

    setDeleting(true);
    setMessage("");

    try {
      const response = await fetch("/api/deleteGalleryImage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ Zdjęcie usunięte!");
        fetchGallery(); // Odświeżenie galerii po usunięciu zdjęcia
      } else {
        setMessage("❌ Błąd podczas usuwania zdjęcia.");
      }
    } catch (error) {
      setMessage("❌ Błąd podczas usuwania zdjęcia.");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="py-10 mx-auto max-w-4xl">
      <h2 className="text-center text-3xl text-white">
        Edytuj Slider ze zdjęciami
      </h2>

      {/* Komunikaty */}
      {message && (
        <p className="text-center text-white bg-gray-700 p-2 rounded-lg my-4">
          {message}
        </p>
      )}

      {/* Upload zdjęcia */}
      <div className="mt-6">
        <h3 className="text-white mb-4">Dodaj zdjęcie do galerii</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="mb-4 text-white"
          disabled={uploading}
        />
        {uploading && <p className="text-white">📤 Wysyłanie zdjęcia...</p>}
      </div>

      {/* Galeria obrazków */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-white text-center">🔄 Ładowanie galerii...</p>
        ) : gallery.length > 0 ? (
          gallery.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.url}
                alt={`Gallery Image ${index}`}
                className="w-full object-cover rounded-lg shadow-md"
              />
              {/* Przycisk usuwania */}
              <button
                onClick={() => handleDeleteImage(image.url)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded shadow-lg"
                disabled={deleting}
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <p className="text-white text-center">Brak zdjęć w galerii.</p>
        )}
      </div>

      {deleting && (
        <p className="text-white text-center mt-4">🗑 Usuwanie zdjęcia...</p>
      )}
    </div>
  );
}
