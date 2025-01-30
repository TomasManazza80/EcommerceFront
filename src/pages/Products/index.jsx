import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart";
import { Outlet } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [category, setCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const API_URL = 'https://ecommerceback-server.onrender.com';

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      const sortedData = data.sort(compareName);
      setProduct(sortedData);
      setFilterArray(sortedData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredArr = product;
    if (search !== "") {
      filteredArr = product.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (min !== "") {
      filteredArr = filteredArr.filter((item) => item.precio >= min);
    }
    if (max !== "") {
      filteredArr = filteredArr.filter((item) => item.precio <= max);
    }
    if (category !== "") {
      filteredArr = filteredArr.filter((item) => item.categoria === category);
    }
    setFilterArray(filteredArr);
  }, [search, min, max, category]);

  function compareName(a, b) {
    const name1 = a.nombre.toUpperCase();
    const name2 = b.nombre.toUpperCase();
    return name1 > name2 ? 1 : name1 < name2 ? -1 : 0;
  }

  return (
    <>
      <Outlet />
      <div className="min-h-screen flex flex-col items-center py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">Nuestros Productos</h1>
        </div>
        <div className="flex flex-col items-center mb-6 w-full px-6 md:w-auto">
          <input
            type="search"
            className="outline-none w-full md:w-80 p-3 m-3 border border-gray-300 rounded shadow-sm"
            placeholder="Buscar productos..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="flex flex-col md:flex-row w-full md:w-auto space-y-3 md:space-y-0 md:space-x-3">
            <input
              type="number"
              placeholder="Precio Mínimo"
              className="outline-none w-full md:w-36 p-3 m-3 border border-gray-300 rounded shadow-sm"
              onChange={(e) => setMin(e.target.value)}
              value={min}
            />
            <input
              type="number"
              placeholder="Precio Máximo"
              className="outline-none w-full md:w-36 p-3 m-3 border border-gray-300 rounded shadow-sm"
              onChange={(e) => setMax(e.target.value)}
              value={max}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mb-6 w-full px-6 md:w-auto">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="py-2 px-6 rounded bg-indigo-500 text-white transition duration-200 hover:bg-indigo-600"
          >
            Categorías
          </button>
          {showCategories && (
            <div className="flex flex-wrap justify-center mt-4 space-y-3 md:space-y-0 md:space-x-3 w-full px-6 md:w-auto">
              {['', 'remeras', 'pantalones', 'abrigos', 'calzados', 'ropa interior', 'camisas'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setShowCategories(false);
                  }}
                  className={`py-2 px-6 rounded ${category === cat ? "bg-indigo-700" : "bg-indigo-500"} text-white transition duration-200 hover:bg-indigo-600`}
                  style={{ width: cat === '' ? '8rem' : '10rem' }}
                >
                  {cat === '' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center w-full px-6 md:w-auto">
          {filterArray.length === 0 ? (
            <div className="m-4 p-4">
              <h1>Cargando...</h1>
            </div>
          ) : (
            filterArray.map((item, index) => (
              <ProductCart
                key={index}
                id={item.ProductId}
                name={item.nombre}
                price={item.precio}
                image={item.imagenes[0]}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              >
                <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                  <img src={item.imagenes[0]} alt={item.nombre} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{item.nombre}</h2>
                    <p className="mt-2">${item.precio}</p>
                  </div>
                </div>
              </ProductCart>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
