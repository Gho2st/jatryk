import PortfolioItem from "./PortfolioItem";
import projects from "../../app/data/project"; // Ścieżka do danych

export default function Portfolio() {
  return (
    <section className="pb-24 xl:pb-32 2xl:pb-52">
      <div className="grid grid-cols-1 gap-6">
        {projects.map((item, index) => (
          <PortfolioItem key={index} index={index} {...item} />
        ))}
      </div>
    </section>
  );
}
