import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import projects from "@/app/data/project";
import Image from "next/image";

export default async function ProjectPage({ params }) {
  const slug = (await params).slug; // pobierz dynamiczny parametr
  console.log("Parametr slug:", slug);

  const currentProject = projects.find((p) => p.id === slug);

  if (!currentProject) {
    return (
      <>
        <Nav />
        <div>
          <h1>Błąd - nie znaleziono</h1>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Nav />
      <div>
        <h1>{currentProject.name}</h1>
        <h3>{currentProject.text}</h3>
        <Image src={currentProject.src} width={100} height={100}></Image>
      </div>
      <Footer />
    </>
  );
}
