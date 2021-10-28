import React, { useState, useEffect } from 'react';
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
  HStack,
  LightMode,
} from '@chakra-ui/react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ReactStars from 'react-rating-stars-component';

export const Home = ({ data, columns }) => {
  const [menuOption, setMenuOption] = useState('All');

  useEffect(() => {
   console.log("Data on home: ", data);
  }, [data])

  return (
    <Box h="100%" maxW="100%">
      <Text fontSize="3xl" as="strong" w="100%">
        Kitchen Recipes
      </Text>
      <HStack my={4}>
        <Stack w="490px">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch color="gray.100" />}
            />
            <Input
              type="text"
              placeholder="Search"
              style={{ borderRadius: '16px' }}
            />
          </InputGroup>
        </Stack>
        <Menu>
          <MenuButton
            as={Button}
            bg="gray.300"
            color="black"
            style={{ borderRadius: '16px' }}
            w="199px"
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
          <DataTable rows={data} />
        </GridItem>
      </Grid>
    </Box>
  );
};

const DataTable = ({ rows }) => {
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
  const [rowData, setRowData] = useState(rows);

  useEffect(() => {
    console.log("The rows: ", rows);
    setRowData(rows);
  }, [rows]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact
        rowData={rowData}
        gridOptions={gridOptions}
        columnDefs={gridOptions.columnDefs}
      />
    </div>
  );
};
