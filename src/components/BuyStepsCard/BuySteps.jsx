import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import gif from "../../images/fondo.gif";

function BuySteps() {
  return (
    <>
      <div className="w-10/12 container m-auto text-white pb-6 bg-gradient-to-r from-blue-900 to-blue-400 rounded-3xl" style={{ backgroundImage: `url(${gif})`  }}>
        <div className="p-4 pt-12 text-center ">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-2xl m-2 text-black"
          />
          <h1 className="text-2xl   font-medium">Pasos de compra</h1>
        </div>
        <p className=" p-3 text-center text-2xl font-medium">
          Sigue los siguientes pasos para realizar tu compra
        </p>
        <div className=" flex justify-between text-center m-20">
          <div className="w-60">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-2xl m-2 text-white animate-bounce cursor-pointer"
            />
            <h1 className="text-2xl  font-medium">1)  Busca y seleccionatu producto</h1>
            <p className="  text-white  font-medium p-3">
              Choose your product and click on the buy now button
            </p>
          </div>
          <div className="w-60">
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl m-2 text-white animate-bounce cursor-pointer"
            />
            <h1 className="text-2xl  font-medium">2) selecciona la cantidad dá click en el boton comprar </h1>
            <p className="   text-white  font-medium p-3">
            
            </p>
          </div>
          <div className="w-60">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-2xl m-2 text-white animate-bounce cursor-pointer "
            />
            <h1 className="text-2xl   font-medium">3) Acredita el pago</h1>
            <p className="   text-white   font-medium p-3">
              utilizar tarjeta de credito o debito
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuySteps;
