import React, { useEffect, useState } from 'react';
import {
  Wrap,
  WrapItem,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem, 
  IconButton,
  Box,
  Heading
} from '@chakra-ui/react';
import MoviesTable from './MoviesTable'
import axios from 'axios'
import { RepeatClockIcon } from '@chakra-ui/icons';


function Movies() {
  const [movieData, setMovies] = useState([])
  const [unfiltered, setUnfiltered] = useState([])
  const [activeSort, setActive] = useState(false)
  const [tags, setTags] = useState([])
  const [year, setYear] = useState(null)
  

  useEffect(() => {
    async function fetchMovies(){
      const response = await axios.get("http://movie-challenge-api-xpand.azurewebsites.net/api/movies");
      var data = response.data.content.map(function(item) {
          return {
            id: item.id,
            rank: item.rank,
            title: item.title,
            year: item.year,
            revenue: item.revenue
          };
        });         
      setMovies(data);
      setUnfiltered(data);
    }
    async function fetchYears(){
      const uniqueTags = [];
      movieData.map(movie => {
        if (uniqueTags.indexOf(movie.year) === -1) {
            uniqueTags.push(movie.year)
        }
        uniqueTags.sort(
          (a, b) => b - a
        )
      });
      setTags(uniqueTags);
    }
    if(movieData.length === 0){
      fetchMovies();
    }else if(tags.length === 0){
      fetchYears();
    }
  }, [movieData, tags])

  function sortByRevenue(){
    const clone = [...unfiltered]
    let data = clone.sort(
      (a, b) => b.revenue - a.revenue
    )
    const newArray = [...data]
    setMovies(newArray);
    setActive(true);
    setYear(null);
  }

  function sortDefault(){
    const clone = [...unfiltered]
    let data = clone.sort(
      (a, b) => a.rank - b.rank
    )
    const newArray = [...data]
    setMovies(newArray);
    setActive(false);
    setYear(null);
  }

  function filterByYear(event, year){
    setYear(year);
    let clone = [...unfiltered]
    clone = clone.filter(a => a.year === year)
    .sort((a, b) => b.revenue - a.revenue);

    const newArray = [...clone]
    setMovies(newArray);
    setActive(false);
  }

  function unfilter(){
    setYear(null);
    const clone = [...unfiltered]
    setMovies(clone);
  }

  let button = <Button colorScheme='teal' variant='outline'  onClick={sortByRevenue}>
  Top 10 Revenue
  </Button>

  if(activeSort){
    button = <Button colorScheme='teal' onClick={sortDefault}>
    Top 10 Revenue
  </Button>
  }

  let menuButton = <MenuButton as={Button} colorScheme='teal' variant='outline'>
  Top 10 Revenue per Year
  </MenuButton>
  if(year !== null){
    menuButton = <MenuButton as={Button} colorScheme='teal'>
    Top 10 Revenue {year}
    </MenuButton>
  }

  return (
    <Container maxW='container.xl' paddingTop='15px'>
    <Heading >Movie ranking</Heading>
    <Box paddingTop='20px'>
      <Wrap>
        <WrapItem>{button}</WrapItem>
        <WrapItem>
          <Menu placement='right'>
            {menuButton}
            <MenuList>
            <MenuItem onClick={unfilter}>Select a year</MenuItem>
            {tags.map((year) => (
                <MenuItem key={year} onClick={event => filterByYear(event, year)}>{year}</MenuItem>
            ))}
            </MenuList>
          </Menu>
        </WrapItem>
        <WrapItem>
          <IconButton
            variant='outline'
            aria-label='Search database'
            hidden={!year}
            onClick={unfilter}
            icon={<RepeatClockIcon />}/>
        </WrapItem>
      </Wrap>
    </Box>
    <MoviesTable movieData={movieData}/>
    </Container>
  );
}

export default Movies;
