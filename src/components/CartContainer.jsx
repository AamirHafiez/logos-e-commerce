import { Box, Center, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import Nav from "./Nav";
import CartLogo from "./CartLogo";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class CartContainer extends Component {
  componentDidMount() {
    if (!cookie.load("user")) {
      this.props.history.push("/");
      return;
    }
  }

  render() {
    const { logos } = this.props;

    const { cart } = logos;

    return (
      <Box>
        <Nav />
        {logos.cartCount <= 0 && (
          <Box mt={200}>
            <Center>
              <Box w={"90%"}>
                <Text fontSize="4xl" textAlign="center">
                  Uh ho! Your cart is empty. Add something.
                </Text>
              </Box>
            </Center>
          </Box>
        )}
        <Center>
          <Box display="flex" flexWrap="wrap" mt={100} w={"90%"}>
            {cart.map((logo) => {
              return <CartLogo logo={logo} key={logo.id} />;
            })}
          </Box>
        </Center>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logos: state.logos,
  };
};

export default connect(mapStateToProps)(withRouter(CartContainer));
