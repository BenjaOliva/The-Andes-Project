import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

export default function Home() {
  const [menuOption, setMenuOption] = useState('All');

  return (
    <Box h="100%">
      <Text fontSize="3xl" as="strong">
        Kitchen Recipes
      </Text>
      <Grid
        h="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={2}
        mt={5}
      >
        <GridItem colSpan={7} rowSpan={1}>
          <Stack>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray.100" />}
              />
              <Input type="text" placeholder="Search" />
            </InputGroup>
          </Stack>
        </GridItem>
        <GridItem colSpan={3} rowSpan={1}>
          <Menu>
            <MenuButton as={Button} bg="gray.300" rightIcon={<FaChevronDown />}>
              Cooked Before: {menuOption}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setMenuOption('All')}>All</MenuItem>
              <MenuItem onClick={() => setMenuOption('Last Week')}>
                Last Week
              </MenuItem>
              <MenuItem onClick={() => setMenuOption('Last Month')}>
                Last Month
              </MenuItem>
              <MenuItem onClick={() => setMenuOption('This Year')}>
                This Year
              </MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem colSpan={2} />
      </Grid>
      <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={2}
      >
        <GridItem colSpan={12} rowSpan={1} bg="cyan.500"></GridItem>
      </Grid>
    </Box>
  );
}
