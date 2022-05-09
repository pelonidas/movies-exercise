import React from "react";
import Navbar from "./Navbar";
import MovieBox from "./MovieBox";
import {v4 as uuid} from "uuid";
import {useNavigate} from "react-router-dom";

export default function Favourites() {
    const navigate = useNavigate()

    function redirect(id) {
        navigate(`/movie/${id}`)
    }

    const movies = JSON.parse(window.localStorage.getItem('favourites'))
    console.log(movies.length)
    function renderFavourites() {
        // if (!movies) return <div className={'h-[90vh] flex items-center justify-center'}><h1 className={'text-[4rem] text-center'}>No favourites found...</h1></div>
        // if () {
        //     alert('test')
        // }
        return (
            <div className={'w-[70%] mx-auto h-[90vh] flex flex-col'}>
                <div className={'grid grid-cols-3 gap-12 mt-[6rem]'}>
                    {movies.map(m => <MovieBox movie={m} key={uuid()} redirect={redirect} title={m.Title}/>)}
                </div>
            </div>
        )
    }
    return (
        <div>
            <Navbar isRoot={false}/>
            {renderFavourites()}
        </div>
    )
}
