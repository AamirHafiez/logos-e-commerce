import {
  Box,
  Button,
  Center,
  Circle,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo/logoArtist.png";
import { FaOpencart, FaSignOutAlt, FaHome } from "react-icons/fa";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withUseToast from "./withUseToast";

function Nav(props) {
  const showToast = (title, description, status) => {
    const { toast } = props;
    toast({
      title: title,
      description: description,
      status: status,
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  };

  const handleLogoutClick = () => {
    cookie.remove("user");
    props.history.push("/");
  };

  const handleClickGotoCart = () => {
    props.history.push("/cart");
  };

  const handleHomeClick = () => {
    props.history.push("/market");
  };

  const handleCheckoutClick = () => {
    if (props.logos.cartCount <= 0) {
      showToast("Add some items to cart to buy", "", "info");
      return;
    }
    props.history.push("/checkout");
  };

  const { cartCount } = props.logos;

  return (
    <Box
      bg="white"
      zIndex={2}
      shadow="lg"
      position="fixed"
      top="0"
      width="100%"
    >
      <Center>
        <Box
          width="90%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box width={["20%", "50%"]}>
            <Image src={logo} boxSize={14} />
          </Box>
          <Box
            width={["75%", "60%", "20%"]}
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            {props.location.pathname === "/cart" ? (
              <>
                <Box>
                  <Tooltip label="Go to Home." hasArrow>
                    <Button onClick={handleHomeClick} mt="1">
                      <FaHome />
                    </Button>
                  </Tooltip>
                </Box>
                <Box>
                  <Button
                    mt="1"
                    onClick={handleCheckoutClick}
                    colorScheme="yellow"
                  >
                    Checkout
                  </Button>
                </Box>
              </>
            ) : (
              <Box m={1} position="relative">
                <Button
                  onClick={handleClickGotoCart}
                  size="sm"
                  leftIcon={<FaOpencart />}
                  variant="solid"
                  colorScheme="facebook"
                >
                  Go to Cart
                </Button>
                <Tooltip label="Total items in cart." hasArrow>
                  <Circle
                    bg="orange.400"
                    position="absolute"
                    top={-1}
                    left={-2}
                  >
                    <Box
                      h={5}
                      w={5}
                      display="flex"
                      justifyContent="center"
                      overflow="hidden"
                      alignItems="center"
                    >
                      <Text fontWeight="bold" fontSize="xs" color="white">
                        {cartCount}
                      </Text>
                    </Box>
                  </Circle>
                </Tooltip>
              </Box>
            )}
            <Box m={1}>
              <Tooltip label="Logout!" hasArrow>
                <Button
                  onClick={handleLogoutClick}
                  size="sm"
                  colorScheme="facebook"
                >
                  <FaSignOutAlt />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    logos: state.logos,
  };
};

export default connect(mapStateToProps)(withUseToast(withRouter(Nav)));
