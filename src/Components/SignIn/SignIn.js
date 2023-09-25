import {  useState } from "react";
import "./SignIn.css";
import { signIn } from "../../utils/authActions";
import { TextField, Box, Button } from "@mui/material";

const SignIn = ({onRouteChange,loadUser}) => {
  const [userData, setUserData] = useState({
    signInEmail: "",
    signInPassword: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    credentialsError: "",
  });

  const onEmailChange = (event) => {
    setUserData({ ...userData, signInEmail: event.target.value });
  };

  const onPasswordChange = (event) => {
    setUserData({ ...userData, signInPassword: event.target.value });
  };

  const onSignInButtonClick = async () => {
    setError({ emailError: "", passwordError: "", credentialsError: "" });
    if (userData.signInEmail === "") {
      setError({ ...error, emailError: "Enter valid email" });
    }else if (userData.signInPassword === "") {
      setError({ ...error, passwordError: "Enter valid password" });
    } else {
      let data = {
        email: userData.signInEmail,
        password: userData.signInPassword,
      };
      const response = await signIn(data);
      if (response.status) {
        loadUser(response.data);
        onRouteChange("home");
      } else {
        document.getElementById("error").innerHTML = response.message;
      }
    }
  };

  return (
    <div className="containerDiv">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
          <div className="inputDiv">
          <h1>Sign In</h1>
          <TextField
            error={error.emailError}
            onChange={onEmailChange}
            type="text"
            id="signinEmail"
            label="Email"
            fullWidth 
            helperText={error.emailError?"Invalid Email":""}
          />
          </div>

          <div className="inputDiv">
          <TextField
            error={error.passwordError}
            onChange={onPasswordChange}
            type="password"
            id="signinPassword"
            label="Password"
            fullWidth 
            helperText={error.passwordError?"Invalid Password":""}
          />
          </div>
          
          
          <Button variant="outlined" color="secondary" onClick={onSignInButtonClick}>
            Sign In
          </Button>

          {error.credentialsError?<>

            Sometghing
          </>:<></>}
      </Box>
    </div>
  );
};

export default SignIn;
