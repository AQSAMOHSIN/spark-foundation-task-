import React from "react";
import phoneImg from "./images/phone.svg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-center">
        <article className="hero-info">
          <h1>
            Basic Banking
            <br /> System @Gripapr2021
          </h1>
          <p>
            simple dynamic website which shows the customer record from the
            database you can make money transfer from one customer to another
            customer and tract the trasaction records
          </p>
          <button className="btn">Start now</button>
        </article>
        <article className="hero-images">
          <img src={phoneImg} className="phone-img" alt="phone" />
        </article>
      </div>
    </section>
  );
};

export default Hero;
