
const searchForm = document.getElementById("search-form")

document.getElementById("send-btn").addEventListener("click", (e) => {
    e.preventDefault()
    const query = document.getElementById("input-field").value
    getDataFromAPI(query)
    

})


async function getDataFromAPI(query){
    const response = await fetch(`https://content.guardianapis.com/search?q=${query}&order-by=newest&api-key=d5f36e75-5c5a-4479-8b08-99ac06374d78&show-fields=all`)
    const data = await response.json()
    console.log(data)
    displaySearchResults(data)
    
}

function displaySearchResults(apiResults){
    const resultsTemplate = document.getElementById("search-results")
    const resultsArr = apiResults.response.results 
    console.log(resultsArr)
    "2023-06-12T15:10:35Z"

    const html = resultsArr.map(element => {
        return `
        <div>
            <div class="search-result-box">
                <img src="${element.fields.thumbnail}">
                <div>
                <a href="${element.webUrl}">${element.webTitle}</a>
                <p>${element.fields.trailText}</p>
                <p>Published: ${element.webPublicationDate.substring(0,10)}</p>
                <p>Author(s): ${element.fields.byline}</p>
                </div>
            </div>


        </div>
    `
    }).join("")

    resultsTemplate.innerHTML = html

    
}