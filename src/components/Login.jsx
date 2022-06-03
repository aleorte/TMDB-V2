import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./Login.module.css";
import axios from "axios";

export function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/user/login/", {
        email: email,
        password: pwd,
      })
      .then((res) => {
        setEmail(res.data.email);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />
        <button>inciar sesión</button>
      </form>
    </section>
  );
}
