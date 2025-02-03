"use client";
import { useState, useEffect } from "react";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import Image from "next/image";

const fetchProject = async (slug) => {
  try {
    const response = await fetch(`/api/getProjectBySlug/${slug}`);

    if (!response.ok) {
      throw new Error("Projekt nie znaleziony");
    }

    const project = await response.json();
    return project;
  } catch (error) {
    console.error("Błąd podczas pobierania projektu:", error);
    return null;
  }
};

export default function ProjectPage({ params }) {
  const [project, setProject] = useState(null);
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Dodajemy stan ładowania

  useEffect(() => {
    const getSlug = async () => {
      const unwrappedParams = await params;
      const slug = unwrappedParams.slug;
      setSlug(slug);
    };

    getSlug();
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchProject(slug).then((data) => {
        setProject(data);
        setIsLoading(false); // Zmieniamy stan na zakończony po załadowaniu danych
      });
    }
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="text-center my-20 text-lg">
          <h1>Ładowanie projektu...</h1>
        </div>
        <Footer />
      </>
    );
  }

  if (!slug || !project) {
    return (
      <>
        <Nav />
        <div className="text-center my-20 text-lg">
          <h1>Błąd - nie znaleziono projektu</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="px-6 md:px-16 lg:px-20 xl:px-32 xl:py-24">
        <div className="flex flex-col xl:flex-row justify-between">
          <div className="xl:w-3/5">
            <h1 className="text-4xl xl:text-5xl">{project.title}</h1>
            <p className="my-10">{project.description}</p>
            <p className="">{project.longDescription}</p>
          </div>
          <div className="xl:w-1/4 mt-16 xl:mt-0">
            {project.imageURL && (
              <Image
                src={project.imageURL}
                alt={project.title}
                width={300}
                height={200}
                layout="responsive"
              />
            )}
          </div>
        </div>

        {project.additionalImages.length > 0 && (
          <div className="flex flex-col xl:flex-row gap-8 mt-16 xl:mt-44 pb-20">
            {project.additionalImages.map((image, index) => (
              <div className="xl:w-1/3">
                <Image
                  key={index}
                  src={image}
                  alt={`Dodatkowe zdjęcie ${index + 1}`}
                  width={400}
                  height={300}
                  layout="responsive"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
