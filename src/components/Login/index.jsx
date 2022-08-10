import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  Typography,
  Container
} from "../../styled/material";
import { styleLogin, styleText, styleTextField, styleButton,styleButton2, styleContainer} from "./style";
import { Card } from "@mui/material";
import movieCollage from "../../assets/collage.jpg"
import "./style.css"
import { sendLoginRequest } from "../../State/user";


export function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isSingUp, setIsSingUp] = useState(false);
  const dispatch=useDispatch()
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(()=>{
    user.userInfo.email&&navigate("/")
  },[user])

  const handleSubmit = (e) => {
    e.preventDefault();
  isSingUp?
    (dispatch(sendLoginRequest({
      email: email,
      password: pwd,
    }))
    )
    :
      (axios
        .post("http://localhost:3001/api/user/register", {
          email: email,
          password: pwd,
        })
        .then(()=>setIsSingUp(true)))
  };


  const resetState=()=>{
    setIsSingUp(!isSingUp)
    setEmail("")
    setPwd("")
  }

  return (
    <>
    <img className="backG" src={movieCollage} alt=""/>
    <Box sx={styleContainer}>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      paddingTop={1}
      borderRadius={3}
      sx={styleLogin}
      component="form"
      onSubmit={handleSubmit}>
      <Typography sx={styleText} variant="h4" padding={3} textAlign="center" zIndex={3}>
        {isSingUp ? "Inicia sesión" : "Regístrate"}
      </Typography>

      <TextField
        sx={styleTextField}
        name="Email"
        value={email}
        margin="normal"
        placeholder="  Email"
        type={"email"}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{}}
        variant="standard"
      />
      <TextField
      sx={styleTextField}
        name="Contraseña"
        value={pwd}
        margin="normal"
        type={"password"}
        placeholder="Contraseña"
        onChange={(e) => setPwd(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        variant="standard"
       
      />
      <Button
      type="submit"
      sx={styleButton} variant="contained"
      >
        {isSingUp?"inciar sesión":"registrarse"}
      </Button>
      <Button onClick={resetState} sx={styleButton2} >
        {isSingUp ? "Registrarse" : "Ya tengo una cuenta"}
      </Button>
    </Box>
    </Box>
    </>
  );
}
