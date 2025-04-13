import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart";
import { Outlet } from "react-router-dom";

const ProductsHome = () => {
    const [product, setProduct] = useState([]);
    const [filterArray, setFilterArray] = useState([]);
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
        if (category !== "") {
            filteredArr = filteredArr.filter((item) => item.categoria === category);
        }
        setFilterArray(filteredArr);
    }, [category]);

    function compareName(a, b) {
        const name1 = a.nombre.toUpperCase();
        const name2 = b.nombre.toUpperCase();
        return name1 > name2 ? 1 : name1 < name2 ? -1 : 0;
    }

    const uniqueProductsByCategory = filterArray.reduce((acc, current) => {
        if (!acc.find((item) => item.categoria === current.categoria)) {
            acc.push(current);
        }
        return acc;
    }, []);

    return (
        <>
            <Outlet />
            <br />
            <br />
            <br />
            <div className="min-h-screen flex flex-col items-center py-6 px-4"> {/* Ajuste del padding */}
                <div className="text-center mb-6"> {/* Ajuste del margen */}
                    <h1 className="text-3xl font-extrabold">Nuestros Productos</h1> {/* Ajuste del tamaño del texto */}
                </div>
                <div className="flex flex-col items-center mb-4 w-full"> {/* Ajuste del margen */}
                    <button
                        onClick={() => setShowCategories(!showCategories)}
                        className="py-2 px-4 rounded bg-indigo-500 text-white transition duration-200 hover:bg-indigo-600"
                    >
                        Categorías
                    </button>
                    {showCategories && (
                        <div className="flex flex-wrap justify-center mt-2 space-y-2 w-full"> {/* Ajuste del margen y espacio */}
                            {['', 'remeras', 'pantalones', 'abrigos', 'calzados', 'ropa interior', 'camisas'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setCategory(cat);
                                        setShowCategories(false);
                                    }}
                                    className={`py-2 px-4 rounded m-1 ${category === cat ? "bg-indigo-700" : "bg-indigo-500"} text-white transition duration-200 hover:bg-indigo-600`}
                                >
                                    {cat === '' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap justify-center w-full">
                    {uniqueProductsByCategory.length === 0 ? (
                        <div className="m-4 p-4">
                            <h1>Cargando...</h1>
                        </div>
                    ) : (
                        uniqueProductsByCategory.map((item, index) => (
                            <ProductCart
                                key={index}
                                id={item.ProductId}
                                name={item.nombre}
                                price={item.precio}
                                image={item.imagenes[0]}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" // Ajuste del padding
                            >
                                <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                                    <img src={item.imagenes[0]} alt={item.nombre} className="w-full h-48 object-cover" /> {/* Ajuste de la altura de la imagen */}
                                    <div className="p-2"> {/* Ajuste del padding */}
                                        <h2 className="text-lg font-bold">{item.nombre}</h2>
                                        <p className="mt-1">${item.precio}</p> {/* Ajuste del margen */}
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

export default ProductsHome;