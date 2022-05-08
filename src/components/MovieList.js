import React from "react";
import Navbar from "./Navbar";
import MovieBox from "./MovieBox";
import {useSelector} from "react-redux";
import {v4 as uuid} from 'uuid'
import {useNavigate} from "react-router-dom";

export default function MovieList() {
    const {movies} = useSelector(state => state.movie.value)
    const navigate = useNavigate()

    function redirect(id) {
        navigate(`/movie/${id}`)
    }

    const renderMovies = movies.length && movies.map(m => <MovieBox redirect={redirect} movie={m} key={uuid()} title={m.Title}/>)

    function renderContent() {
        return (
            <div className={'w-[70%] mx-auto h-[90vh] flex flex-col'}>
                <div className={'grid grid-cols-3 gap-12 mt-[6rem]'}>
                    {renderMovies}
                </div>
            </div>
        )
    }

    return (
        <div className={'font-body'}>
            <Navbar isRoot={true}/>
            {movies.length ? renderContent() : <div className={'text-[4rem] flex justify-center items-center h-[90vh]'}><span>Search something...</span></div>}
        </div>
    )
}
