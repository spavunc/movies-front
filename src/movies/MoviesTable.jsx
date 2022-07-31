import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import MovieModal from './MovieModal'
import './MovieTable.css'

const MoviesTable = (props) => {
  const tableEl = useRef()
  const [rows, setRows] = useState([])
  const [distanceBottom, setDistanceBottom] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [movieId, setMovieId] = useState(0)
  const rowsDefault = 50;


  const generateItems = amount => {
    return props.movieData.slice(0, amount);
  }


  function loadMore(){
    console.log('load');
    const amount = rows.length + rowsDefault;
    setRows(generateItems(amount));
  }

  useEffect(() => {
    async function fetchMovies(){
      console.log('fetch');
      setRows([]);        
      setRows(generateItems(rowsDefault));
    }
      fetchMovies();
  }, [props])

  
  const scrollListener = useCallback(() => {
    let bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight
    setDistanceBottom(Math.round((bottom / 100) * 20))
    if (tableEl.current.scrollTop > bottom - distanceBottom) {
        loadMore()
    }
  }, [distanceBottom, props])
  
  useLayoutEffect(() => {
    const tableRef = tableEl.current
    tableRef.addEventListener('scroll', scrollListener)
    return () => {
      tableRef.removeEventListener('scroll', scrollListener)
    }
  }, [scrollListener])


  function triggerModal(event, id){
      setMovieId(id);
      setOpenModal(true);
  }

  let movieModal;
  if(openModal){
    movieModal = <MovieModal id={movieId} openModal={openModal} setOpenModal={setOpenModal} />
}
  return (
        <TableContainer style={{maxHeight: '578px', overflowY: 'scroll', marginTop:'30px' }} ref={tableEl}>
            {movieModal}
            <Table>
                <Thead>
                <Tr>
                    <Th>Rank</Th>
                    <Th>Title</Th>
                    <Th>Year</Th>
                    <Th>Revenue (Mill)</Th>
                    <Th></Th>
                </Tr>
                </Thead>
                <Tbody>
                {rows.map(({ id, rank, title, year, revenue }) => (
                    <Tr key={id} onClick={event => triggerModal(event, id)}>
                        <Td>{rank}</Td>
                        <Td>{title}</Td>
                        <Td>{year}</Td>
                        <Td>${revenue}</Td>
                        <Td><ViewIcon/></Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
  )
}
export default MoviesTable