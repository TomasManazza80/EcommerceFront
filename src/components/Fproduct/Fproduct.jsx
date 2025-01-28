import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const API_URL = 'https://ecommerceback-server.onrender.com';



const Fproduct = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="container text-center p-20 ease-in-out m-4">
      <h1 className="text-center text-4xl">Nuestros Productos</h1>
      <div className="flex justify-center flex-wrap items-center p-8">
        {data.length === 0 ? (
          <div className="m-4 p-4">
            <h1 className="f">Loading...</h1>
          </div>
        ) : (
          data.map((item, index) => (
            <div className="backdrop-blur-sm bg-white/30 p-4 m-4" key={index}>
              <div>
                <img src={item.imagenes} alt="" width="150" className="" />
              </div>
              <div>
                <h1 className="text-center text-black">
                  {item.nombre ? item.nombre.slice(0, 10) : 'Sin Nombre'}
                </h1>
                <h1 className="text-center text-blue-500">{item.price}</h1>
                <h1 className="text-center font-bold text-blue-500">10% Off</h1>
              </div>
            </div>
          ))
        )}
      </div>
      <NavLink
        to="/products"
        className="p-2 bg-black text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 duration-300"
      >
        Ver Todos los Productos
      </NavLink>
    </div>
  );
};

export default Fproduct;
