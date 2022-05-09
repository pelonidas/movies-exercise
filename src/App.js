import {Route, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Favourites from "./components/Favourites";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
        <Route exact path={'/'} element={<MovieList/>}/>
        <Route exact path={'/movie/:movieId'} element={<MovieDetail/>}/>
        <Route exact path={'/favourites'} element={<Favourites/>}/>
        <Route path={'*'} element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
