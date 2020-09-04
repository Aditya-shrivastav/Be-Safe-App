const api = "https://corona.lmao.ninja/v3/covid-19/countries/"
const button = document.getElementById('search');

button.addEventListener('click',function(event){
    event.preventDefault();
    const country = document.getElementById('name').value;
    const url = api + country
    covidCases(url)
    .then(function(allData){
        postInfo('/add',{
            country,
            cases : allData.cases,
            todayCases: allData.todayCases,
            deaths: allData.deaths,
            todayDeaths: allData.todayDeaths,
            recovered: allData.recovered,
            todayRecovered : allData.todayRecovered,
            active: allData.active,
            critical : allData.critical
        })
    })
    .then(function(newData){
        updateUI();
    })
});

async function covidCases(url){
    const data = await fetch(url);
    try{
        const allData = data.json();
        console.log(allData)
        return allData;
    }
    catch(error){
        alert("error",error);
    }
}

async function postInfo(url='',givenData={}){
    console.log(givenData)
    console.log(url);
    const info = await fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country : givenData.country,
            cases : givenData.cases,
            todayCases: givenData.todayCases,
            deaths: givenData.deaths,
            todayDeaths: givenData.todayDeaths,
            recovered: givenData.recovered,
            todayRecovered : givenData.todayRecovered,
            active: givenData.active,
            critical : givenData.critical
        })
    })
    try{
        const newData = info.json();
        console.log(newData)
        return newData;
    }
    catch(error){
       console.log("error",error)
    }
}

async function updateUI(){
    const data = await fetch ('/all')
    try{
        const allData = await data.json();
        console.log(allData)
        if(allData.deaths == undefined){
            document.getElementById('modal-body').style.display = "none" ;
            document.getElementById('error').innerHTML = "<strong>Please Enter a valid country</strong>"
        }
        else{
            document.getElementById('modal-body').style.display = "block";
            document.getElementById('error').innerHTML = ""
            document.getElementById('country').innerHTML = ': ' + allData.country;
            document.getElementById('cases').innerHTML = ': ' + allData.cases;
            document.getElementById('todayCases').innerHTML = ': ' + allData.todayCases;
            document.getElementById('deaths').innerHTML = ': ' + allData.deaths;
            document.getElementById('todayDeaths').innerHTML = ': ' + allData.todayDeaths;
            document.getElementById('recovered').innerHTML = ': ' + allData.recovered;
            document.getElementById('todayRecovered').innerHTML = ': ' + allData.todayRecovered;
            document.getElementById('active').innerHTML = ': ' + allData.active;
            document.getElementById('critical').innerHTML = ': ' + allData.critical;
        }
    }
    catch(error){
        console.log("error",error);
    }
}

$('#search').click(function(){
    console.log("hello")
    $('#bar').modal('toggle');
})