import { Box, Center } from "@chakra-ui/react";
import Nav from "./Nav";
import React, { Component } from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import { getLogos } from "../redux/actions/Logos";
import { withRouter } from "react-router-dom";
import cookie from "react-cookies";

class LogosContainer extends Component {
  componentDidMount() {
    if (!cookie.load("user")) {
      this.props.history.push("/");
      return;
    }
    this.props.dispatch(getLogos());
  }

  render() {
    const { logos } = this.props;

    const { logosData } = logos;

    return (
      <Box>
        <Nav />
        <Center>
          <Box display="flex" flexWrap="wrap" mt={100} w={"90%"}>
            {logosData.map((logo) => {
              return <Logo logo={logo} key={logo.id} />;
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

export default connect(mapStateToProps)(withRouter(LogosContainer));
