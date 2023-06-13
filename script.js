
const searchForm = document.getElementById("search-form")

// filter button event


document.getElementById("filters-btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("test works")
    document.querySelector(".helper").classList.toggle("hidden")
})


//main code for API query

document.getElementById("send-btn").addEventListener("click", (e) => {
    e.preventDefault()

    const searchDateAfter = document.getElementById("guardian-order-date-after").value
    const searchDareBefore = document.getElementById("guardian-order-date-before").value
    
    let query = document.getElementById("input-field").value
    const searchOrderInput = document.getElementById("guardian-order-select").value

    const queryObject = {
        query: query,
        order: searchOrderInput,
        onlyBefore: searchDareBefore,
        onlyAfter: searchDateAfter
    }


    if(query){
        getDataFromAPI(queryObject)
    }

})


async function getDataFromAPI(queryObject){

    const onlyAfter = queryObject.onlyAfter ? `&from-date=${queryObject.onlyAfter}` : ""
    const onlyBefore = queryObject.onlyBefore ? `&to-date=${queryObject.onlyBefore}` : ""
   
    const response = await fetch(`https://content.guardianapis.com/search?q=${queryObject.query}&order-by=${queryObject.order}&api-key=d5f36e75-5c5a-4479-8b08-99ac06374d78${onlyAfter}${onlyBefore}&show-fields=all`)
    const data = await response.json()
    
    displaySearchResults(data)
    
}

function displaySearchResults(apiResults){
    const resultsTemplate = document.getElementById("search-results")
    const resultsArr = apiResults.response.results 
    console.log(resultsArr)
    "2023-06-12T15:10:35Z"

    const html = resultsArr.map(element => {
        return `
        
            <div class="search-result-box">
                <img src="${element.fields.thumbnail}">
                 <div class="search-result-box-text">
                        <div class="search-result-box-main">
                            <a href="${element.webUrl}">${element.webTitle}</a>
                            <p>${element.fields.trailText}</p>
                        </div>
                        <div class="search-result-box-infos">
                            <p>Published: ${element.webPublicationDate.substring(0,10)}</p>
                            <p>Author(s): ${element.fields.byline}</p>
                            <p>Section: ${element.sectionName}</p>
                        </div>
                 </div>
             </div>


        
    `
    }).join("")

    resultsTemplate.innerHTML = html

    
}