import PortfolioItem from "./PortfolioItem";

const portfolioItems = [
  {
    src: "/portfolio/nexona.png",
    alt: "Projekt 1",
    name: "Nexona",
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
    link: "#",
  },
  {
    src: "/portfolio/pekario.png",
    alt: "Projekt 2",
    name: "Pekario",
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
    link: "#",
  },
  {
    src: "/portfolio/wave.png",
    alt: "Projekt 3",
    name: "Projekt 3",
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
    link: "#",
  },
];

export default function Portfolio() {
  return (
    <section className="pb-24 xl:pb-32 2xl:pb-52">
      <div className="grid grid-cols-1 gap-6">
        {portfolioItems.map((item, index) => (
          <PortfolioItem key={index} index={index} {...item} />
        ))}
      </div>
    </section>
  );
}
