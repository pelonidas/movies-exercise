import {Route, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Favourites from "./components/Favourites";

function App() {
  return (
    <Routes>
        <Route exact path={'/'} element={<MovieList/>}/>
        <Route exact path={'/movie/:movieId'} element={<MovieDetail/>}/>
        <Route exact path={'/favourites'} element={<Favourites/>}/>
    </Routes>
  );
}

export default App;
