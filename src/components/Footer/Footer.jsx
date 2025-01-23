import React from "react";
import logo from "../../images/logoBlanco.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTelegram,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import gif from "../../images/img9.jpeg";

function Footer() {
  return (
    <>
      <div className="mt-10 h-50" style={{ backgroundImage: `url(${gif})` }}>
        <div className="container m-auto flex justify-between text-white items-center">
          <div className="p-4 basis-80">
            <img src={logo} alt="" className="duration-300 ease-in-out cursor-pointer" />
            <div className="p-4 flex space-x-4">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-2xl text-white hover:text-gray-200 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faTelegram}
                className="text-2xl text-white hover:text-gray-200 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-2xl text-white hover:text-gray-200 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-2xl text-white hover:text-gray-200 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-col p-2">
            <h1 className="font-extralight text-white p-2">¡Suscribete ahora!</h1>
            <input
              className="border-2 border-gray-400 rounded-lg p-1 m-1 outline-none text-black font-semibold"
              placeholder="Enter Email!"
            />
            <button className="bg-blue-500 rounded-lg text-white p-2 m-1 hover:bg-red-500 delay-150 hover:rotate-12">
              Subscribe
            </button>
            <div>
              <p>Subscribete y recibe nuestras las últimas</p>
              <p>noticias y promociones</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
