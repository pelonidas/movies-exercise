import React from "react";
import {Button, TextField} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {setMovie} from "../features/movie";
import axios from "axios";
import {NavLink} from "react-router-dom";

export default function Navbar(props) {
    const movie = useSelector(state => state.movie.value)
    const dispatch = useDispatch();

    async function getMovies() {
        let res = await axios.get(`http://omdbapi.com/?apikey=8320bfe5&s=${movie.slug}`)
        let movies = res.data.Search
        dispatch(setMovie({...movie, movies: [...movies]}))
    }

    function renderContent() {
        if (props.isRoot) {
            return (
                <div className={'flex items-center'}>
                    <TextField
                        label={'Search movie'}
                        size={'small'}
                        sx={{
                            marginLeft: '2rem',
                            '& .MuiOutlinedInput-root': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white'
                            }
                        }}
                        onChange={(e) => dispatch(setMovie({
                            ...movie,
                            slug: e.target.value,
                        }))}
                        value={movie.slug}
                    />
                    <Button
                        sx={{
                            marginLeft: '1rem',
                            color: 'white',
                        }} onClick={getMovies}>SEARCH</Button>
                </div>
            )
        } else {
            return (
                <NavLink className={'ml-[2rem] text-[2rem] font-light font-body'} to={'/'}>Home</NavLink>
            )
        }
    }

    return (
        <div className={'bg-[#83c5be] text-[#edf6f9] h-[10vh] flex items-center'}>
            {renderContent()}
            <div className={'ml-auto flex items-center mr-[2rem] text-[1.25rem]'}>
                <NavLink to={'/favourites'}>Your Favourites</NavLink>
            </div>
        </div>
    )
}
