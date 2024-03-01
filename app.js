const $ = selector => document.querySelector(selector)

const urlBase = `http://gateway.marvel.com/v1/public/`
let ts = `ts=1`
const publicKey = `&apikey=fdaea98b3b23d7071fb62c4a0ffc157f`
const hash = `&hash=4200c5d912fc28d30525b28769be81e7`


const getMarvelCharacters = async () => {
    const url = `${urlBase}characters?${ts}${publicKey}${hash}`
    const response = await fetch(url)
    const data = await response.json()
    return data.data.results
}

getMarvelCharacters()

const getMarvelComics = async (title) => {
    let existTitle = title? `&titleStartsWith=${title}` : "  "
    let url = `${urlBase}comics?${ts}${publicKey}${hash}${existTitle}`
    const response = await fetch(url)
    const data = await response.json()
    return data.data.results
}

getMarvelComics()


//FILTERS BY COMIC
const printComic = async() => {
    const comics = await getMarvelComics()
    $(".characters-cards").innerHTML = ``

for(let comic of comics){
    $(".characters-cards").innerHTML += `
    <div class="border-neutral-500 rounded-lg p-2">
    <img class="justify-items-center" src="${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}">
        <p class="font-bold justify-start">${comic.title}</p>
        <p class="font-semibold">GENERO</p>
        <p class="font-semibold">Status: <span class="font-light"></span></p>
</div>
    `
}
}


//FILTERING

$("#input-text-filter").addEventListener("input", () => {
    $("#btn-search").addEventListener("click", () => {
    console.log($("#input-text-filter").value);
    printComic($("#input-text-filter").value)

})
})

const initialize = () => {
    printComic()
}

window.addEventListener("load", initialize);