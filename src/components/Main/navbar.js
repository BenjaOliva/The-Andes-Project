import {
  Box,
  Image,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
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
          hidden
        />
        <HStack ml={2} spacing={8} alignItems={'center'}>
          <Image
            maxH="6vh"
            src={require('../../assets/logo.png').default}
          />
        </HStack>
        <Flex alignItems={'center'}>
          <ColorModeSwitcher
            justifySelf="flex-end"
            mr="3px"
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }} hidden>
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
