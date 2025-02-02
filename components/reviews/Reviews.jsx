import ReviewItem from "./ReviewItem";
export default function Reviews() {
  return (
    <section className="px-6 xl:px-32 min-h-[100vh] bg-black  ">
      <h2 className="uppercase text-3xl xl:text-5xl leading-snug py-10 xl:py-24 text-white mb-6 xl:mb-0">
        Sprawdź opinie o mojej pracy
      </h2>
      <div className="grid xl:grid-cols-2 gap-8 pb-16">
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
