const token = "6ea7dafac6e247a888d39ab940a87b6cb724e0431013928c554c1b4daaaa7cad"
const urlCountries = "https://apiv2.allsportsapi.com/football/?met=Countries&APIkey="+token
const urlLeagues = "https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey="+token
const urlPlayers = "https://apiv2.allsportsapi.com/football/?&met=Topscorers&leagueId=207&APIkey="+token 

const tbody = document.querySelector('#tableCountries tbody')
const thead = document.querySelector('#tableCountries thead')

const getAllCountries = async() => {
    let countries
    await axios({
            method: 'get',
            url: urlCountries,
            responseType: 'json'
        }).then(function(res) {
            countries = res.data.result
        })
        .catch(function(err) {
            console.log(err)
        });
    return countries
}

const getAllLeagues = async() => {
    let leagues
    await axios({
            method: 'get',
            url: urlLeagues,
            responseType: 'json'
        }).then(function(res) {
            leagues = res.data.result
        })
        .catch(function(err) {
            console.log(err)
        });
    return leagues;
}

const getAllPlayers = async() => {
    let players
    await axios({
            method: 'get',
            url: urlPlayers,
            responseType: 'json'
        }).then(function(res) {
            players = res.data.result
        })
        .catch(function(err) {
            console.log(err)
        });
    return players;
}

const showCountries = async() => {
    let countries = await getAllCountries()
    tbody.innerHTML = ''
    thead.innerHTML = `
        <tr>
        <th scope="col">KEY </th>
        <th scope="col">NAME</th>
        <th scope="col">ISO2</th>
        <th scope="col">LOGO</th>
        </tr>`
    for (let i = 0; i < countries.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = countries[i]['country_key']
        fila.insertCell().innerHTML = countries[i]['country_name']
        fila.insertCell().innerHTML = countries[i]['country_iso2'] 
        fila.insertCell().innerHTML = countries[i]['country_logo']
    }
}

const showTableLeague = async(leagues) => {
    tbody.innerHTML = ''
    thead.innerHTML = `
        <tr>
        <th scope="col">LEAGUE NAME</th>
        <th scope="col">COUNTRY NAME</th>
        <th scope="col">LEAGUE LOGO</th>
        <th scope="col">COUNTRY LOGO</th>
        </tr>`
    for (let i = 0; i < leagues.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = leagues[i]['league_name']
        fila.insertCell().innerHTML = leagues[i]['country_name']
        fila.insertCell().innerHTML = leagues[i]['league_logo']
        fila.insertCell().innerHTML = leagues[i]['country_logo']
    }               
} 

const showLeagues = async() => {
    let leagues = await getAllLeagues()
    showTableLeague(leagues)
}

const filterByCountries = async() => {
    let textCountries = document.getElementById('inputByCountries').value
    let leagues = await getAllLeagues()
    tbody.innerHTML = ''
    let filteredLeague = leagues.filter(item => (item.country_name === textCountries));
    showTableLeague(filteredLeague)            
}

// METODO PARA NO DUPLICADOS
const removeDuplicateAndGetPlayers = async() => {
    let players = await getAllPlayers()
    let noDuplicates = []
    players.forEach(function(itm) {
        let unique = true;
        noDuplicates.forEach(function(itm2) {
            if (itm2.player_name === itm.player_name) unique = false; 
        })
        if (unique) noDuplicates.push(itm)
    });
    return noDuplicates
}    


const showPlayers = async() => {
    let players = await removeDuplicateAndGetPlayers()
    tbody.innerHTML = ''
    thead.innerHTML = `
          <tr>
            <th scope="col">PLAYER NAME</th>
            <th scope="col">TEAM NAME</th>
          </tr>`      
    for (let i = 0; i < players.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = players[i]['player_name']
        fila.insertCell().innerHTML = players[i]['team_name']
    }
}

const showDataPlayer = async() => {
    let textPlayer = document.getElementById('inputByPlayers').value
    let players = await getAllPlayers()
    tbody.innerHTML = ''
    let filteredPlayer = players.filter(item => (item.player_name === textPlayer));
    showTableDataPlayer(filteredPlayer)
}

const showTableDataPlayer = async(Players) => {
    tbody.innerHTML = ''
    thead.innerHTML = `
    <tr>
      <th scope="col">PLAYER PLACE</th>
      <th scope="col">GOALS</th>
      <th scope="col">ASSISTS</th>
      <th scope="col">PENALTY GOALS</th>
    </tr>`
    for (let i = 0; i < Players.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = Players[i]['player_place']
        fila.insertCell().innerHTML = Players[i]['goals']
        fila.insertCell().innerHTML = Players[i]['assists']
        fila.insertCell().innerHTML = Players[i]['penalty_goals']
    }               
} 

const buttonCountries = document.getElementById('buttonGetCountries')
    if (buttonCountries) {
        buttonCountries.addEventListener('click' , showCountries)
    }

const buttonLeagues = document.getElementById('buttonGetLeagues')
    if (buttonLeagues) {
        buttonLeagues.addEventListener('click', showLeagues)
    }

const buttonByCountries = document.getElementById('buttonByCountries')
    if (buttonByCountries) {
        buttonByCountries.addEventListener('click', filterByCountries)
    }

const buttonGetPlayers = document.getElementById('buttonGetPlayers')
    if (buttonGetPlayers) {
        buttonGetPlayers.addEventListener('click', showPlayers)
    }

const buttonShowDataPlayer = document.getElementById('buttonByPlayers')
    if (buttonShowDataPlayer) {
        buttonShowDataPlayer.addEventListener('click', showDataPlayer)
    }        

