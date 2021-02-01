import { Box, Image, Text, Center, Button } from "@chakra-ui/react";
import { removeLogoFromCart } from "../redux/actions/Logos";
import React from "react";

import { connect } from "react-redux";

function CartLogo(props) {
  const { name, price, image } = props.logo;

  const handleRemoveFromCart = () => {
    props.dispatch(removeLogoFromCart(props.logo));
  };

  return (
    <Box>
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
              <Button onClick={handleRemoveFromCart} colorScheme="red">
                Remove from cart
              </Button>
            </Center>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    logos: state.logos,
  };
};

export default connect(mapStateToProps)(CartLogo);
