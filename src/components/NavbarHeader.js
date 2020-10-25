import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Heading, Flex, Text, Image } from "@chakra-ui/core";
import { A, usePath } from 'hookrouter';
import logo from '../assets/logo.png';
import { ROUTE_CONFIG } from '../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDog, faBug } from '@fortawesome/free-solid-svg-icons';
import { navigate } from 'hookrouter';
import { GlobalAuthManager } from '../utils/GlobalAuthManager';

const THIRD_PARTY_LINKS = {
  SCOUT_APM: 'https://scoutapm.com/apps/182171',
  SENTRY_IO: 'https://sentry.io/organizations/sproulclub/issues/?project=5392072'
};

const LinkMenuItem = ({ link, children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    <A href={link}>{children}</A>
  </Text>
);

const RouteLinkCollection = ({ showMenu, config }) => {
  let routeItems = []
  for (let [routeKey, route] of Object.entries(config)) {
    if (!route.hidden) {
      routeItems.push(
        <LinkMenuItem
          key={routeKey}
          link={route.path}
        >
          {route.name}
        </LinkMenuItem>
      );
    }
  }

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

async function signOut() {
  await GlobalAuthManager.signOut();
  navigate(ROUTE_CONFIG.LOGIN.path);
}

const NavbarHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenuWhenSmall = () => setShowMenu(!showMenu);
  const HOME_PATH = ROUTE_CONFIG.HOME.path;

  const currentPath = usePath();
  const currentRoute = Object.values(ROUTE_CONFIG).find(route => currentPath === route.path)

  if (!currentRoute || !!currentRoute.hidden)
    return null;

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
        <A href={HOME_PATH}>
          <Image src={logo} boxSize="3.0rem" />
        </A>
        <Heading as="h1" size="lg" paddingLeft="1.0rem">
          <A href={HOME_PATH}>sproul.club</A>
        </Heading>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={toggleMenuWhenSmall}>
        <FontAwesomeIcon icon={faBars}/>
      </Box>
      <RouteLinkCollection showMenu={showMenu} config={ROUTE_CONFIG}/>

      <Box
        display={{ sm: showMenu ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <ButtonGroup>
          <Button bg="orange.300" border="1px">
            <a href={THIRD_PARTY_LINKS.SCOUT_APM}>
              <FontAwesomeIcon icon={faDog}/>
              <span>{"  "}Scout APM</span>
            </a>
          </Button>

          <Button bg="purple.700" border="1px">
            <a href={THIRD_PARTY_LINKS.SENTRY_IO}>
              <FontAwesomeIcon icon={faBug}/>
              <span>{"  "}Sentry.IO</span>
            </a>
          </Button>

          <Button bg="transparent" border="1px" onClick={signOut}>
            Log out
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default NavbarHeader;