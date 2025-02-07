import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Remove, Update } from "../../store/redux/cart/CartAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import emailjs from '@emailjs/browser';

const API_URL = 'https://ecommerceback-haed.onrender.com';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [updatedCart, setUpdatedCart] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [address, setAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setUpdatedCart(cart);
  }, [cart]);

  const createPayment = async () => {
    try {
      const totalAmount = updatedCart.reduce((a, c) => a + c.price * c.quantity, 0);

      await Promise.all(
        updatedCart.map(async (item) => {
          let id_compra = 0;
          await axios.post(`https://ecommerceback-server.onrender.com/boughtProduct/boughtProduct`, {
            nombre: item.title,
            precio: item.price,
            cantidad: item.quantity,
            marca: item.id || 'Marca Desconocida',
            categoria: id_compra || 'Categoría Desconocida',
            talle: item.size,
          });
          id_compra++;
        })
      );

      const response = await axios.post(`https://ecommerceback-server.onrender.com/payment/create_payment`, {
        product: {
          title: "Productos en el carrito",
          unit_price: totalAmount,
          quantity: 1,
        },
      });

      setError("");
    enviarEmail();
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error("Error al crear el pago:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isPaymentReady) {
      createPayment();
      setIsPaymentReady(false);
    }
  }, [isPaymentReady]);

  const enviarEmail = () => {
    const templateParams = {
      user_email: email,
      user_cellphone: cellphone,
      user_address: address,
      message: `Productos en el carrito:\n${updatedCart.map(item => `Nombre: ${item.title}, Precio: ${item.price}, Cantidad: ${item.quantity}`).join('\n')}\n Esta es la información del usuario: \nCelular: ${cellphone}, Direccion: ${address}, Mensaje: ${message}`,
    };

    emailjs.send('service_nmujodf', 'template_3eofazh', templateParams, "K7qLi6I9SCwVn1oPA")
      .then((res) => {
        alert("Correo enviado correctamente.");
        console.log(res);
      }).catch((error) => {
        console.error("Error al enviar el correo:", error);
      });
  };

  const handleCheckout = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
            <h1 className="p-2">{`$${TotalPrice}`}</h1>
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
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
              <h1>INGRESAR DATOS PARA REALIZAR PAGO</h1>
              <br />
              <label className="flex flex-col ">
                Celular:
                <input type="tel"  name="user_cellphone" value={cellphone} onChange={(e) => setCellphone(e.target.value)} required className="p-2 border rounded" />
              </label>
              <label className="flex flex-col">
                Dirección y Ciudad:
                <input type="text" name="user_address" value={address} onChange={(e) => setAddress(e.target.value)} required className="p-2 border rounded" />
              </label>
              <label className="flex flex-col">
                Mensaje:
                <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} required className="p-2 border rounded"></textarea>
              </label>
              <button type="submit" className="p-2 bg-black text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 duration-300 rounded">Enviar Email y Pagar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
