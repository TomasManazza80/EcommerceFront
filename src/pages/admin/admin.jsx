import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const Admin = () => {
  const [productosVendidos, setProductosVendidos] = useState([
    { id: 1, nombre: 'Producto 1', fecha: '2024-12-01', cantidad: 10 },
    { id: 2, nombre: 'Producto 2', fecha: '2024-12-02', cantidad: 5 },
    { id: 3, nombre: 'Producto 3', fecha: '2024-12-03', cantidad: 8 },
    // Más datos de ejemplo...
  ]);

  const [todosMisProductos, setTodosMisProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: 0, marca: '', categoria: '', cantidad: 0, talle: '', imagenes: [] });
  const [recaudado, setRecaudado] = useState(0); // Ejemplo inicial de recaudado
  const [seccionActiva, setSeccionActiva] = useState('productos');

  const categorias = [
    "remeras",
    "pantalones",
    "abrigos",
    "calzados",
    "ropa interior",
    "camisas",
    "accesorios"
  ];

  const cloudinary = new Cloudinary({ cloud: { cloudName: 'dxvkqumpu' } });

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setTodosMisProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const uploadPromises = files.map(file => uploadImageToCloudinary(file));

    Promise.all(uploadPromises).then(urls => {
      setNuevoProducto({ ...nuevoProducto, imagenes: urls });
    });
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ecommerce'); // Reemplaza 'your_upload_preset' con tu preset de subida de Cloudinary

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dxvkqumpu/image/upload', formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
      return null;
    }
  };

  const handleAgregarProducto = async () => {
    const producto = { ...nuevoProducto };
    try {
      const response = await axios.post('http://localhost:3000/products', producto);
      setTodosMisProductos([...todosMisProductos, response.data]);
      setRecaudado(recaudado + parseFloat(nuevoProducto.precio) * parseFloat(nuevoProducto.cantidad));
      setNuevoProducto({ nombre: '', precio: 0, marca: '', categoria: '', cantidad: 0, talle: '', imagenes: [] });
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const handleEliminarProducto = async (ProductId, precio, cantidad) => {
    try {
      const response = await axios.delete(`http://localhost:3000/products/${ProductId}`);
      console.log("esta es la respuesta!!!!!!!! ", response.data);
      window.location.reload();
      
      const nuevosProductos = todosMisProductos.filter(producto => producto.id !== ProductId);
      setTodosMisProductos(nuevosProductos);
      setRecaudado(recaudado - (precio * cantidad));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleEliminarProductoVendido = (id) => {
    const nuevosProductosVendidos = productosVendidos.filter(producto => producto.id !== id);
    setProductosVendidos(nuevosProductosVendidos);
  };

  return (
    <div className="p-8">
      <br />
      <br />
      <br />
      <h1 className="text-3xl font-bold mb-8">Dashboard de Administrador</h1>

      <nav className="mb-8">
        <button
          className={`mr-4 px-4 py-2 rounded ${seccionActiva === 'productos' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setSeccionActiva('productos')}
        >
          Todos Mis Productos
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${seccionActiva === 'vendidos' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setSeccionActiva('vendidos')}
        >
          Productos Vendidos
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${seccionActiva === 'cargar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setSeccionActiva('cargar')}
        >
          Cargar Producto
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${seccionActiva === 'recaudado' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setSeccionActiva('recaudado')}
        >
          Total Recaudado
        </button>
      </nav>

      {seccionActiva === 'productos' && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Todos Mis Productos</h2>
          <ul className="bg-white shadow-md rounded-lg p-4">
            {todosMisProductos.map(producto => {
              // Crear la variable imgs
              const imgs = producto.imagenes && producto.imagenes.length > 0
                ? producto.imagenes
                : [];

              return (
                <li key={producto.id} className="border-b last:border-none py-2 flex justify-between items-center">
                  <span>{producto.nombre} - ${producto.precio} - {producto.marca} - {producto.categoria} - Cantidad: {producto.cantidad}</span>
                  {
                    imgs.length > 0 && (
                      <div>
                        <img src={imgs[0]} alt="" width="150" className=""/>
                      </div>
                    )
                  }
                  <button
                    onClick={() => handleEliminarProducto(producto.ProductId, producto.precio, producto.cantidad)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {seccionActiva === 'vendidos' && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Productos Vendidos</h2>
          <ul className="bg-white shadow-md rounded-lg p-4">
            {productosVendidos.map(producto => (
              <li key={producto.id} className="border-b last:border-none py-2 flex justify-between items-center">
                <span>{producto.nombre} - ${producto.precio}</span>
                <button
                  onClick={() => handleEliminarProductoVendido(producto.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {seccionActiva === 'cargar' && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cargar Producto</h2>
          <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
            <div>
              <label className="block font-medium mb-2">Nombre del producto</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                className="w-full p-2 border rounded"
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Precio del producto</label>
              <input
                type="number"
                name="precio"
                placeholder="Precio del producto"
                className="w-full p-2 border rounded"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Marca</label>
              <input
                type="text"
                name="marca"
                className="w-full p-2 border rounded"
                value={nuevoProducto.marca}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Categoría</label>
              <select
                name="categoria"
                className="w-full p-2 border rounded"
                value={nuevoProducto.categoria}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar Categoría</option>
                {categorias.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                className="w-full p-2 border rounded"
                value={nuevoProducto.cantidad}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Talle</label>
              <input
                type="text"
                name="talle"
                placeholder="Talle"
                className="w-full p-2 border rounded"
                value={nuevoProducto.talle}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Imagen del producto</label>
              <input
                type="file"
                name="imagenes"
                className="w-full p-2 border rounded"
                onChange={handleFileChange}
                multiple
              />
            </div>
            <button onClick={handleAgregarProducto} className="bg-blue-500 text-white px-4 py-2 rounded">
              Agregar Producto
            </button>
          </div>
        </section>
      )}

      {seccionActiva === 'recaudado' && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Total Recaudado</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-xl">${recaudado}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Admin;
