//Function to fetch data from the OMDb API based on user input
async function fetchSearch(page) {
    const apiKey = API_KEY; //API key for OMDb
    const inputSearch = document.getElementById('input-search'); //Gets the search input field
    const selectYear = document.getElementById('select-year'); //Dropdown menu for selecting year
    const selectType = document.getElementById('select-type'); //Dropdown menu for selecting type (movie/series/game)
    //Stores the selected values so they can be uses in the API call
    const searchValue = inputSearch.value; //User's input value
    const yearValue = selectYear.value; //Selected year
    const typeValue = selectType.value; //Selected type

    //Builds the URL for API request
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}&page=${page}`;

    //Add year to URL if specified (excluding '2013-later')
    if (yearValue && yearValue !== '2013-later') {
        url += `&y=${yearValue}`;
    }

    //Add type to URL if specified
    if (typeValue) {
        url += `&type=${typeValue}`;
    }

    try {
        const response = await fetch(url); //Makes the API request

        //Handle errors
        if (!response.ok) {
            throw new Error(`HTTP error code: ${response.status}, message: ${response.statusText}`);
        }

        const data = await response.json(); //Converting API response to usable data

        //Filter out results newer than 2013 if '2013-later' is selected
        if (yearValue === '2013-later') {
            data.Search = data.Search.filter(item => parseInt(item.Year) <= 2013);
        }

        displayContent(data.Search); //Display results on the page
        
        // If search show results, show pagination buttons and configure their states
        if (data.Search && data.Search.length > 0) {
            togglePageButtons(true); // Show page buttons

            //Calculate totalPages based on results per page
            const totalResults = parseInt(data.totalResults);
            const totalPages = Math.ceil(totalResults / 10);

            //Enable or disable pagination buttons
            document.getElementById('button-previous').disabled = currentPage <= 1;
            document.getElementById('button-next').disabled = currentPage >= totalPages;
        } else {
            togglePageButtons(false); //Hide page buttons if no results
        }

    } catch (error) {
        console.error('Error:', error); //Log any errors
    }
}

//Function to display the search results and builds HTML to show them on the page
function displayContent(content) {
    const contentContainer = document.getElementById('content-container');

    contentContainer.innerHTML = ''; //Clears old results before showing new ones

    //Show message if no results found
    if (!content || content.length === 0) {
        contentContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    let itemListHTML = ''; //Initialize empty HTML string

    //Loop through results and build HTML for each item
    content.forEach(item => {
        itemListHTML += `
        <div class="content">
            <img class="content-img" src="${item.Poster}" alt="${item.Title}">
            <div class="content-text">
                <h2 class="content-title">${item.Title}</h2>
                <p class="content-year">Year: ${item.Year}</p>
                <p class="content-type">Type: ${item.Type}</p>
            </div>
        </div>
        `;
    });

    //Inserts content unto the page
    contentContainer.innerHTML = itemListHTML;
}

let currentPage = 1; //Keeps track of the current page

//Function when the user clicks Next or Previous — updates the current page and triggers a new search
function changePage(pageChange) {
    currentPage += pageChange; //Update page number
    if (currentPage < 1) currentPage = 1; //Prevent navigating to negative page numbers
    fetchSearch(currentPage); //Fetch new results based on updated page
}

//Function that shows or hides the pagination buttons depending on if a search was done
function togglePageButtons(show) {
    const pageContainer = document.getElementById('pagination-container'); //Get the container holding pagination buttons
    pageContainer.style.display = show ? 'flex' : 'none'; //If 'show' is true, display as flex, otherwise hide pagination-container
}