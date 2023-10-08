import React from "react";
import { Link } from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent";

const LandingPage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to ProjectMania!</h1>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-success">
          Register
        </Link>
      </div>
      <CarouselComponent />
    </div>
  );
};

export default LandingPage;
