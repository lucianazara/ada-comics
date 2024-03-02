const $ = selector => document.querySelector(selector)

const urlBase = `http://gateway.marvel.com/v1/public/`
let ts = `ts=1`
const publicKey = `&apikey=fdaea98b3b23d7071fb62c4a0ffc157f`
const hash = `&hash=4200c5d912fc28d30525b28769be81e7`
const recurso = "comics"


const getMarvelCharacters = async () => {
    const url = `${urlBase}characters?${ts}${publicKey}${hash}`
    const response = await fetch(url)
    const data = await response.json()
    return data.data.results
}

const getMarvelComics = async (recurso, title) => {
    let existTitle = title? `&titleStartsWith=${title}` : ""
    let url = `${urlBase}${recurso}?${ts}${publicKey}${hash}${existTitle}`
    const response = await fetch(url)
    const data = await response.json()
    return data.data.results
}


//FILTERS BY COMIC
const printComic = async(recurso, title) => {
    const comics = await getMarvelComics(recurso, title)
    $(".characters-cards").innerHTML = ``

for(let comic of comics){
    $(".characters-cards").innerHTML += `
    <div class="border-neutral-500 rounded-lg p-2">
    <img class="justify-items-center" src="${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}">
        <p class="font-bold justify-start">${comic.title}</p>
</div>
    `
}
}


//FILTERING
        $("#input-text-filter").addEventListener("input", () => {
            printComic(recurso,    $("#input-text-filter").value )
            
})
    



const initialize = () => {
    printComic(recurso, "")
}

window.addEventListener("load", initialize);