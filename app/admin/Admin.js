"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase.config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "@/components/nav/Nav";
import Gallery from "./changeGallery";
import Footer from "@/components/footer/Footer";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImagesToUpload, setAdditionalImagesToUpload] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [imageToUpload, setImageToUpload] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [existingImageURL, setExistingImageURL] = useState("");

  // Sprawdzanie statusu logowania
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logowanie użytkownika
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (error) {
      setError("Nieprawidłowy e-mail lub hasło.");
    }
  };

  // Wylogowanie użytkownika
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Funkcja do pobierania projektów z Firestore
  const fetchProjects = async () => {
    const response = await fetch("/api/getProjects");
    const data = await response.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // funkcje do dodawania zdjec

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageToUpload(file); // Przechowuj rzeczywisty plik dla późniejszego uploadu
      setImageURL(URL.createObjectURL(file)); // Używaj do podglądu
    }
  };

  const handleAdditionalImageUpload = (event) => {
    const files = Array.from(event.target.files);

    setAdditionalImagesToUpload((prev) => [...prev, ...files]); // Dodajemy nowe pliki do istniejących
    setAdditionalImages((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]); // Dodajemy nowe podglądy
  };

  const uploadImage = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    if (existingImageURL) formData.append("existingImageURL", existingImageURL);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.urls ? data.urls[0] : null;
  };

  // Funkcja do zapisywania projektu
  const handleSaveProject = async () => {
    if (!imageURL || !additionalImages || !title || !description) {
      setError("Wszystkie pola (tytuł, opis, zdjęcia) są wymagane.");
      return;
    }

    const uploadedImageURL = await uploadImage(imageToUpload); // Wysyłamy rzeczywisty plik
    const uploadedAdditionalImages = await Promise.all(
      additionalImagesToUpload.map((file) => uploadImage(file)) // Wysyłamy dodatkowe pliki
    );

    if (!uploadedImageURL || uploadedAdditionalImages.includes(null)) {
      setError("Wystąpił błąd podczas przesyłania zdjęć.");
      return;
    }

    const projectData = {
      title,
      description,
      imageURL: uploadedImageURL,
      longDescription,
      additionalImages: uploadedAdditionalImages,
      existingImageURL,
    };

    if (isEditing) {
      await fetch(`/api/updateProject/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      setIsEditing(false);
      setEditingId(null);
    } else {
      const response = await fetch("/api/saveProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      fetchProjects();
      setError("");
      setTitle("");
      setDescription("");
      setImageURL("");
      setAdditionalImages([]);
      setLongDescription("");
      setExistingImageURL("");
    }
  };

  // Funkcja do edytowania projektu
  const handleEditProject = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setImageURL(project.imageURL);
    setLongDescription(project.longDescription);
    setAdditionalImages(project.additionalImages);
    setIsEditing(true);
    setEditingId(project.id);
  };

  // funkcja do usuwania zdjecia pojedynczego podczas edytowania
  const handleRemoveMainImage = async () => {
    if (!imageURL || !editingId) return;

    try {
      const response = await fetch(
        `/api/deleteImage?imageURL=${encodeURIComponent(
          imageURL
        )}&projectId=${editingId}&isMainImage=true`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        console.error("Błąd podczas usuwania głównego zdjęcia");
        return;
      }

      setImageURL("");
      setImageToUpload(null);
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  const handleRemoveAdditionalImage = async (index) => {
    const imageURLToRemove = additionalImages[index];

    try {
      const response = await fetch(
        `/api/deleteImage?imageURL=${encodeURIComponent(
          imageURLToRemove
        )}&projectId=${editingId}&isMainImage=false`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        console.error("Błąd podczas usuwania dodatkowego zdjęcia");
        return;
      }

      setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
      setAdditionalImagesToUpload((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  // Funkcja do usuwania projektu
  const handleDeleteProject = async (id) => {
    const response = await fetch(`/api/deleteProject/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.message) {
      fetchProjects();
    }
  };

  // Funkcja do zmiany kolejności
  const handleReorder = async (id, direction) => {
    const projectToMove = projects.find((project) => project.id === id);
    const newOrder = projectToMove.order + direction;

    // Logowanie wartości order
    console.log(
      `Projekt: ${projectToMove.title}, Obecna pozycja: ${projectToMove.order}, new order: ${newOrder}`
    );

    // Zmieniamy order projektu
    const response = await fetch(`/api/updateProjectOrder/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: newOrder }),
    });

    if (response.ok) {
      fetchProjects();
    } else {
      console.error("Błąd podczas aktualizacji kolejności.");
    }
  };

  // Jeśli użytkownik nie jest zalogowany, pokaż formularz logowania
  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6  shadow-md rounded-lg mt-20 text-black">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Logowanie
        </h2>
        {error && <p className="text-red-600 mb-5">{error}</p>}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-blue-600 text-white  rounded-md hover:bg-blue-700"
        >
          Zaloguj się
        </button>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto p-6 text-black">
        <div className="text-white">
          <h1 className="text-3xl font-semibold text-center mb-6 text-white">
            Panel administracyjny
          </h1>
        </div>
        <div className=" flex justify-center">
          <button
            className="inline-block bg-blue-50 hover:bg-blue-300 px-6 py-1 hover:cursor-pointer  text-blue-800"
            onClick={handleLogout}
          >
            Wyloguj
          </button>
        </div>

        <div className=" shadow-lg p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            {isEditing ? "Edytuj projekt" : "Dodaj nowy projekt"}
          </h2>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <input
            type="text"
            placeholder="Tytuł projektu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Opis projektu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Długi opis projektu"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <h3 className="text-white mb-5">Dodaj zdjęcie główne</h3>
          <input
            type="file"
            onChange={handleImageUpload}
            className="mb-4 text-white"
          />

          {imageURL && (
            <div className="flex flex-col items-start mb-4">
              <img src={imageURL} alt="Podgląd" width={100} className="mb-2" />
              <button
                onClick={handleRemoveMainImage}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Usuń zdjęcie główne
              </button>
            </div>
          )}

          <h3 className="text-white mb-5">Dodaj zdjęcia dodatkowe</h3>

          <input
            type="file"
            multiple
            onChange={handleAdditionalImageUpload}
            className="mb-4 text-white"
          />

          {additionalImages.length > 0 && (
            <div>
              <h3 className="text-xl text-white">Dodatkowe zdjęcia:</h3>
              <div className="flex flex-wrap gap-4">
                {additionalImages.map((url, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <img
                      src={url}
                      alt={`Dodatkowe zdjęcie ${index + 1}`}
                      width={100}
                      className="mb-2"
                    />
                    <button
                      onClick={() => handleRemoveAdditionalImage(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSaveProject}
            disabled={
              !imageURL ||
              !title ||
              !description ||
              additionalImages.length === 0
            }
            className="w-full p-3 mt-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isEditing ? "Zapisz zmiany" : "Dodaj projekt"}
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-white">Projekty</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="bg-white shadow-lg p-4 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p>{project.description}</p>
                  <p>Obecna pozycja: {project.order}</p>{" "}
                  {/* Logowanie orderu */}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleReorder(project.id, -1)} // Przesuwanie w górę
                    className="text-green-600 hover:underline"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleReorder(project.id, 1)} // Przesuwanie w dół
                    className="text-green-600 hover:underline"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleEditProject(project)}
                    className="text-blue-600 hover:underline"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-600 hover:underline"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Gallery />
      </div>
      <Footer />
    </>
  );
}
