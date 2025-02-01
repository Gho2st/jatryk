"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase.config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

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

  // Funkcja do obsługi uploadu głównego zdjęcia
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.urls) {
      setImageURL(data.urls[0]);
    }
  };

  // Funkcja do obsługi uploadu dodatkowych zdjęć
  const handleAdditionalImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();

    // Dodajemy wszystkie wybrane pliki do FormData
    for (let file of files) {
      formData.append("file", file);
    }

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.urls) {
      setAdditionalImages((prevImages) => [...prevImages, ...data.urls]);
    }
  };

  // Funkcja do zapisywania projektu
  const handleSaveProject = async () => {
    if (!imageURL || !title || !description) {
      setError("Wszystkie pola (tytuł, opis, zdjęcie) są wymagane.");
      return;
    }

    if (additionalImages.length === 0) {
      setError("Dodaj przynajmniej jedno dodatkowe zdjęcie.");
      return;
    }

    const projectData = {
      title,
      description,
      imageURL,
      longDescription,
      additionalImages,
    };

    if (isEditing) {
      const response = await fetch(`/api/updateProject/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      const data = await response.json();
      if (data.message) {
        setIsEditing(false);
        setEditingId(null);
        fetchProjects();
        setError("");

        // Resetowanie pól formularza po zapisaniu
        setTitle("");
        setDescription("");
        setImageURL("");
        setAdditionalImages([]);
        setLongDescription("");
      }
    } else {
      const response = await fetch("/api/saveProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      const data = await response.json();
      if (data.message) {
        fetchProjects();
        setError("");

        // Resetowanie pól formularza po zapisaniu
        setTitle("");
        setDescription("");
        setImageURL("");
        setAdditionalImages([]);
        setLongDescription("");
      }
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
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
        <h2 className="text-2xl font-semibold text-center mb-4">Logowanie</h2>
        {error && <p className="text-red-600">{error}</p>}
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
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Zaloguj się
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Panel administracyjny
      </h1>

      <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">
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

        <input
          type="file"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          className="mb-4"
        />

        {imageURL && (
          <img src={imageURL} alt="Podgląd" width={100} className="mb-4" />
        )}

        <input
          type="file"
          multiple
          onChange={handleAdditionalImageUpload}
          className="mb-4"
        />

        {additionalImages.length > 0 && (
          <div>
            <h3 className="text-xl">Dodatkowe zdjęcia:</h3>
            <div className="flex flex-wrap gap-4">
              {additionalImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Dodatkowe zdjęcie ${index + 1}`}
                  width={100}
                  className="mb-4"
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSaveProject}
          disabled={
            !imageURL || !title || !description || additionalImages.length === 0
          }
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isEditing ? "Zapisz zmiany" : "Dodaj projekt"}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Projekty</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="bg-white shadow-lg p-4 rounded-lg">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p>{project.description}</p>
                <p>Obecna pozycja: {project.order}</p> {/* Logowanie orderu */}
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
    </div>
  );
}
