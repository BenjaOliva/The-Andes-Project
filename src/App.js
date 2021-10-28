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
  useColorModeValue
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

  return (
    <Link to="/#top">
      <Box
        position="fixed"
        bottom="20px"
        right={['16px', '84px', '84px', '84px', '50px']}
        zIndex={2}
      >
        <Tooltip hasArrow label="Add Recipe!" placement="left" isOpen>
          <IconButton
            icon={<AddIcon />}
            color={color}
            colorScheme="cyan"
            size="lg"
            style={{ borderRadius: '100px 100px 100px 100px' }}
            onClick={() => alert('Test')}
          />
        </Tooltip>
      </Box>
    </Link>
  );
};

export default App;
