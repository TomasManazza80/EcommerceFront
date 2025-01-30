import BuySteps from "../../components/BuyStepsCard/BuySteps.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Fproduct from "../../components/Fproduct/Fproduct.jsx";
import Hero from "../../components/Hero/Hero.jsx";





const HOME = () => {
  return (
    <>
      <div className="scroll-smooth focus:scroll-auto"> 
        <br />
        <Hero />
        <br />
        <br />
        <br />
        <br />
    
        <Fproduct />
        <br />
        <br />
        <button 
  onClick={() => window.location.href = '/products'}
  className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Ver Todos los Productos
</button>

        <br />
        <br />
        <br />
        <br />  <br />
        <br />
        <br />
        <br />
        <BuySteps />
        <br />
<br />
<br />
        <Footer />

      </div>
    </>
  );
};

export default HOME;
