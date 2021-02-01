import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { BiLogInCircle } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import { connect } from "react-redux";
import {
  toggleRegisterForm,
  createUser,
} from "../redux/actions/loginRegisterActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
import withUseToast from "./withUseToast";

import React, { Component, createRef } from "react";

class LoginRegisterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      verify_password: "",
      showPassword: false,
      showVerifyPassword: false,
    };
    this.emailRef = createRef();
  }

  componentDidMount() {
    if (cookie.load("user")) {
      this.props.history.push("/market");
      return;
    }
    this.emailRef.current.focus();
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleShowPassword = (input) => {
    const newVal = !this.state[input];
    this.setState({
      [input]: newVal,
    });
  };

  showToast = (title, description, status) => {
    const { toast } = this.props;
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  };

  handleSubmit = (event) => {
    const { email, password, verify_password } = this.state;
    if (email === "" || password === "") {
      this.showToast("Please specify", "Your email and password.", "warning");
      return;
    }
    let isValidEmail = /\S+@\S+\.\S+/.test(email);
    let isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
    if (!isValidEmail) {
      this.showToast("Enter a valid email.", "", "error");
      return;
    }
    if (!isValidPassword) {
      this.showToast(
        "Check password",
        "password must be eight characters including one uppercase letter, one special character and alphanumeric characters",
        "error"
      );
      return;
    }
    if (event === "signup" && verify_password === "") {
      this.showToast(
        "Please enter in the field",
        "verify password.",
        "warning"
      );
      return;
    }
    if (event === "signup" && password !== verify_password) {
      this.showToast("Password and Verify Password do not match.", "", "error");
      return;
    }
    event === "signin"
      ? this.handleSignIn(email, password)
      : this.handleSignUp(email, password);
  };

  handleSignUp = (email, password) => {
    this.props.dispatch(createUser(email, password));
    this.setState({
      email: "",
      password: "",
      verify_password: "",
      showPassword: false,
      showVerifyPassword: false,
    });
  };

  handleSignIn = (email, password) => {
    const { users } = this.props.user;
    const index = users.findIndex((user) => user.email === email);
    if (index === -1) {
      this.showToast("No user found", "", "error");
      return;
    }
    if (users[index].password !== password) {
      this.showToast("Email or password is incorrect", "", "error");
      return;
    }
    cookie.save("user", { zono_email: email });
    this.props.history.push("/market");
  };

  render() {
    const {
      email,
      password,
      verify_password,
      showPassword,
      showVerifyPassword,
    } = this.state;

    const { loginRegister, dispatch } = this.props;

    const { showRegister } = loginRegister;
    return (
      <Center mt="3">
        <Box
          p="5"
          w={["90%", "80%", "60%", "40%"]}
          boxShadow="outline"
          borderRadius="md"
        >
          <Center>
            {showRegister ? (
              <Text fontSize="2xl" fontWeight="bold" p="3" color="blue.400">
                Register Now
              </Text>
            ) : (
              <Text fontSize="2xl" fontWeight="bold" p="3" color="blue.400">
                Login
              </Text>
            )}
          </Center>
          <Center>
            <Stack w="80%" p="5">
              <Box mb="4">
                <FormControl isRequired>
                  <FormLabel>Your email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    maxLength={40}
                    value={email}
                    onChange={this.handleInputChange}
                    ref={this.emailRef}
                    placeholder="Email id"
                  />
                  {showRegister && (
                    <FormHelperText>
                      We will never share your email
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box mb="4">
                <FormControl isRequired>
                  <FormLabel>Your Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      maxLength={20}
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                      placeholder="Password"
                    />
                    <InputRightElement>
                      <Button
                        size="sm"
                        onClick={() => this.handleShowPassword("showPassword")}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {showRegister && (
                    <FormHelperText>
                      Password must be atleast 8 characters long having one
                      uppercase letter, one lowercase letter, one number and a
                      special character.
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              {showRegister && (
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Verify Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showVerifyPassword ? "text" : "password"}
                        maxLength={20}
                        name="verify_password"
                        value={verify_password}
                        onChange={this.handleInputChange}
                        placeholder="Verify password"
                      />
                      <InputRightElement>
                        <Button
                          size="sm"
                          onClick={() =>
                            this.handleShowPassword("showVerifyPassword")
                          }
                        >
                          {showVerifyPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>
              )}
              <Center>
                <Box mt="2">
                  {showRegister ? (
                    <Button
                      size="lg"
                      onClick={() => this.handleSubmit("signup")}
                      rightIcon={<SiGnuprivacyguard />}
                      colorScheme="green"
                      variant="solid"
                    >
                      Sign up
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      onClick={() => this.handleSubmit("signin")}
                      rightIcon={<BiLogInCircle />}
                      colorScheme="pink"
                      variant="solid"
                    >
                      Sign in
                    </Button>
                  )}
                </Box>
              </Center>
              <Center>
                <Text color="yellow.500" fontSize="sm" mt="4">
                  {showRegister ? (
                    <Link onClick={() => dispatch(toggleRegisterForm(false))}>
                      Already have an account? Sign In
                    </Link>
                  ) : (
                    <Link onClick={() => dispatch(toggleRegisterForm(true))}>
                      Don't have an account? Sign Up
                    </Link>
                  )}
                </Text>
              </Center>
            </Stack>
          </Center>
        </Box>
      </Center>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginRegister: state.loginRegister,
    user: state.user,
  };
};

export default connect(mapStateToProps)(
  withRouter(withUseToast(LoginRegisterContainer))
);
