"use client";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header>
        <nav className="px-6 lg:px-20 xl:px-32 py-10 flex justify-between items-center bg-transparent">
          {/* Logo */}
          <div className="z-50 relative">
            <Link href={"/"} onClick={closeMenu}>
              <motion.div
                whileHover={{ scale: 1.05 }} // Delikatne powiększenie
                transition={{ duration: 0.3 }} // Krótkie, płynne przejście
              >
                <Image
                  src={"/logo2.png"}
                  width={150}
                  height={150}
                  alt="Logo grafika Jatryk"
                  className={`${!menuOpen && "invert"}`}
                />
              </motion.div>
            </Link>
          </div>

          {/* Hamburger Menu for Mobile phones */}
          <div
            className={`lg:hidden z-50 relative ${
              menuOpen ? "text-black" : "text-white"
            }`}
          >
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={menuOpen}
              className="text-3xl"
            >
              {menuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:block xl:text-xl 2xl:text-2xl">
            <ul className="flex gap-10 ">
              <li className="hover:text-[#EFB036] transition-colors duration-300">
                <Link href={"/"}>Strona Główna</Link>
              </li>
              <li className="hover:text-[#EFB036] transition-colors duration-300">
                <Link href={"#portfolio"}>Portfolio</Link>
              </li>
              <li className="hover:text-[#EFB036] transition-colors duration-300">
                <Link href={"/kontakt"}>Kontakt</Link>
              </li>
              <li className="hover:text-[#EFB036] transition-colors duration-300">
                <Link href={"/o-mnie"}>O Mnie</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-screen bg-white z-40"
            >
              <ul className="flex flex-col items-center gap-8 mt-[12rem] text-2xl text-black">
                <li>
                  <Link href={"/"} onClick={closeMenu}>
                    Strona Główna
                  </Link>
                </li>
                <li>
                  <Link href={"#portfolio"} onClick={closeMenu}>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href={"/kontakt"} onClick={closeMenu}>
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href={"/o-mnie"} onClick={closeMenu}>
                    O Mnie
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
