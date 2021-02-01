import React from "react";
import { useToast } from "@chakra-ui/react";

const withUseToast = (Component) => {
  return function WrappedComponent(props) {
    const toast = useToast();
    return <Component {...props} toast={toast} />;
  };
};

export default withUseToast;
