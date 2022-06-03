const url="https://api.themoviedb.org/3"

export function get(nUrl){
return fetch(url+nUrl)
.then(res=>res.json())
}
