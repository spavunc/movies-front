import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import Movies from './movies/Movies'
import './App.css';


function App() {

  return (
    <ChakraProvider theme={theme}>
      <header></header>
       <Movies/>
    </ChakraProvider>
  );
}

export default App;
