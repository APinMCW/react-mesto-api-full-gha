import { Link, useLocation, useNavigate } from "react-router-dom";

function NavBar({ dataUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("jwt")
    navigate("/sign-in");
  }

  return (
    <div className="navbar">
      {location.pathname === "/" && <p className="navbar__email">{dataUser.email}</p>}
      {location.pathname === "/" && (
        <button className="navbar__logout" onClick={handleLogout}>
          Выйти
        </button>
      )}
      {location.pathname === "/sign-in" && (
        <Link className="navbar__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {location.pathname === "/sign-up" && (
        <Link className="navbar__link" to="/sign-in">
          Войти
        </Link>
      )}{" "}
    </div>
  );
}

export default NavBar;
