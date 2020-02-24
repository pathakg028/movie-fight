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

const inputMovie = async (event) => {
    const searchedMovie = await fetchData(event.target.value)
    console.log(searchedMovie);
}

input.addEventListener('input', inputMovie)
