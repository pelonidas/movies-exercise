import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import {CircularProgress, ToggleButton} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MovieDetail() {
    const params = useParams()
    const [newMovie, setNewMovie] = useState({})
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [deleteSelected, setDeleteSelected] = useState(false)

    let localStorageArray = JSON.parse(localStorage.getItem('favourites') || '[]')
    const movie = localStorageArray.find(m => m.imdbID === params.movieId)
    const mounted = useRef();
    const navigate = useNavigate('/')

    function addToLocal() {
        let isInArray = false;
        for (const localStorageArrayElement of localStorageArray) {
            if (localStorageArrayElement.imdbID === newMovie.imdbID) {
                isInArray = true;
            }
        }
        if (!isInArray) {
            localStorageArray.push({...newMovie, isSelected: selected})
            localStorage.setItem('favourites', JSON.stringify(localStorageArray))
        }
        console.log('addLocal started')
    }
    function deleteLocal() {
        const filteredArray = localStorageArray.filter(movie => movie.imdbID !== params.movieId)
        localStorage.setItem('favourites', JSON.stringify(filteredArray))
        navigate('/')
    }
    useEffect(() => {
        if (deleteSelected) {
            deleteLocal()
        }
    }, [deleteSelected])
    useEffect(() => {
        if (selected) {
            addToLocal()
        }
    }, [selected])

    useEffect(() => {
        if (!mounted.current) {
            console.log('mounted')
            getMovie()
            mounted.current = true;
        }
    }, [localStorageArray])

    async function getMovie() {
        const url = `https://www.omdbapi.com/?i=${params.movieId}&apiKey=8320bfe5`;
        setLoading(true)
        const res = await axios.get(url)
        setNewMovie({...res.data})
        setLoading(false)
    }

    function renderButtons() {
        if (movie) {
            if (movie.isSelected) {
                return (
                    <ToggleButton value={'delete'} selected={deleteSelected} onChange={() => setDeleteSelected(!deleteSelected)}>
                        <DeleteIcon />
                    </ToggleButton>
                )
            }
        } else {
            if (selected) {
                return (
                    <ToggleButton value={'check'} selected={selected} onChange={() => setSelected(!selected)}>
                        <StarIcon/>
                    </ToggleButton>
                )
            } else {
                return (
                    <ToggleButton value={'check'} selected={selected} onChange={() => setSelected(!selected)}>
                        <StarBorderIcon/>
                    </ToggleButton>
                )
            }
        }
    }
    function renderDetail() {
        return (
            <div className={'flex justify-center'}>
                <div className={'w-[80%] h-[90vh] flex'}>
                    <div className={'m-auto flex'}>
                        <div>
                            <img src={newMovie.Poster} alt={newMovie.Title} className={'my-auto'}/>
                        </div>
                        <div className={'ml-[2rem] flex flex-col'}>
                            <div className={'flex items-center'}>
                                <h1 className={'mb-auto text-[1.5rem] mr-[1rem]'}>{newMovie.Title}</h1>
                                {/*<Rating className={'ml-[1rem]'} max={1} />*/}

                                {renderButtons()}
                            </div>
                            <div className={'flex mt-[1rem]'}>
                                <span>Year: {newMovie.Year}</span>
                                <span className={'ml-[2rem]'}>Rated: {newMovie.Rated}</span>
                                <span className={'ml-[2rem]'}>Runtime: {newMovie.Runtime}</span>
                                <span className={'ml-[2rem]'}>Genre: {newMovie.Genre}</span>
                            </div>
                            <div className={'mt-[0.5rem] flex flex-col'}>
                                <span className={'mt-[0.25rem]'}>Type: {newMovie.Type}</span>
                                <span className={'mt-[0.25rem]'}>Director: {newMovie.Director}</span>
                                <span className={'mt-[0.25rem]'}>Actors: {newMovie.Actors}</span>
                                <div className={'w-full max-w-[500px] mt-[0.25rem]'}>
                                    Plot: {newMovie.Plot}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar isRoot={false}/>
            {loading ?
                <div className={'flex justify-center items-center h-[90vh]'}><CircularProgress/></div> : renderDetail()}
        </div>
    )
}
