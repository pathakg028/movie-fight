const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '1098e545',
            s: searchTerm
        }
    });
    if(response.data.Error) {
        return []
    }
        return response.data.Search;
    
};

const root = document.querySelector('.autocomplete')
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results')

let timeOutId
const onInput = async event => {
    if (timeOutId) {
        clearTimeout(timeOutId)
    }
    timeOutId = setTimeout( async () => {
        const movies = await fetchData(event.target.value)
        dropdown.classList.add('is-active')
        // console.log(movie);
        for(let movie of movies) {
            const option = document.createElement('a')
            option.classList.add('dropdown-item');
            option.innerHTML = `<img src="${movie.Poster}"/>
                            ${movie.Title}
                         `

        resultsWrapper.appendChild(option)
        }


    }, 500)
}

input.addEventListener('input', onInput)
