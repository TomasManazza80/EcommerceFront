import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Remove, Update } from "../../store/redux/cart/CartAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import axios from "axios";

const API_URL = 'http://localhost:3000';


function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [updatedCart, setUpdatedCart] = useState([]);

  useEffect(() => {
    setUpdatedCart(cart);
  }, [cart]);

  const createPayment = async () => {
    try {
      const totalAmount = updatedCart.reduce((a, c) => a + c.price * c.quantity, 0);

      await Promise.all(
        updatedCart.map(async (item) => {
          console.log("etse es mi item @@@@@@@@@@@@@@@@@@",item.id);
          await axios.post(`http://localhost:3000/boughtProduct/boughtProduct`, {
            nombre: item.title,
            precio: item.price,
            cantidad: item.quantity,
            marca: item.id || 'Marca Desconocida',
            categoria: item.category || 'Categoría Desconocida',
            talle: item.size || 'Talle Único',


          });
        })
      );

      // Almacenar los productos del carrito en la base de datos
      const response = await axios.post(`http://localhost:3000/payment/create_payment`, {
        product: {
          title: "Productos en el carrito",
          unit_price: totalAmount,
          quantity: 1,
        },
      });

      setError(""); // Limpiar el error si la solicitud es exitosa
      window.location.href = response.data.payment_url; // Redirigir al enlace de pago
    } catch (error) {
      console.error("Error al crear el pago:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isPaymentReady) {
      createPayment();
      setIsPaymentReady(false); // Reiniciar el estado
    }
  }, [isPaymentReady]);

  const handleCheckout = () => {
    setIsPaymentReady(true);
  };

  const INCQuantityHandler = ({ id, quantity, price }) => {
    const newQuantity = quantity + 1;
    const item = { id, quantity: newQuantity, price };
    dispatch(Update(item));
  };

  const DECQuantityHandler = ({ id, quantity, price }) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const item = { id, quantity: newQuantity, price };
      dispatch(Update(item));

      

    } else {
      dispatch(Remove(id));
    }
  };

  const total = cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const TotalPrice = total.toFixed(2);

  return (
    <div className="bg-gradient-to-r from-slate-400 to-slate-200 mt-14 text-center p-4 min-h-screen">
      <h1 className="font-bold text-2xl p-20 text-center">Shopping Cart</h1>
      <div className="rounded-2xl backdrop-blur-sm bg-white/30 w-10/12 m-auto">
        <div className="flex justify-around items-center p-4">
          <div className="p-4">
            {cart.length === 0 ? (
              <h1 className="text-center">0 Product in cart</h1>
            ) : (
              cart.map((item, index) => (
                <div
                  className="flex m-4 justify-between items-center max-sm:flex-col"
                  key={index}
                >
                  <div className="overflow-hidden mix-blend-multiply flex justify-center">
                    <img
                      src={item.image}
                      alt=""
                      width="100"
                      className="object-contain"
                    />
                  </div>
                  <div className="font-bold p-2 text-center">
                    <h4>
                      Name:{" "}
                      <span className="text-blue-600">
                        {item.title?.slice(0, 10)}
                      </span>
                    </h4>
                    <h4>
                      Price:{" "}
                      <span className="text-blue-600">{`${item.total.toFixed(
                        2
                      )}$`}</span>
                    </h4>
                    <h4>
                      Quantity:{" "}
                      <span className="text-blue-600">{item.quantity}</span>
                    </h4>
                    <div>
                      <FontAwesomeIcon
                        icon={faSquareMinus}
                        className="cursor-pointer text-2xl"
                        onClick={() =>
                          DECQuantityHandler({
                            id: item.id,
                            quantity: item.quantity,
                            price: item.price,
                          })
                        }
                      />
                      <FontAwesomeIcon
                        icon={faSquarePlus}
                        className="cursor-pointer text-2xl"
                        onClick={() =>
                          INCQuantityHandler({
                            id: item.id,
                            quantity: item.quantity,
                            price: item.price,
                          })
                        }
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="tracking-widest text-red-600 bg-black-500 font-bold hover:text-red-500"
                        onClick={() => dispatch(Remove(item.id))}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center p-4">
            <h1 className="font-bold text-3xl">Total a pagar</h1>
            <h1 className="p-2">{`${TotalPrice}$`}</h1>
            {cart.length > 0 && (
              <button
                onClick={handleCheckout}
                className="p-2 bg-black text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 duration-300"
              >
                Pagar
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="m-20 text-center">
        {cart.length !== 0 && (
          <NavLink
            to="/products"
            className="p-2 bg-black text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 duration-300"
          >
            Agregar productos
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Cart;
