import React from 'react';
import {
  ChakraProvider,
  Box,
  IconButton,
  Grid,
  Tooltip,
  GridItem,
  theme,
  Image,
  Link,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerCloseButton,
  Input,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  FormLabel,
  Textarea,
  Switch,
  Stack,
  FormControl,
  Radio,
  RadioGroup,
  HStack,
} from '@chakra-ui/react';
import { Home } from './components/Main/Home';
import { Card } from './components/Main/Card';
import { Navbar } from './components/Main/navbar';
import { AddIcon } from '@chakra-ui/icons';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box mb={4} mx={1} h="10vh">
        <Navbar />
      </Box>
      <Box h="87vh" mx={2} mb={6}>
        <Grid
          h="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(12, 1fr)"
          gap={2}
        >
          <GridItem rowSpan={2} colSpan={3}>
            <Image
              h="100%"
              style={{
                objectFit: 'cover',
                objectPosition: '40% 20%',
                borderRadius: '10px 10px 100px 10px',
              }}
              src={require('../src/assets/background-image-food.jpg').default}
            />
          </GridItem>
          <GridItem colSpan={9} rowSpan={2}>
            <Card h="100%" boxShadow="dark-lg">
              <Home />
            </Card>
          </GridItem>
        </Grid>
      </Box>
      <FloatingButton />
    </ChakraProvider>
  );
}

const FloatingButton = () => {
  const color = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const firstField = React.useRef();

  return (
    <>
      <Link to="/#top">
        <Box
          position="fixed"
          bottom="20px"
          right={['16px', '84px', '84px', '84px', '50px']}
          zIndex={2}
        >
          <Tooltip hasArrow label="Add Recipe!" placement="left">
            <IconButton
              icon={<AddIcon />}
              color={color}
              colorScheme="cyan"
              size="lg"
              style={{ borderRadius: '90px' }}
              onClick={onOpen}
            />
          </Tooltip>
        </Box>
      </Link>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        initialFocusRef={firstField}
        zIndex={1001}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>New Recipe</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Recipe Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter user name"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Preparation</FormLabel>
                <Textarea id="desc" placeholder="Instructions: Write the steps..." />
              </Box>

              <FormControl as="fieldset">
                <FormLabel as="legend">Reviews</FormLabel>
                <RadioGroup colorScheme="green">
                  <HStack spacing="24px">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                    <Radio value="4">4</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>

              <Box>
                <FormLabel htmlFor="desc">Cooked Before</FormLabel>
                <Switch size="md" defaultChecked colorScheme="green"/>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="green" style={{borderRadius: "40px"}}>Create</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default App;
