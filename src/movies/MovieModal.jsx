import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Grid,
    GridItem
  } from '@chakra-ui/react'    
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const MovieModal = (props) => {

    const [movie, setMovie] = useState([])
    const fontDesc = '14px'
    const colorDesc = '#B7BDCB'
    const fontContent = '16px'
    const colorContent = '#78849E'
    const colorPeople = '#00BAFF'
    const fontTitle = '30px'
    const colorTitle = '#164E78'
    const padding = '10px'

    function closeModal(){
        props.setOpenModal(false);
    }

    useEffect(() => {
        async function fetchMovieDetails(){
            const response = await axios.get("http://movie-challenge-api-xpand.azurewebsites.net/api/movies/" + props.id);
            setMovie(response.data);
          }
          fetchMovieDetails();
    }, [props])

    return (
        <Modal isOpen={props.openModal} onClose={closeModal} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={fontTitle} color={colorTitle}>{movie.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Year</Text>
                <Text fontSize={fontContent} color={colorContent}>{movie.year}</Text>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Genre</Text>
                <Text fontSize={fontContent} color={colorContent}>{movie.genre}</Text>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Description</Text>
                <Text fontSize={fontContent} color={colorContent}>{movie.description}</Text>
                <Grid templateColumns='repeat(3, 1fr)' gap={1} paddingTop={padding}>
                    <GridItem>
                        <Text fontSize={fontDesc} color={colorDesc}>Director</Text>
                        <Text fontSize={fontContent} color={colorPeople}>{movie.director}</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text fontSize={fontDesc} color={colorDesc}>Actors</Text>
                        <Text fontSize={fontContent} color={colorPeople}>{movie.actors}</Text>
                    </GridItem>
                </Grid>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Runtime</Text>
                <Text fontSize={fontContent} color={colorContent}>{movie.runtime}</Text>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Rating</Text>
                <Text fontSize={fontContent} color={colorContent}>{movie.rating}</Text>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Votes</Text>
                <Text fontSize={fontContent} color={colorContent}>{movie.votes}</Text>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Revenue</Text>
                <Text fontSize={fontContent} color={colorContent}>${movie.revenue} Million</Text>
                <Text fontSize={fontDesc} color={colorDesc} paddingTop={padding}>Metascore</Text>
                <Text fontSize={fontContent} color={colorContent}>{movie.metascore}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
    )
  }
  export default MovieModal