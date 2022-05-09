import React from "react";

export default function MovieBox(props) {
    const {title, movie, redirect} = props
    function handleClick() {
        redirect(movie.imdbID)
    }
    return (
        <div className={'text-center'}>
            <img src={movie.Poster} alt="" className={'mx-auto'}/>
            <h1 className={'text-[1.5rem] text-center mt-[1rem] font-bold cursor-pointer'} onClick={handleClick}>{title}</h1>
        </div>
    )
}
