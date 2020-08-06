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
            let value =  Record.findById(id);
            Record.all = Record.all.filter(record => record !== value) //the record needs to be removed in order for the sort functions to work properly 
        }
    })

});

document.addEventListener('click', (e) => {
    let highTemps = document.querySelector("a[href='#high']");
    let lowTemps = document.querySelector("a[href='#low']");
    let tempDates = document.querySelector("a[href='#date']");
    if(e.target === highTemps){
        sortHighTemps();
    }else if(e.target === lowTemps){
        sortLowTemps();
    }else if(e.target === tempDates) {
        sortByDate();
    }
})

function sortHighTemps(){
    let table = document.querySelector('#table-body'); //select table body
    table.innerHTML = ""; //empty table body innerHTML
    let sortedHigh = Record.all.sort(function(a,b) {
        return b.temperature - a.temperature;
    })
    sortedHigh.forEach(record => {
        table.innerHTML += record.renderRecord();
    }) 

}

function sortLowTemps(){
    let table = document.querySelector('#table-body');
    table.innerHTML = "";
    let sortedLow = Record.all.sort(function(a,b) {
        return a.temperature - b.temperature;
    })
    sortedLow.forEach(record => { 
        table.innerHTML += record.renderRecord();
    }) 
}

function sortByDate(){
    let table = document.querySelector('#table-body');
    table.innerHTML = "";
    let sortedDate = Record.all.sort(function(a,b) {
        return a.id - b.id;
    })
    sortedDate.forEach(record => {
        table.innerHTML += record.renderRecord();
    })
}

function getChart() {
    const chartEndPoint = "http://localhost:3000/api/v1/charts";
    
    fetch(chartEndPoint)
    .then(response => response.json())
    .then(chart => {
        chart.data.forEach(chart => {
            let newChart = new Chart(chart.id, chart.attributes);
            document.querySelector('#chart-container').innerHTML += newChart.renderChart();
        });
    });
}

function getRecords() {
    fetch(endPoint)
    .then(response => response.json())
    .then(records => { //gets the records data 
        records.data.forEach(record => { //data is the object key for the array value
            let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class
            document.querySelector('#table-body').innerHTML += newRecord.renderRecord();
        }) 
    })
}

function createFormHandler(e) {
    e.preventDefault(); //prevents page refresh on form submit
    const systolicInput = document.querySelector('#systolic').value;
    const diastolicInput = document.querySelector('#diastolic').value;
    const temperatureInput = document.querySelector('#validationDefault02').value;
    const pulseInput = document.querySelector('#validationDefault03').value;
    const painInput = document.querySelector('#validationDefault04').value;
    const commentsInput = document.querySelector('#input-comments').value;
    const chartInput = document.querySelector('#charts').value;
    const chartId = parseInt(chartInput);
    postRecord(systolicInput, diastolicInput, temperatureInput, pulseInput, painInput, commentsInput, chartInput, chartId);
}

function formatDate(date) {
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
    //console.log(temperature, pulse, pain, comments, chart_id)

    let bodyData = {systolic, diastolic, temperature, pulse, pain, comments, chart_id}

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(record => {
        const recordData = record.data
        let newRecord = new Record(recordData.id, recordData.attributes) //creates new instance of Record class 
        document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
    })
    // .catch((error) => {
    //     console.log(error);
    // })
}
