"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Pobiera wszystkie zdjęcia z Firebase Storage
  const fetchGallery = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/getGallery");
      const data = await response.json();
      setGallery(data); // Aktualizacja galerii
    } catch (error) {
      setMessage("❌ Błąd podczas pobierania galerii");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const carouselSettings = {
    infinite: true,
    speed: 800,
    lazyLoad: "ondemand",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    initialSlide: 0,
    centerMode: true,
    dots: false,

    responsive: [
      {
        breakpoint: 1334,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="mb-20 mt-10 overflow-hidden">
      {/* Komunikat błędu lub sukcesu */}
      {message && (
        <p className="text-center text-white bg-gray-700 p-2 rounded-lg my-4">
          {message}
        </p>
      )}

      {/* Ładowanie galerii */}
      {loading && (
        <p className="text-center mt-10 text-white">🔄 Ładowanie galerii...</p>
      )}

      {/* Jeśli galeria została załadowana, wyświetlamy karuzelę */}
      {!loading && gallery.length > 0 && (
        <Slider
          {...carouselSettings}
          className="w-11/12 mx-auto my-20 2xl:mt-36 md:px-6 2xl:px-20   "
        >
          {gallery.map((image, index) => (
            <Image
              key={index}
              src={image.url} // Zmieniamy tutaj na dynamiczny URL
              alt={`Gallery Image ${index}`}
              width={500}
              height={500}
              className="px-2 md:rounded-xl"
            />
          ))}
        </Slider>
      )}

      {/* Jeśli brak zdjęć w galerii */}
      {!loading && gallery.length === 0 && (
        <p className="text-center text-white">Brak zdjęć w galerii.</p>
      )}
    </div>
  );
}
