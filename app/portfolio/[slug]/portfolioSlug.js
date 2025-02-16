"use client"; // Oznaczenie, że komponent jest po stronie klienta
import { useState, useEffect } from "react";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import Image from "next/image";

export default function PortfolioSlug({ project }) {
  const [isLoading, setIsLoading] = useState(!project); // Jeśli project jest undefined, ustawiamy loading na true
  const [hasError, setHasError] = useState(false); // Stan na błąd

  useEffect(() => {
    if (!project) {
      setHasError(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [project]);

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

  if (hasError) {
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
      <div className="px-6  md:px-16 lg:px-20 xl:px-32 pt-10">
        <div className="flex flex-col lg:flex-row lg:gap-24 justify-between">
          <div className="lg:w-3/5">
            <h1 className="text-4xl md:text-5xl">{project.title}</h1>
            <p className="my-10">{project.description}</p>
            <p>{project.longDescription}</p>
          </div>
          <div className="lg:w-1/3 mt-16 lg:mt-0 flex justify-center items-center">
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
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-16 mt-16 lg:mt-24 xl:mt-44 pb-20">
            {project.additionalImages.map((image, index) => (
              <div className="" key={index}>
                <Image
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
