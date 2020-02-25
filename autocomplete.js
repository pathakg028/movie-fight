const createAutocomplete = ({root}) => {
    root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;
const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results')

let timeOutId
const onInput = async event => {
    if (timeOutId) {
        clearTimeout(timeOutId)
    }
    timeOutId = setTimeout( async () => {
        const movies = await fetchData(event.target.value)
        if(!movies.length) {
            dropdown.classList.remove('is-active');
            return;
        }
        resultsWrapper.innerHTML='';
        dropdown.classList.add('is-active')
        // console.log(movie);
        for(let movie of movies) {
            const option = document.createElement('a')
            const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
            option.classList.add('dropdown-item');
            option.innerHTML = `<img src="${imgSrc}"/>
                            ${movie.Title}
                         `
            document.addEventListener('click', () => {
            dropdown.classList.remove('is-active')
            input.value = movie.Title
            onMovieSelect(movie);
            })

        resultsWrapper.appendChild(option)
        }


    }, 500)
}

input.addEventListener('input', onInput)

document.addEventListener('click', event => {
    if(!root.contains(event.target)) {
        dropdown.classList.remove('is-active')
    }
})

}