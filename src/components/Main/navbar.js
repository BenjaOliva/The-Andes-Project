import {
  Box,
  Image,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';

export const Navbar = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box zIndex="9999" px={1} boxShadow="xl">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={
            isOpen ? (
              <center>
                <FaTimes></FaTimes>
              </center>
            ) : (
              <center>
                <FaBars></FaBars>
              </center>
            )
          }
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Image
            maxH="8vh"
            src={require('../../assets/logo.png').default}
          ></Image>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link
              px={2}
              py={1}
              rounded={'md'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.900'),
              }}
              href={'#'}
            >
              Home
            </Link>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <ColorModeSwitcher
            justifySelf="flex-end"
            mr="3px"
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={5}>
            <Link px={2} py={1} rounded={'md'} href={'#'}>
              Inicio
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
