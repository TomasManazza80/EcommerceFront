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
      <Outlet />
      <div className="bg-slate-300 h-full flex flex-col justify-center items-center mt-12 min-h-screen">
        <div className="flex items-center justify-center">
          {/* <img src={shopBanner} alt="" className="rounded-3xl p-4"/> */}
        </div>
        <div className="h-20 flex items-center text-3xl justify-center flex-col">
          <h1>Productos</h1>
        </div>
        
        <div className="flex flex-col">
          <input
            type="search"
            className="outline-none w-80 p-2 m-2"
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div>
            <input
              type="number"
              placeholder="MIN"
              className="outline-none w-36 p-2 m-2"
              onChange={(e) => setMin(e.target.value)}
              value={min}
            />
            <input
              type="number"
              placeholder="MAX"
              className="outline-none w-40 p-2 m-2"
              onChange={(e) => setMax(e.target.value)}
              value={max}
            />
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={() => setCategory("")} className="bg-blue-500 text-white py-2 px-4 rounded">Todos</button>
          <button onClick={() => setCategory("remeras")} className="bg-blue-500 text-white py-2 px-4 rounded">Remeras</button>
          <button onClick={() => setCategory("pantalones")} className="bg-blue-500 text-white py-2 px-4 rounded">Pantalones</button>
          <button onClick={() => setCategory("abrigos")} className="bg-blue-500 text-white py-2 px-4 rounded">Abrigos</button>
          <button onClick={() => setCategory("calzados")} className="bg-blue-500 text-white py-2 px-4 rounded">Calzados</button>
          <button onClick={() => setCategory("ropa interior")} className="bg-blue-500 text-white py-2 px-4 rounded">Ropa Interior</button>
          <button onClick={() => setCategory("camisas")} className="bg-blue-500 text-white py-2 px-4 rounded">Camisas</button>
          <button onClick={() => setCategory("accesorios")} className="bg-blue-500 text-white py-2 px-4 rounded">Accesorios</button>
        </div>
        
        <div className="flex flex-wrap justify-center mt-4">
          {FilterArray.length === 0 ? (
            <div className="m-4 p-4">
              <h1 className="text-black">Loading...</h1>
            </div>
          ) : (
            FilterArray.map((item, index) => (
              <ProductCart
                key={index}
                id={item.ProductId}
                name={item.nombre}
                price={item.precio}
                image={item.imagenes[0]} // Assuming `imagenes` is an array and we're using the first image
              />
            ))
          )}
        </div>
        {/* <button
          className="bg-slate-500 text-white py-2 px-5 rounded-3xl m-5 w-40 backdrop-blur-xl hover:bg-slate-300 transition ease-in-out delay-150"
          onClick={() => setLoadMore(!LoadMore)}
        >
          {LoadMore ? "Show Less" : "Load More"}
        </button> */}
      </div>
    </>
  );
};

export default Products;
