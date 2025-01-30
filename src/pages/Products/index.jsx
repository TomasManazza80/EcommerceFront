import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart";
import { Outlet } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [FilterArray, setFilterArray] = useState([]);
  const [LoadMore, setLoadMore] = useState(false);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [category, setCategory] = useState("");
  const API_URL = 'https://ecommerceback-server.onrender.com';

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      const sortedData = data.sort(compareName);
      setProduct(sortedData);
      setFilterArray(sortedData);
      console.log(sortedData);
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
      filteredArr = product.filter((item) => {
        return item.nombre.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (min !== "") {
      filteredArr = filteredArr.filter((item) => {
        return item.precio >= min;
      });
    }
    if (max !== "") {
      filteredArr = filteredArr.filter((item) => {
        return item.precio <= max;
      });
    }
    if (category !== "") {
      filteredArr = filteredArr.filter((item) => {
        return item.categoria === category;
      });
    }
    setFilterArray(filteredArr);
  }, [search, min, max, category]);

  function compareName(a, b) {
    const name1 = a.nombre.toUpperCase();
    const name2 = b.nombre.toUpperCase();

    let comparison = 0;

    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
  }

  return (
    <>
      <br />
      <br />
      <br />
      
      <Outlet />
      <div className="min-h-screen flex flex-col items-center py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold">Nuestros Productos</h1>
        </div>
        <div className="flex flex-col items-center mb-6">
          <input
            type="search"
            className="outline-none w-80 p-3 m-3 border border-gray-300 rounded shadow-sm"
            placeholder="Buscar productos..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="flex flex-col md:flex-row space-x-3">
            <input
              type="number"
              placeholder="Precio Mínimo"
              className="outline-none w-36 p-3 m-3 border border-gray-300 rounded shadow-sm"
              onChange={(e) => setMin(e.target.value)}
              value={min}
            />
            <input
              type="number"
              placeholder="Precio Máximo"
              className="outline-none w-36 p-3 m-3 border border-gray-300 rounded shadow-sm"
              onChange={(e) => setMax(e.target.value)}
              value={max}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-3 mb-6">
          {['', 'remeras', 'pantalones', 'abrigos', 'calzados', 'ropa interior', 'camisas', 'accesorios'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`py-2 px-6 rounded ${category === cat ? "bg-indigo-700" : "bg-indigo-500"} text-white transition duration-200 hover:bg-indigo-600`}
            >
              {cat === '' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center">
          {FilterArray.length === 0 ? (
            <div className="m-4 p-4">
              <h1>Cargando...</h1>
            </div>
          ) : (
            FilterArray.map((item, index) => (
              <ProductCart
                key={index}
                id={item.ProductId}
                name={item.nombre}
                price={item.precio}
                image={item.imagenes[0]}
                className="w-72 h-96 bg-white flex flex-col items-center justify-between p-6 m-4 rounded-lg shadow-md"
              >
                <div className="h-40 w-full flex items-center justify-center">
                  <img src={item.imagenes[0]} alt={item.nombre} className="object-contain h-32 w-32" /> 
                </div>
                <div className="mt-4 text-center min-h-[5rem]">
                  <h2 className="text-xl font-bold">{item.nombre}</h2>
                  <p>${item.precio}</p>
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
