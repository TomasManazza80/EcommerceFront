import React from "react";
import { NavLink } from "react-router-dom";

function ContactUs() {
  return (
    <div className="mt-20 w-60 m-auto items-center text-center ">
      <br />
      <h1 className="text-4xl text-center">Contacto</h1>
      <p className="p-4">Email: abs@gmail.com</p>
      <p className="p-4">Cell: +54 123 456 789</p>

      <NavLink to="/" className="p-1 border">
        Go Back
      </NavLink>
    </div>
  );
}

export default ContactUs;
