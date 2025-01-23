import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logoniam.png";
import authContext from "../../store/store";
import { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function index() {
  const [toggle, setToggle] = useState(false);
  const authCtx = useContext(authContext);
  const [Role, setRole] = useState(null);
 
  const cartLenght = useSelector((state) => state.cart.length);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    authCtx.setToken(null);
    alert("Sign-out successful.");
  };

  async function isAdmin(email) {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`http://localhost:3000/users/role/${email}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const userRole = response.data.role;
        return userRole === 'admin';
      } catch (error) {
        console.error(`Error retrieving user role: ${error}`);
        return false;
      }
    }
    console.error('Token not found!!!!!!!!!!!!!!!!');
    return false;
  }
  

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  { authCtx.role === true ? (
    <NavLink to="/admin" className="text-black  p-3 m-2 font-bold">
      Admin DashBoard
    </NavLink>
  ) : null}
  
  const getToken = async () => {
    const token = localStorage.getItem("token");
    authCtx.setToken(token);
    const contenido = jwtDecode(token);
    const role = await isAdmin(contenido.email);
    contenido.role = role;
    console.log("ESTE ES EL role<<<<<<<<<", role);
    console.log("ESTE ES EL CONTENIDO!!!!!!!!!", contenido);
    setRole(contenido.role);
    return contenido.role;
  };
  useEffect(() => {
    getToken();
  }, []);
  
  return (
    <>
      <div className=" ">
        <div className=" container m-auto flex fixed top-0 right-0 left-0 p-2 max-lg:flex justify-between items-center backdrop-blur-sm bg-white/30 z-10  shadow-sm ">
          <div>
            <img src={logo} alt="logo" className="h-20" />
          </div>
          <div className=" max-lg:hidden">
            <NavLink to="/" className="text-black  p-3 m-2 font-bold">
              Inicio
            </NavLink>
            <NavLink to="/products" className="text-black  p-3 m-2 font-bold">
              Productos
            </NavLink>
            <NavLink to="/about" className="text-black   p-3 m-2 font-bold">
              Información
            </NavLink>
            <NavLink to="/contact" className="text-black   p-3 m-2 font-bold">
              Contacto
            </NavLink>
            { Role == true ? (
              <NavLink to="/admin" className="text-black p-3 m-2 font-bold">
                Panel de Administración
              </NavLink>
            ) : null}

          </div>
          <div className="text-black max-lg:hidden">
            <NavLink to="/cart" className="p-2 m-2 ">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="p-1 rounded-full">{cartLenght}</span>
            </NavLink>

            {authCtx.token ? (
              <button
                onClick={signOutHandler}
                className="p-1 m-1 bg-black text-white"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="p-2 m-2 bg-black text-white">
                Login
              </NavLink>
            )}
          </div>
          {toggle ? (
            <>
              <div className=" bg-white flex flex-col lg:hidden ">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-black cursor-pointer lg:hidden"
                  onClick={toggleHandler}
                />
                <NavLink to="/" className="text-black  p-3 m-2 font-bold">
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className="text-black  p-3 m-2 font-bold"
                >
                  Products
                </NavLink>
                <NavLink to="/about" className="text-black   p-3 m-2 font-bold">
                  About
                </NavLink>
                <NavLink to="/contact" className="text-black   p-3 m-2 font-bold">
                  Contact
                </NavLink>
                <NavLink to="/cart" className="p-2 m-2 ">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <span className="p-1 rounded-full">{cartLenght}</span>
                </NavLink>
                {authCtx.token ? (
                  <button
                    onClick={signOutHandler}
                    className="p-2 m-2 bg-black text-white"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="p-2 m-2 bg-black text-white text-center"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </>
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="text-black cursor-pointer lg:hidden"
              onClick={toggleHandler}
            />
          )}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default index;
