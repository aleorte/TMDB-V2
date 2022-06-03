import { useState, useEffect } from "react";
import { Login } from "./Login";
import style from "./Navbar.module.css";

export function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const changeBackgraund = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackgraund);
  return (
    <>
      <nav className={navbar ? style.navbarActive : style.navbar}></nav>
      <div className={style.navbarContainer}></div>
      <Login />
    </>
  );
}
