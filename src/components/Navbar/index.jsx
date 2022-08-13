import { Search } from "../../styled/materialIcon";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseQuery } from "../../utils/UseQuery";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../State/user";
import "./Navbar.css";
import { SvgSearch } from "../../utils/SvgSearch";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const query = UseQuery();

  const search = query.get("search");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/?search=" + searchText);
  };
  useEffect(() => {
    setSearchText(search || "");
  }, [search]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  console.log(user);

  return (
    <div className={isScrolled ? "scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <span>
            <Link to={"/"}>Inicio</Link>
          </span>
          <span>
            <Link to={`/favorites/${user.userInfo.id}`}>Mis favoritos</Link>
          </span>
        </div>
        <div className="right">
          <form className="search" onSubmit={handleSubmit}>
            <input type="checkbox" id="trigger" className="search__checkbox" />
            <label className="search__label-init" for="trigger"></label>
            <label className="search__label-active" for="trigger"></label>
            <div className="search__border"></div>
            <input
              type="text"
              className="search__input"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <div className="search__close"></div>
          </form>
          <span
            className="closeSesion"
            onClick={() => {
              handleLogout();
            }}
          >
            Cerrar sesión
          </span>
        </div>
      </div>
    </div>
  );
};
