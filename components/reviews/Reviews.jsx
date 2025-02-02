import ReviewItem from "./ReviewItem";
export default function Reviews() {
  return (
    <section className="px-6 py-20 xl:py-24 xl:px-32 bg-gradient-to-b from-gray-900 to-gray-800  ">
      <h2 className="uppercase text-3xl xl:text-5xl leading-snug  text-white mb-16 xl:mb-16">
        Sprawdź opinie o mojej pracy
      </h2>
      <div className="grid xl:grid-cols-2 gap-8 text-black">
        <ReviewItem
          name="Anna Kaszuba"
          text="Współpraca z [Imię Grafika] to czysta przyjemność. Stworzył dla mnie logo, które idealnie oddaje charakter mojej marki. Zdecydowanie polecam!"
        />
        <ReviewItem
          name="Tomasz Wąsik"
          text="Projekt przekroczył moje oczekiwania! Identyfikacja wizualna, którą otrzymałem, jest spójna, nowoczesna i doskonale pasuje do mojej firmy."
        />
        <ReviewItem
          name="Katarzyna Małek"
          text="Nie tylko świetny design, ale też doskonałe zrozumienie moich potrzeb. Współpraca przebiegła sprawnie, a efekty są rewelacyjne!"
        />
      </div>
    </section>
  );
}
