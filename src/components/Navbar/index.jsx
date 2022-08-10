import { Search } from "../../styled/materialIcon";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseQuery } from "../../utils/UseQuery";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../State/user";
import "./Navbar.css";

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

  console.log(user)

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
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <Search className="searchButton" />
            </button>
            {showSearch ? (
              <form className onSubmit={handleSubmit}>
                <input
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  className={
                    showSearch ? "searchTextFieldSearch" : "TextFieldSearch"
                  }
                  type="text"
                  placeholder="Search"
                  onMouseEnter={() => setInputHover(true)}
                  onMouseLeave={() => setInputHover(false)}
                  onBlur={() => {
                    setShowSearch(false);
                    setInputHover(false);
                  }}
                />
              </form>
            ) : (
              ""
            )}
          </div>
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
