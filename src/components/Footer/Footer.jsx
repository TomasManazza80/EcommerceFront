import React from "react";
import logo from "../../images/logoBlanco.png";
import gif from "../../images/img9.jpeg";

function Footer() {
  return (
    <footer
      style={{
        backgroundImage: `url(${gif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="py-8 text-white"
    >
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 space-y-6">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-32"
            style={{ margin: "0 auto",height: "auto",  width: "300px" }}
          />
        </div>
        <div className="flex justify-center space-x-4 md:space-x-6 text-lg sm:text-xl md:text-2xl flex-wrap">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://telegram.org" aria-label="Telegram" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition duration-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="text-sm sm:text-base md:text-lg lg:text-x text-center">
          © {new Date().getFullYear()} Tomas Manazza. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
