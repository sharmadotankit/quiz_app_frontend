import { useState } from "react";
import { register } from "../../utils/authActions";
import { Box, Button, TextField } from "@mui/material";

const Register = ({ onRouteChange, loadUser }) => {
  const [userData, setUserData] = useState({
    registerEmail: "",
    registerPassword: "",
    registerName: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
  });

  const onEmailChange = (event) => {
    setUserData({ ...userData, registerEmail: event.target.value });
  };

  const onPasswordChange = (event) => {
    setUserData({ ...userData, registerPassword: event.target.value });
  };

  console.log("error", error);

  const onNameChange = (event) => {
    setUserData({ ...userData, registerName: event.target.value });
  };

  const onRegisterButtonClick = async () => {
    try {
      setError({
        emailError: "",
        passwordError: "",
        nameError: "",
      });

      if (
        userData.registerEmail === "" ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          userData.registerEmail
        )
      ) {
        setError({
          ...error,
          emailError: "Enter valid email",
          nameError: "",
          passwordError: "",
        });
      } else if (userData.registerName === "") {
        setError({
          ...error,
          nameError: "Enter valid name",
          emailError: "",
          passwordError: "",
        });
      } else if (
        userData.registerPassword === "" ||
        !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          userData.registerPassword
        )
      ) {
        setError({
          ...error,
          passwordError: "Enter valid password",
          emailError: "",
          nameErrorL: "",
        });
      } else {
        let data = {
          email: userData.registerEmail,
          password: userData.registerPassword,
          name: userData.registerName,
        };
        const response = await register(data);
        if (response.status) {
          loadUser(response.data);
          onRouteChange("home");
        }
      }
    } catch (err) {
      console.log("Error:", err);
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
          <h1>Register</h1>
          <TextField
            error={error.emailError}
            onChange={onEmailChange}
            type="text"
            id="registerEmail"
            label="Email"
            fullWidth
            helperText={error.emailError ? "Invalid Email" : ""}
          />
        </div>
        <div className="inputDiv">
          <TextField
            error={error.nameError}
            onChange={onNameChange}
            type="text"
            id="registerName"
            label="Name"
            fullWidth
            helperText={error.nameError ? "Invalid Name" : ""}
          />
        </div>

        <div className="inputDiv">
          <TextField
            error={error.passwordError}
            onChange={onPasswordChange}
            type="password"
            id="registerPassword"
            label="Password"
            fullWidth
            helperText={error.passwordError ? "Invalid Password" : ""}
          />
        </div>

        <Button
          variant="outlined"
          color="secondary"
          onClick={onRegisterButtonClick}
        >
          Register
        </Button>
      </Box>

      {error.passwordError.length > 0 ? (
        <div style={{ color: "red", textAlign: "left" }}>
          <p>Password must be : </p>
          <li>at least 8 character long</li>
          <li>at least 1 symbol</li>
          <li>at least 1 lower case</li>
          <li>at least 1 upper case</li>
        </div>
      ) : null}
    </div>
  );
};

export default Register;
