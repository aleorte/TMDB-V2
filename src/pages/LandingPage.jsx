import { MoviesGrid } from "../commons/movieGrid";
import {Navbar} from "../components/Navbar"
export function LandingPage() {
  return (
    <div>
      <Navbar/>
      <MoviesGrid favorite={false}/>
    </div>
  );
}
