const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '1098e545',
            s: searchTerm
        }
    });
    return response.data.Search;
};

const input = document.querySelector('input')

let timeOutId
const onInput = async event => {
    if (timeOutId) {
        clearTimeout(timeOutId)
    }
    timeOutId = setTimeout( async () => {
        const movie = await fetchData(event.target.value)
        console.log(movie);

    }, 500)
}

input.addEventListener('input', onInput)
