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

export const Home = ({ data }) => {
  const [menuOption, setMenuOption] = useState('All');
  const [searchText, setSearchText] = useState();
  const [dataRows, setDataRows] = useState(data);

  useEffect(() => {
    setDataRows(data);
  }, [data]);

  const handleSearch = e => {
    setSearchText(e.target.value);
  };

  const getButtonText = value => {
    var temp;
    if (value !== 'All') {
      value === 'true' ? (temp = 'Active') : (temp = 'Inactive');
    } else {
      temp = 'All';
    }
    return temp;
  };

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
              onChange={handleSearch}
            />
          </InputGroup>
        </Stack>
        <Menu>
          <MenuButton
            as={Button}
            bg="gray.300"
            color="black"
            style={{ borderRadius: '16px' }}
            w="225px"
            rightIcon={<FaChevronDown />}
          >
            Cooked Before: {getButtonText(menuOption)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setMenuOption('All')}>All</MenuItem>
            <MenuItem onClick={() => setMenuOption('true')}>Active</MenuItem>
            <MenuItem onClick={() => setMenuOption('false')}>Inactive</MenuItem>
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
          <DataTable
            rows={dataRows}
            searchValue={searchText}
            buttonFilter={menuOption}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

const DataTable = ({ rows, searchValue, buttonFilter }) => {
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(rows);
  const gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    columnDefs: [
      {
        field: 'id',
        hide: true,
        getQuickFilterText: () => null,
      },
      {
        field: 'name',
        width: 498,
        isFilterActive: true,
      },
      {
        field: 'reviews',
        sortable: true,
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
        getQuickFilterText: () => null,
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

  useEffect(() => {
    const selectBool = value => {
      const instance = gridApi.getFilterInstance('name');
      instance.setModel({
        type: 'set',
        values: ['Recipe 1', 'Recipe 2'],
      });
      gridApi.onFilterChanged();
    };

    const selectEverything = () => {
      const instance = gridApi.getFilterInstance('cooked');
      instance.setModel(null);
      gridApi.onFilterChanged();
    };

    if (gridApi) {
      if (buttonFilter !== 'All') {
        console.log('useEffect en DataTable: ', buttonFilter === 'true');
        selectBool(buttonFilter);
      } else {
        console.log("it's All");
        selectEverything();
      }
    }
  }, [buttonFilter, gridApi]);

  useEffect(() => {
    if (gridApi) gridApi.setQuickFilter(searchValue);
  }, [searchValue, gridApi]);

  useEffect(() => {
    setRowData(rows);
  }, [rows]);

  function onGridReady(params) {
    setGridApi(params.api);
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact
        rowData={rowData}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
      />
    </div>
  );
};
