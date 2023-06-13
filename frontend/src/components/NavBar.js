import { Link, useLocation} from "react-router-dom";

function NavBar({ dataUser, handleLogout }) {
  const location = useLocation();

  return (
    <div className="navbar">
      {location.pathname === "/" && <p className="navbar__email">{dataUser.email}</p>}
      {location.pathname === "/" && (
        <button className="navbar__logout" onClick={handleLogout}>
          Выйти
        </button>
      )}
      {location.pathname === "/signin" && (
        <Link className="navbar__link" to="/signup">
          Регистрация
        </Link>
      )}
      {location.pathname === "/signup" && (
        <Link className="navbar__link" to="/signin">
          Войти
        </Link>
      )}{" "}
    </div>
  );
}

export default NavBar;
