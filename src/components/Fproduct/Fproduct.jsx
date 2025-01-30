import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const API_URL = 'https://ecommerceback-server.onrender.com';
const Fproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className='text-4xl text-center '>Productos</h1>
      <br />
      <br />
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {products.map((product, index) => (
          <div key={index} className="carousel-item text-center">
            <div className="bg-white w-48 h-48 flex items-center justify-center mx-auto">
              <img src={product.imagenes} alt="" className="object-contain w-full h-full" />
            </div>
            <div className="mt-4">
              <h1 className="text-center text-black text-xl">
                {product.nombre ? product.nombre.slice(0, 20) : 'Sin Nombre'}
              </h1>
              <h1 className="text-center text-blue-500 text-3xl">{product.price}</h1>
              <h1 className="text-center font-bold text-blue-500 text-xl">10% Off</h1>
              <br />
              <br />
            </div>
          </div>
        ))}
      </Carousel>
      
    </div>
  );
};

export default Fproduct;
