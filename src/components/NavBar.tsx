import { Link } from "react-router-dom";
import white_png_logo from "../assets/2tal-png-white.png";
interface NavProps {
  className?: string;
  c: boolean;
}

// const NavBar: React.FC<NavProps> = ({className}) => {
function NavBar({ className, c }: NavProps) {
  return (
    <ul className={className}>
      <li className="nav-item">
        <Link
          className="nav-link"
          aria-current="page"
          to="/"
          style={{ color: "white" }}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/music" style={{ color: "white" }}>
          Music
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dj" style={{ color: "white" }}>
          DJ
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/media" style={{ color: "white" }}>
          Media
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/shop" style={{ color: "white" }}>
          Shop
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/contact" style={{ color: "white" }}>
          Contact
        </Link>
      </li>
      {c ? (
        <li>
          <Link to="/">
          <img
            className="corner-image"
            style={{
              width: "65px",
              zIndex: "0",
              position: "fixed",
              right: "0px",
            }}
            src={white_png_logo}
            />
            </Link>
        </li>
      ) : null}
    </ul>
  );
}

export default NavBar;
