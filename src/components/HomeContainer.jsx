import React from "react";
import LoginRegisterContainer from "./LoginRegisterContainer";
import logo from "../assets/logo/logoArtist.png";
import { Box, Image, Center, Text } from "@chakra-ui/react";

export default function HomeContainer() {
  return (
    <Box mb={5}>
      <Center>
        <Image src={logo}></Image>
      </Center>
      <Center>
        <Text fontSize="3xl">All your logos at one place</Text>
      </Center>
      <LoginRegisterContainer />
    </Box>
  );
}
