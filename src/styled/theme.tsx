import { PaletteMode } from '@mui/material';
import { createTheme} from '@mui/material/styles';
import { dark } from '@mui/material/styles/createPalette';


const theme = createTheme({
    palette:{mode:"dark" as PaletteMode},
    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 13,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
    

})

export default theme