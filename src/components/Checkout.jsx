import { Box, Button, Center, Divider, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { resetLogoStates } from "../redux/actions/Logos";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.setState({
      cart: this.props.logos.cart,
    });
    this.props.dispatch(resetLogoStates());
  }

  handleClickContinue = () => {
    this.props.history.push("/market");
    window.location.reload(true);
  };

  render() {
    const { cart } = this.state;

    if (cart.length <= 0 && this.props.logos.cart.length <= 0) {
      this.props.history.push("/market");
      window.location.reload(true);
    } else {
      let total = 0;
      cart.forEach((logo) => {
        total += logo.price;
      });

      return (
        <Box pb="3">
          <Center>
            <Box width="90%">
              <Box mt="4">
                <Center>
                  <Text fontSize="2xl">Thankyou for shopping with us</Text>
                </Center>
              </Box>
              <Center>
                <Box w={["90%", "70%", "50%"]} shadow="md" mt="4" p="2">
                  <Center>
                    <Text fontSize="xl" color="blue.600" fontWeight="bold">
                      Invoice
                    </Text>
                  </Center>
                  <Center>
                    <Box display="flex" w="100%">
                      <Box w="85%">
                        <Text fontWeight="bold" color="chocolate">
                          Name
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="chocolate">
                          Price in Rs.
                        </Text>
                      </Box>
                    </Box>
                  </Center>
                  <Divider />
                  {cart.map((logo, index) => {
                    return (
                      <Center key={index}>
                        <Box display="flex" w="100%">
                          <Box w="90%">
                            <Text>{logo.name}</Text>
                          </Box>
                          <Box>
                            <Text>{logo.price}</Text>
                          </Box>
                        </Box>
                      </Center>
                    );
                  })}
                  <Divider />
                  <Center>
                    <Box display="flex" mt={3} w="100%">
                      <Box w="90%">
                        <Text fontWeight="bold">Total</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" color="red">
                          {total}
                        </Text>
                      </Box>
                    </Box>
                  </Center>
                </Box>
              </Center>
              <Center>
                <Box mt="3">
                  <Button
                    onClick={this.handleClickContinue}
                    colorScheme="purple"
                  >
                    Continue shopping
                  </Button>
                </Box>
              </Center>
            </Box>
          </Center>
        </Box>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    logos: state.logos,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
