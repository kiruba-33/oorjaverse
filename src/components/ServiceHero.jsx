import React from "react";
import heroImage from "../assets/home2.png"; // your existing bg image
import "../css/ServiceHero.css";

const ServiceHero = ({ title }) => {
  return (
    <section className="service-hero">
      <img src={heroImage} alt="Service Banner" className="service-hero-bg" />
      <div className="service-hero-overlay" />
      <h1 className="service-hero-title">{title}</h1>
    </section>
  );
};

export default ServiceHero;
