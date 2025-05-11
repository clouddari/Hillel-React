import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
const element = <FontAwesomeIcon icon={faCartShopping} />;

export default function Header() {
  return (
    <header>
      <ul>
        <li id="logo">LOGO</li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">Menu</a>
        </li>
        <li>
          <a href="#">{element}</a>
        </li>
      </ul>
    </header>
  );
}
