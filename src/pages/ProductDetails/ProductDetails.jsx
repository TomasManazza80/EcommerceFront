import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Add } from "../../store/redux/cart/CartAction";
import Swal from "sweetalert2";


function ProductDetails() {
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = {
    id: data.ProductId,
    title: data.nombre,
    price: data.precio,
    image: data.imagenes ? data.imagenes[0] : "", // Verificación adicional
    quantity: quantity,
    total: data.precio * quantity,
  };

  const cartSelecter = useSelector((state) => state);
  console.log(cartSelecter);

  const fetch = async () => {
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    console.log(res.data);
    setData(res.data);
  };

  const inc = () => {
    if (quantity < data.cantidad) {
      setQuantity(quantity + 1);
    } else {
      alert("No puedes agregar más del stock disponible");
    }
  };
  const dec = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const AddToCartHandeler = () => {
    if (quantity === 0) {
      console.log("producto agregado al carrito");
      
      return;
    } else {
      if (cartSelecter.cart.find((item) => item.id === data.ProductId)) {
        



        
        return;
      } else {
        dispatch(Add(item));
        Swal.fire({
          title: "Agregado al carrito",
          icon: "success",
          draggable: true
        });
        console.log("added to cart successfully, go to cart to checkout");
        return;
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="w-full mt-12 bg-slate-100 p-4">
      <div className="flex justify-between m-6 p-8 rounded-2xl">
        <div className="p-4 rounded-2xl backdrop-blur-sm bg-white/30">
          {data.imagenes && data.imagenes[0] && (
            <img
              src={data.imagenes[0]} // Verificación adicional
              alt=""
              width="400px"
              height="200px"
              className="overflow-hidden mix-blend-multiply"
            />
          )}
        </div>
        <div className="p-20 w-3/4 justify-center text-center">
          <h1 className="font-extrabold text-3xl">{data.nombre?.slice(0, 20)}</h1>
          <h2 className="text-2xl font-semibold">{data.marca?.slice(0, 20)}</h2>
          <h3 className="text-xl font-medium">Talle: {data.talle?.slice(0, 20)}</h3>
          <div className="mt-8">
            <div className="">
              <h1 className="text-2xl">Cantidad</h1>
              <FontAwesomeIcon
                icon={faSquareMinus}
                className="cursor-pointer text-2xl"
                onClick={dec}
              />
              <input
                type="number"
                className="outline-none p-2 m-2 w-10 text-center font-bold"
                disabled
                value={quantity}
              />
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="cursor-pointer text-2xl"
                onClick={inc}
              />
            </div>
            <p className="text-sm text-gray-500">Stock disponible: {data.cantidad}</p>
          </div>
          <div>
            <button
              className="bg-slate-500 ease-in rounded-2xl p-4 hover:bg-slate-300 hover:text-black mt-8"
              onClick={AddToCartHandeler}
            >
              agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProductDetails;
