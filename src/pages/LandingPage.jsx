import { MoviesGrid } from "../commons/MoviesGrid";
import { Search } from "../components/Search";

export function LandingPage() {
  return (
    <div>
      <Search />
      <MoviesGrid />
    </div>
  );
}
