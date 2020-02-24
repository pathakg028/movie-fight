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

const input = document.querySelector('input')

let timeOutId
const onInput = async event => {
    if (timeOutId) {
        clearTimeout(timeOutId)
    }
    timeOutId = setTimeout( async () => {
        const movies = await fetchData(event.target.value)
        // console.log(movie);
        for(let movie of movies) {
            const div = document.createElement('div')
            div.innerHTML = `<img src="${movie.Poster}"/>
                            <h1>${movie.Title}</h1>
                         `

        const target = document.querySelector('#target').appendChild(div)
        }


    }, 500)
}

input.addEventListener('input', onInput)
