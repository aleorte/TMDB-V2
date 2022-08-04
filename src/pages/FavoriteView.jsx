import { MoviesGrid } from "../commons/movieGrid";
import { Navbar } from "../components/Navbar";

export function FavoriteView(){
    return (
        <>
        <Navbar/>
        <MoviesGrid favorite={true}/>
        </>
    )
}