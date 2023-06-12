import logo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header({ dataUser, handleLogout}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Место" />
      <NavBar dataUser={dataUser} handleLogout={handleLogout}/>
    </header>
  );
}
export default Header;
