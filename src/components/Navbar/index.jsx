import { ArrowDropDown, Notifications, Search } from "../../styled/materialIcon";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseQuery } from "../../utils/UseQuery";
import "./Navbar.css";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
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
  return (
    <div className={isScrolled ? "scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
       
          <span ><Link to={"/"}>Inicio</Link></span>
          <span><Link to={"/favorites"}>Mis favoritos</Link></span>
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
              <Search className="searchButton"/>
            </button>
            {showSearch ? 
            <form className onSubmit={handleSubmit}>
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className={showSearch?"searchTextFieldSearch":"TextFieldSearch"}
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
        </form>: ""}
            
             </div>
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
