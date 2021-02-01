import { Box, Button, Center, Image, Text } from "@chakra-ui/react";
import { addLogoToCart, removeLogoFromCart } from "../redux/actions/Logos";
import { connect } from "react-redux";
import withUseToast from "./withUseToast";

import React, { Component } from "react";

class Logo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRemoveFromFavouritesBtn: false,
    };
  }

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

  handleAddToCartClick = () => {
    this.props.dispatch(addLogoToCart(this.props.logo));
    this.showToast("Added to cart", "", "success");
    this.setState({
      showRemoveFromFavouritesBtn: true,
    });
  };

  handleRemoveFromCart = () => {
    this.props.dispatch(removeLogoFromCart(this.props.logo));
    this.showToast("Removed from cart", "", "warning");
    this.setState({
      showRemoveFromFavouritesBtn: false,
    });
  };

  render() {
    const { id, name, price, image } = this.props.logo;

    let { showRemoveFromFavouritesBtn } = this.state;

    if (this.props.logos.cart.find((logo) => logo.id === id)) {
      showRemoveFromFavouritesBtn = true;
    }

    return (
      <Box width={["50%", "20%"]} p="3" minWidth={240}>
        <Box width="100%" shadow="xl" height={350}>
          <Image
            height="50%"
            width="100%"
            border="1px"
            objectFit="cover"
            src={image}
          />
          <Box>
            <Box p="2">
              <Text color="blue.600" fontWeight="bold" fontSize="xs">
                Name:
              </Text>
              <Text>{name}</Text>
              <Text mt={2} color="blue.600" fontWeight="bold" fontSize="xs">
                Price:
              </Text>
              <Text>Rs. {price}</Text>
            </Box>
          </Box>
          <Box>
            <Center>
              {showRemoveFromFavouritesBtn ? (
                <Button onClick={this.handleRemoveFromCart} colorScheme="red">
                  Remove from cart
                </Button>
              ) : (
                <Button onClick={this.handleAddToCartClick} colorScheme="teal">
                  Add to Cart
                </Button>
              )}
            </Center>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logos: state.logos,
  };
};

export default connect(mapStateToProps)(withUseToast(Logo));
