import React, { useState, useEffect } from 'react';
import _ from "lodash";
import {
  Text,
  Stack,
  Box,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  HStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  Heading,
  VStack,
  Switch,
  useToast,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { DataTableBasic } from './Datatable';
import { Rating } from 'primereact/rating';

export const Home = ({ data }) => {
  const [menuOption, setMenuOption] = useState('');
  const [searchText, setSearchText] = useState();
  const [dataRows, setDataRows] = useState(data);
  const [recipeInfo, setRecipeInfo] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setDataRows(data);
  }, [data]);

  const slowState = (e) => {
    console.log("The value debounced:", e.target.value);
    setSearchText(e.target.value);
  }

  const openRecipe = data => {
    setRecipeInfo(data);
    onOpen();
  };

  const getButtonText = value => {
    var temp;
    if (value !== '') {
      value === 'true' ? (temp = 'Active') : (temp = 'Inactive');
    } else {
      temp = 'All';
    }
    return temp;
  };

  return (
    <>
      <Box h="100%">
        <Text fontSize="3xl" as="strong" w="100%">
          Kitchen Recipes
        </Text>
        <HStack my={4}>
          <Stack w="50%">
            <InputGroup w="100%">
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray.100" />}
              />
              <Input
                type="text"
                placeholder="Search"
                style={{ borderRadius: '16px' }}
                onChange={_.debounce((e) => slowState(e), 500)}
              />
            </InputGroup>
          </Stack>
          <Menu w="50%">
            <MenuButton
              as={Button}
              bg="gray.300"
              color="black"
              style={{ borderRadius: '16px' }}
              rightIcon={<FaChevronDown />}
            >
              <Text fontSize="sm">
                Cooked Before: {getButtonText(menuOption)}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setMenuOption('')}>All</MenuItem>
              <MenuItem onClick={() => setMenuOption('true')}>Active</MenuItem>
              <MenuItem onClick={() => setMenuOption('false')}>
                Inactive
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <Grid
          h="100%"
          maxW="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(12, 1fr)"
          gap={2}
          mt={5}
        >
          <GridItem colSpan={12} rowSpan={1}>
            <DataTableBasic
              dataRows={dataRows}
              searchText={searchText}
              cookedFilter={menuOption}
              openRecipeDrawer={openRecipe}
            />
          </GridItem>
        </Grid>
      </Box>
      <RecipeInfoDrawer
        isOpen={isOpen}
        onClose={onClose}
        data={recipeInfo}
        allRecipes={dataRows}
      />
    </>
  );
};

const RecipeInfoDrawer = ({ isOpen, onClose, data, allRecipes }) => {
  const toast = useToast();
  const [AllDataRows, setAllData] = useState(allRecipes);

  const [recipeObject, setRecipeObject] = useState({
    id: 0,
    name: 'test',
    reviews: 1,
    instructions: 'No info',
    ingredients: [],
    cooked: false,
  });

  useEffect(() => {
    if (allRecipes !== undefined) {
      setAllData(allRecipes);
    }
  }, [allRecipes]);

  function closeAndToast() {
    onClose();
    toast({
      title: `This function isn't ready.. yet!`,
      description: 'If all goes well, you will se this feature soon ;)',
      status: 'info',
      isClosable: true,
      position: 'top',
    });
  }

  useEffect(() => {
    if (data !== undefined) {
      setRecipeObject(data);
    }
  }, [data]);

  const updateRecipe = e => {
    var temp = [...AllDataRows];
    temp[temp.findIndex(e => e.id === recipeObject.id)].cooked =
      !recipeObject.cooked;
    toast({
      title: `The recipe has been saved!`,
      description: temp[temp.findIndex(e => e.id === recipeObject.id)].cooked
        ? 'The recipe has been marked as cooked.'
        : 'The cooked field has been unmarked.',
      status: 'success',
      isClosable: true,
      position: 'top',
      duration: 2700,
    });
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader style={{ fontSize: '24px' }} bg="gray.100">
          <strong>{recipeObject.name}</strong>
        </DrawerHeader>

        <DrawerBody>
          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h4" size="sm">
              Ingredients
            </Heading>
            <Box marginLeft={5}>
              <UnorderedList spacing={1} size="sm">
                {recipeObject.ingredients.map(element => (
                  <ListItem key={element}>{element}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </VStack>
          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h4" size="sm">
              Preparation
            </Heading>
            <Text as="p" fontSize="md">
              {recipeObject.instructions}
            </Text>
          </VStack>
          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h3" size="sm">
              Reviews
            </Heading>
            <Rating
              disabled
              value={recipeObject.reviews}
              stars={4}
              readOnly
              cancel={false}
            />
          </VStack>
          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h3" size="sm">
              Cooked before
            </Heading>
            <Switch
              size="lg"
              colorScheme="green"
              defaultChecked={recipeObject.cooked}
              onChange={updateRecipe}
            />
          </VStack>
        </DrawerBody>

        <DrawerFooter bg="gray.100">
          <Button
            colorScheme="teal"
            w="95px"
            style={{ borderRadius: '25px' }}
            onClick={closeAndToast}
            size="lg"
          >
            Edit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
