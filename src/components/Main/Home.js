import React, { useState } from 'react';
import {
  Text,
  Switch,
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
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  HStack,
  LightMode
} from '@chakra-ui/react';
import { useTable, usePagination } from 'react-table';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { AgGridReact } from 'ag-grid-react';
import { DataGrid } from '@mui/x-data-grid';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ReactStars from 'react-rating-stars-component';

export function Home() {
  const [menuOption, setMenuOption] = useState('All');

  return (
    <Box h="100%" maxW="100%">
      <Text fontSize="3xl" as="strong" w="100%">
        Kitchen Recipes
      </Text>
      <HStack my={4}>
        <Stack w="50%">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch color="gray.100" />}
            />
            <Input type="text" placeholder="Search" />
          </InputGroup>
        </Stack>
        <Menu>
          <MenuButton
            as={Button}
            bg="gray.300"
            color="black"
            rightIcon={<FaChevronDown />}
          >
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
          <Test />
        </GridItem>
      </Grid>
    </Box>
  );
}

const Test = () => {
  const rows = [
    { id: 1, name: 'Recipe 1', reviews: 2, cooked: true },
    { id: 2, name: 'Recipe 2', reviews: 4, cooked: false },
    { id: 3, name: 'Recipe 3', reviews: 3, cooked: false },
    { id: 4, name: 'Recipe 4', reviews: 1, cooked: true },
    { id: 5, name: 'Recipe 5', reviews: 4, cooked: true },
    { id: 6, name: 'Recipe 6', reviews: 4, cooked: false },
    { id: 7, name: 'Recipe 7', reviews: 2, cooked: true },
    { id: 8, name: 'Recipe 8', reviews: 4, cooked: false },
    { id: 9, name: 'Recipe 9', reviews: 3, cooked: true },
    { id: 10, name: 'Recipe 10', reviews: 2, cooked: true },
    { id: 11, name: 'Recipe 11', reviews: 2, cooked: true },
    { id: 12, name: 'Recipe 12', reviews: 4, cooked: false },
    { id: 13, name: 'Recipe 13', reviews: 3, cooked: false },
    { id: 14, name: 'Recipe 14', reviews: 1, cooked: true },
    { id: 15, name: 'Recipe 15', reviews: 4, cooked: true },
    { id: 16, name: 'Recipe 16', reviews: 4, cooked: false },
    { id: 17, name: 'Recipe 17', reviews: 2, cooked: true },
    { id: 18, name: 'Recipe 18', reviews: 4, cooked: false },
    { id: 19, name: 'Recipe 19', reviews: 3, cooked: true },
  ];

  const gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    columnDefs: [
      {
        field: 'id',
        hide: true,
      },
      {
        field: 'name',
        width: 498,
      },
      {
        field: 'reviews',
        cellRendererFramework: params => (
          <ReactStars
            count={4}
            size={25}
            value={params.value}
            isHalf={false}
            emptyIcon={<i className="far fa-star"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#FFD19A"
            edit={false}
          />
        ),
      },
      {
        field: 'cooked',
        type: 'rightAligned',
        cellRendererFramework: params => {
          return (
            <LightMode>
              <Switch
                colorScheme="green"
                size="md"
                defaultIsChecked={params.value}
              />
            </LightMode>
          );
        },
      },
    ],
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact
        rowData={rows}
        gridOptions={gridOptions}
        columnDefs={gridOptions.columnDefs}
      />
    </div>
  );
};
