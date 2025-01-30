import ReviewItem from "./ReviewItem";
export default function Reviews() {
  return (
    <section className="px-6 min-h-[100vh] bg-black ">
      <h2 className="uppercase text-3xl leading-snug py-10 text-white mb-16">
        Sprawdź opinie o mojej pracy
      </h2>
      <ReviewItem />
    </section>
  );
}
