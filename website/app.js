// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '01a0aa6f1009f8f5b17fb28c08c6c55e'

// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate')
generate.addEventListener('click', event => {
    const city = document.getElementById('city').value
    const feelings = document.getElementById('feelings').value

    getWeatherData(city)
        .then(response => response.json())
        .then(json => {
            const body = {}
            body.temp = json.main.temp
            body.date = newDate
            body.content = feelings
            body.city = city
            return postData(body)
        })
        .then(response => {
            updateData()
        })
        .catch(error => {
            console.log(error)
            console.log('weather api call error')
        });
})

/* Function to GET Web API Data*/
const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    return fetch(url)
}

/* Function to POST data */
const postData = async (content) => {
    //async function to call post endpoint on backend
    const url = `http://localhost:8000/add`
    return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(content)
    });

}

/* Function to Update Project Data on DOM*/
const updateData = async () => {
    getData()
        .then(response => response.json())
        .then(entries => {
            const list = document.getElementById('list');

            // cleam the children of the list
            list.querySelectorAll('.entryHolder').forEach(node => node.remove());
            
            // builds entry list
            for(let entry of entries.reverse()) {
                const entryHolder = document.createElement('div');
                const city = document.createElement('div');
                const date = document.createElement('div');
                const temp = document.createElement('div');
                const content = document.createElement('div');

                entryHolder.classList.add('entryHolder');
                city.classList.add('city');
                date.classList.add('date');
                temp.classList.add('temp');
                content.classList.add('content');

                city.innerHTML = entry.city;
                date.innerHTML = entry.date;
                temp.innerHTML = `${entry.temp} °F`;
                content.innerHTML = entry.content;

                list.appendChild(entryHolder);
                entryHolder.appendChild(city);
                entryHolder.appendChild(date);
                entryHolder.appendChild(temp);
                entryHolder.appendChild(content);
            } 
        })
}

/* Function to GET Project Data */
const getData = async () => {
    //TODO async function pra chamar o GET /all no backend
    const url = `http://localhost:8000/all`
    return fetch(url)
}

updateData();