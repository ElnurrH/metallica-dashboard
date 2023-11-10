import { Link } from "react-router-dom";
import awayLogo from "../assets/images/Metallica_logo.png";

export const Header = () => {
  return (
    <header className="navbar">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/" className="awayLogo">
              <img src={awayLogo} alt="awayLogo" />
            </Link>
          </div>
          <h1>METALLICA DASHBOARD</h1>
          <div className="links">
            
            <Link to="/create" className="createLink link">
              CREATE PRODUCT
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
