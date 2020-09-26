import React, { useState } from "react";
import { Box, Heading, Flex, Text, Image } from "@chakra-ui/core";
import { A } from 'hookrouter';
import logo from '../assets/logo.png';
import { ROUTE_CONFIG } from '../routes';

const LinkMenuItem = ({ link, children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    <A href={link}>{children}</A>
  </Text>
);

const RouteLinkCollection = ({ showMenu, config }) => {
  let routeItems = []
  for (let [routeKey, route] of Object.entries(config))
    if (!route.hidden)
      routeItems.push(<LinkMenuItem key={routeKey} link={route.path}>{route.name}</LinkMenuItem>);

  return (
    <Box
      display={{ sm: showMenu ? "block" : "none", md: "flex" }}
      width={{ sm: "full", md: "auto" }}
      alignItems="center"
      flexGrow={1}
    >
      {routeItems}
    </Box>
  );
}

const Header = () => {
  const [showMenu, toggleMenu] = useState(false);
  const toggleMenuWhenSmall = () => toggleMenu(!showMenu);
  const DEFAULT_PATH = ROUTE_CONFIG.DEFAULT.path;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.0rem"
      bg="blue.300"
      color="white"
    >
      <Flex align="center" mr={5}>
        <A href={DEFAULT_PATH}>
          <Image src={logo} size="3.0rem" />
        </A>
        <Heading as="h1" size="lg" paddingLeft="1.0rem">
          <A href={DEFAULT_PATH}>sproul.club</A>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={toggleMenuWhenSmall}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <RouteLinkCollection showMenu={showMenu} config={ROUTE_CONFIG}/>
    </Flex>
  );
};

export default Header;