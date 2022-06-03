
import { useLocation } from "react-router-dom";
export function UseQuery() {
    return new URLSearchParams(useLocation().search);
  }