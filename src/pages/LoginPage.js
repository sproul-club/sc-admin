import React, { useState } from 'react';
import { useTitle } from 'hookrouter';

import {  Flex, Stack, Image } from '@chakra-ui/core';
import { Heading, InputGroup, InputRightElement } from '@chakra-ui/core';
import { Input, Button } from "@chakra-ui/core";

import logo from '../assets/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GlobalAuthManager } from '../utils/GlobalAuthManager';

const LoginPage = () => {
  useTitle('Login - sproul.club Dashboard');

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    setTimeout(() => {
      setIsSubmitting(false);

      if (email === 'admin@gmail.com' && password === 'admin') {
        GlobalAuthManager.signIn({
          access: { token: 'example-token-access', expires: 3 * 1000000 },
          refresh: { token: 'example-token-refresh', expires: 3 * 10000000 }
        });
      }
    }, 3000);
  }

  return (
    <Flex align="center" bg="blue.100" justify="center" minHeight="100vh">
      <form onSubmit={onSubmit}>
        <Stack bg="white" spacing={4} align="center" padding="32px">
          <Image src={logo} boxSize="192px" />
          <Heading as="h1" size="xl">Login</Heading>

          <Input
            name="email"
            type="email"
            placeholder="Email"
            isRequired
          />

          <InputGroup>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              isRequired
            />
            <InputRightElement>
              <Button onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </Button>
            </InputRightElement>
          </InputGroup>



          <Stack spacing={8} align="center" isInline>
            <Button isLoading={isSubmitting} colorScheme="blue" type="submit">Login</Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
};


export default LoginPage;