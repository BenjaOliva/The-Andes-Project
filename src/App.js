import React, { useState, useEffect } from 'react';
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
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Home } from './components/Main/Home';
import { Card } from './components/Main/Card';
import { Navbar } from './components/Main/navbar';
import { AddIcon } from '@chakra-ui/icons';
import { ProductService } from './components/Main/ProductsService';

const App = () => {
  const [Recipes, setRecipes] = useState();

  const productService = new ProductService();

  useEffect(() => {
    productService.getProductsSmall().then(data => setRecipes(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(Recipes);
  }, [Recipes]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleAdd = newData => {
    setRecipes(prev => {
      var temp = [...prev];
      temp.push({ id: Recipes.length + 1, ...newData });
      return temp;
    });
  };

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
          <GridItem
            hidden={Boolean(window.innerWidth < 640)}
            rowSpan={2}
            colSpan={3}
          >
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
          <GridItem
            colSpan={Boolean(window.innerWidth < 640) ? 12 : 9}
            rowSpan={2}
          >
            <Card h="100%" boxShadow="dark-lg">
              <Home data={Recipes} />
            </Card>
          </GridItem>
        </Grid>
      </Box>
      <FloatingButton handleAdd={handleAdd} />
    </ChakraProvider>
  );
};

const FloatingButton = ({ handleAdd }) => {
  const color = useColorModeValue('white', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const firstField = React.useRef();
  const toast = useToast();
  const [reviewValue, setReviewValue] = useState('1');
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    instructions: '',
    ingredients: [],
    reviews: '1',
    cooked: false,
  });

  useEffect(() => {
    setNewRecipe(prev => ({ ...prev, reviews: reviewValue }));
  }, [reviewValue]);

  const handleChange = ({ target: { value, name } }) => {
    setNewRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = e => {
    e.preventDefault();
    onClose();

    const objToAdd = newRecipe;
    document.getElementById('newRecipe-form').reset();

    setNewRecipe({
      name: '',
      instructions: '',
      reviews: '1',
      cooked: false,
    });

    setReviewValue('1');

    setTimeout(() => {
      toast({
        title: 'Recipe created.',
        description: "We've created your Recipe.",
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }, 1500);

    objToAdd.reviews = parseInt(objToAdd.reviews);
    handleAdd(objToAdd);
  };

  return (
    <>
      <Link>
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
        size="sm"
        onClose={onClose}
        finalFocusRef={btnRef}
        initialFocusRef={firstField}
        zIndex={1001}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>New Recipe</DrawerHeader>
          <form id="newRecipe-form" onSubmit={handleSave}>
            <DrawerBody>
              <Stack spacing="24px">
                <FormControl>
                  <FormLabel htmlFor="username">Recipe Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="recipe-name"
                    name="name"
                    placeholder="Please enter user name"
                    onChange={handleChange}
                    isRequired
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="desc">Ingredients</FormLabel>
                  <IngredientsFields />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="desc">Preparation</FormLabel>
                  <Textarea
                    id="desc"
                    name="instructions"
                    onChange={handleChange}
                    placeholder="Instructions: Write the steps..."
                    isRequired
                  />
                </FormControl>

                <FormControl as="fieldset">
                  <FormLabel as="legend">Reviews</FormLabel>
                  <RadioGroup
                    colorScheme="green"
                    name="reviews"
                    onChange={setReviewValue}
                    value={reviewValue}
                  >
                    <HStack spacing="24px">
                      <Radio value="1">1</Radio>
                      <Radio value="2">2</Radio>
                      <Radio value="3">3</Radio>
                      <Radio value="4">4</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="cooked">Cooked Before</FormLabel>
                  <Switch
                    id="cooked"
                    size="md"
                    isChecked={newRecipe.cooked}
                    colorScheme="green"
                    name="cooked"
                    value={newRecipe.cooked}
                    onChange={e => {
                      setNewRecipe(prev => ({
                        ...prev,
                        [e.target.name]: !newRecipe.cooked,
                      }));
                    }}
                  />
                </FormControl>
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                type="submit"
                colorScheme="green"
                style={{ borderRadius: '40px' }}
              >
                Create
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

function IngredientsFields() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Write the ingredient..."
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" colorScheme="green" onClick={handleClick}>
          Add
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default App;
