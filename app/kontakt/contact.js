"use client";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [errorFields, setErrorFields] = useState([]);
  const recaptchaRef = useRef(null);

  const sendMail = async (e) => {
    e.preventDefault();

    const fieldsToCheck = { name, email, message };
    const emptyFields = Object.entries(fieldsToCheck)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    setErrorFields(emptyFields);

    if (emptyFields.length > 0) {
      setFormError("Proszę uzupełnić wszystkie wymagane pola.");
      return;
    }

    // Get the reCAPTCHA token
    const recaptchaToken = await recaptchaRef.current.executeAsync();

    if (!recaptchaToken) {
      setFormError("Weryfikacja reCAPTCHA nie powiodła się.");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, email, recaptchaToken }),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setFormSubmitted(true);
        setFormError(null);
        setEmail("");
        setName("");
        setMessage("");
        recaptchaRef.current.reset();
      } else {
        const errorData = await response.json();
        setFormError(`Błąd: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setFormError("Wystąpił nieoczekiwany błąd.");
    }
  };

  return (
    <>
      <Nav />
      {!formSubmitted ? (
        <section className="px-6 xl:px-32">
          <h1 className="text-4xl xl:text-5xl text-[#4A4AFF] 2xl:text-6xl text-center font-semibold my-10 2xl:my-24">
            Kontakt
          </h1>
          {formError && (
            <p className="text-red-500 mb-6 text-center">{formError}</p>
          )}
          <div className="xl:grid xl:grid-cols-2 text-black">
            <form onSubmit={sendMail} className="">
              {/* input div */}
              <div className="grid gap-6">
                <div>
                  <label className="text-lg text-white" htmlFor="name">
                    Twoje Imię:
                  </label>
                  <input
                    className={`border rounded-md p-2 mt-4 w-full ${
                      errorFields.includes("name")
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg text-white" htmlFor="name">
                    Twój adres e-mail
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`border rounded-md p-2 mt-4 w-full ${
                      errorFields.includes("name")
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <label className="text-lg text-white" htmlFor="name">
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Potrzebuję logo..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`border rounded-md p-2 mt-4 w-full ${
                      errorFields.includes("name")
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>
              <ReCAPTCHA
                className="mt-4"
                ref={recaptchaRef}
                sitekey="6LetqpUqAAAAABRwX_slcBybtlkC7S4X4QZZEYUo"
              />
              <div className="flex justify-center xl:justify-start mb-16 xl:mb-32 mt-6">
                <button
                  className="px-6 py-3 text-xl font-medium text-white  bg-[#4A4AFF] 
                   rounded-xl shadow-md transition-all duration-300 ease-in-out transform 
                   hover:-translate-y-1 hover:shadow-lg"
                  type="submit"
                >
                  Wyślij
                </button>
              </div>
            </form>
            {/* Other ways of contact */}
            <div className="mb-24 flex flex-col gap-6 items-center ">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <FaPhone className="text-2xl" />
                </div>
                <p className="text-xl">531771378</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <MdEmail className="text-2xl" />
                </div>
                <p className="text-xl">jatryk.designer@gmail.com</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center my-10">
          <h4>Dziękujemy za wiadomość!</h4>
          <p>Nasz zespół skontaktuje się z Tobą najszybciej, jak to możliwe!</p>
        </div>
      )}
      <Footer />
    </>
  );
}
