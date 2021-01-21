import React, { useState } from 'react';
import { useTitle, navigate } from 'hookrouter';
import { ROUTE_CONFIG } from '../routes';

import {  Flex, Stack, Image } from '@chakra-ui/react';
import { Heading, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Input, Button } from '@chakra-ui/react';

import logo from '../assets/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { GlobalAuthManager } from '../utils/backendClient';

import { toast } from 'react-toastify';

const LoginPage = () => {
  useTitle('Login - sproul.club Dashboard');

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await GlobalAuthManager.signIn({ email, password });

      setIsSubmitting(false);
      navigate(ROUTE_CONFIG.HOME.path);
    } catch (err) {
      const apiError = err.response && err.response.data && err.response.data.reason;
      toast.error(apiError || err.message);

      setIsSubmitting(false);
    }
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
