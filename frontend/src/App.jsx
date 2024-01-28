import React from "react";
import NavBar from "./components/NavBar";
import RouteLinks from "./components/RouteLinks";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <div>
        <NavBar />
        <RouteLinks />
      </div>

      <Footer />
    </div>
  );
};

export default App;
