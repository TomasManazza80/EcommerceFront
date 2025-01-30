import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import gif from "../../images/fondo.gif";

function BuySteps() {
  return (
    <div
      className="w-10/12 container mx-auto text-white pb-6 bg-cover bg-center rounded-3xl"
      style={{ backgroundImage: `url(${gif})` }}
    >
      <div className="py-12 text-center">
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="text-5xl mb-4 text-black"
        />
        <h1 className="text-4xl font-medium">Pasos de compra</h1>
      </div>
      <p className="text-2xl font-medium text-center">
        Sigue los siguientes pasos para realizar tu compra
      </p>
      <div className="flex flex-col lg:flex-row justify-around text-center mt-10">
        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-4xl mb-4 text-white"
          />
          <h1 className="text-2xl font-medium">1) Busca y selecciona tu producto</h1>
          <p className="mt-3 text-lg">
            Elige tu producto y haz clic en el botón de comprar ahora
          </p>
        </div>
        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <FontAwesomeIcon
            icon={faUser}
            className="text-4xl mb-4 text-white"
          />
          <h1 className="text-2xl font-medium">2) Selecciona la cantidad y dale click en el botón comprar</h1>
        </div>
        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-4xl mb-4 text-white"
          />
          <h1 className="text-2xl font-medium">3) Acredita el pago</h1>
          <p className="mt-3 text-lg">
            Utiliza tarjeta de crédito o débito
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuySteps;
