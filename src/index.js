console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getChart();
    getRecords();
    let createRecordForm = document.querySelector('.container-fluid')
    createRecordForm.addEventListener('submit', (e) => createFormHandler(e))
    
    let selectRecord = document.querySelector('#table-body')
    console.log(selectRecord)
    selectRecord.addEventListener('click', (e) => {
        (e.target.classList.contains('btn'))
            console.log(e)
        const id = (e.target.dataset.recordId)
        if(id){
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetch(`${endPoint}/${id}`,options)
            .then(res => {
                res.json()
            })
            .then(() => e.target.parentElement.parentNode.remove());
        }
    })

    function sorted() {
        let result = "";
        let selectTemps = document.querySelector('.dropdown-menu')
        selectTemps.addEventListener('click', (e) => {
            let lowSelector = document.querySelector("a[href='#low']");//needs to be a tag inside of li tag with id
            let highSelector = document.querySelector("a[href='#high']");
            let dateSelector = document.querySelector("a[href='#date']");
            if(e.target === highSelector) {
                result = 'high';
            }else if(e.target === lowSelector)
                result = 'low';
            else{
                result = 'date';
            }
            return result;
            // let lowTemps = []
            // if(low){
            //     lowTemps = Record.all.sort(function(a,b){
            //         return a.temperature - b.temperature;
            //     });
            //     document.getElementById('table-body').innerHTML = '';
            //     lowTemps.forEach(record => record.renderRecords());
            // }
            // console.log(lowTemps)
        })
    }
});


function getChart(){
    const chartEndPoint = "http://localhost:3000/api/v1/charts"
    
    fetch(chartEndPoint)
    .then(response => response.json())
    .then(chart => {
        chart.data.forEach(chart => {
            const chartMarkup = `
            <div class="row">
                <div class="col-sm-4" style="background-color:lavender;">Name: ${chart.attributes.name}</div>
                <div class="col-sm-4" style="background-color:lavenderblush;">Date of Birth: ${formatDate(chart.attributes.dob)}</div>
                <div class="col-sm-4" style="background-color:lavender;">Primary Care Provider: ${chart.attributes.pcp}</div>
            </>`
            document.querySelector('#chart-container').innerHTML += chartMarkup
        })
    })
}

function getRecords(){
    fetch(endPoint)
    .then(response => response.json())
    .then(records => { //gets the records data 
        //console.log(records)
        let highTemps = records.data.sort(function(a,b){
            return b.attributes.temperature - a.attributes.temperature;
        })
        //let lowTemps = records.data.sort(function(a,b){
        //     return a.attributes.temperature - b.attributes.temperature;
        // })
        // let date = records.data.sort(function(a,b){
        //     return a.attributes.created_at - b.attributes.created_at;
        // })
        //console.log(highTemps)
        //console.log(lowTemps)
        //console.log(date)
        highTemps.forEach(record => { //data is the object key for the array value
            let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class 
            document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
        })
    })
}

function createFormHandler(e) {
    e.preventDefault(); //prevents page refresh on form submit
    const systolicInput = document.querySelector('#systolic').value;
    const diastolicInput = document.querySelector('#diastolic').value;
    const temperatureInput = document.querySelector('#validationDefault02').value
    const pulseInput = document.querySelector('#validationDefault03').value
    const painInput = document.querySelector('#validationDefault04').value
    const commentsInput = document.querySelector('#input-comments').value
    const chartInput = document.querySelector('#charts').value
    const chartId = parseInt(chartInput)
    postRecord(systolicInput, diastolicInput, temperatureInput, pulseInput, painInput, commentsInput, chartInput, chartId)
}

function formatDate(date){
    let newDate = new Date(date),
    month = '' + (newDate.getMonth() + 1),
    day = '' + newDate.getDate(),
    year = newDate.getFullYear();

    if(month.length < 2)
        month = '0' + month;
    if(day.length < 2)
        day = '0' + day;
    return [year, month, day].join('/');
}


function postRecord(systolic, diastolic, temperature, pulse, pain, comments, chart_id) {
    console.log(temperature, pulse, pain, comments, chart_id)

    let bodyData = {systolic, diastolic, temperature, pulse, pain, comments, chart_id}

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(record => {
        console.log(record);
        const recordData = record.data
        let newRecord = new Record(recordData.id, recordData.attributes) //creates new instance of Record class 
        document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
    })
    // .catch((error) => {
    //     console.log(error);
    // })
}

// function deleteRecord(record){
//     const recordId = e.target.dataset.recordId
//     fetch(`${endPoint}/${recordId}`, {
//         method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(record => e.target.parentElement.remove());
// }

// var temps = [];
// undefined
// temps
// []
// records.data.forEach(record => temps.push(record.attributes.temperature))
// undefined
// temps
// (2) [98.5, 100]
// temps.sort(function(a,b){return a - b});
// (2) [98.5, 100]
// temps.sort(function(a,b){return b - a});
// (2) [100, 98.5]

// document.getElementsByClassName('.high').addEventListener("click", sortTemp());
