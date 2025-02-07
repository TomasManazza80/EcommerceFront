import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Importa 'Link'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Add } from "../../store/redux/cart/CartAction";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

const API_URL = 'https://ecommerceback-server.onrender.com';

function ProductDetails() {
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null); // Nuevo estado
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = {
    id: data.ProductId,
    title: data.nombre,
    price: data.precio,
    image: data.imagenes ? data.imagenes[0] : "",
    quantity: quantity,
    total: data.precio * quantity,
  };

  const cartSelecter = useSelector((state) => state);
  console.log(cartSelecter);

  const fetch = async () => {
    const res = await axios.get(`${API_URL}/products/${id}`);
    console.log(res.data);
    setData(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    console.log(res.data);
    setProducts(res.data);
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

  const recargarPagina = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch();
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => product.categoria === data.categoria);

  return (
    <div className="w-full mt-12 bg-slate-100 p-4">
      <div className="flex flex-col md:flex-row justify-between m-6 p-8 rounded-2xl">
        <div className="p-4 rounded-2xl backdrop-blur-sm bg-white/30">
          {data.imagenes && data.imagenes[0] && (
            <img
              src={data.imagenes[0]}
              alt=""
              width="400px"
              height="200px"
              className="overflow-hidden mix-blend-multiply"
            />
          )}
        </div>
        <div className="p-4 md:p-20 w-full md:w-3/4 justify-center text-center">
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
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h1 className="text-3xl font-bold">TALLES Y COLORES</h1>
        <div className="flex flex-wrap justify-center mt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.ProductId}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 relative"
              onMouseEnter={() => setHoveredProductId(product.ProductId)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={{
                position: "relative",
                transition: "0.3s",
                ...(hoveredProductId === product.ProductId && { opacity: 0.7 }),
              }}
            >
              <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                <img src={product.imagenes[0]} alt={product.nombre} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{product.nombre}</h2>
                  <p className="text-lg font-medium">${product.precio}</p>
                </div>
                {hoveredProductId === product.ProductId && (
                  <button
                    className="absolute inset-0 m-auto bg-black text-white py-1 px-2 rounded" // Tamaño reducido
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      height: "100px",
                      width: "200px",
                    }}
                    onClick={() => {
                      navigate(`/product/${product.ProductId}`);
                      recargarPagina();
                    }}
                  >
                    Ver Producto
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
