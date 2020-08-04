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
        records.data.forEach(record => { //data is the object key for the array value
            //sort the data here? using conditionals?
            let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class
            document.querySelector('#table-body').innerHTML += newRecord.renderRecord();
        }) 

        let highTemps = document.querySelector("a[href='#high']");
        highTemps.addEventListener('click', (e) => {
            if(e.target === highTemps) {
                let table = document.querySelector('#table-body')
                table.innerHTML = "";
                let sortedHigh = records.data.sort(function(a,b){
                    return b.attributes.temperature - a.attributes.temperature;
                })
                sortedHigh.forEach(record => { //data is the object key for the array value
                    //sort the data here? using conditionals?   
                    let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class
                    table.innerHTML += newRecord.renderRecord();
                }) 
            }
        })
        let lowTemps = document.querySelector("a[href='#low']");
        lowTemps.addEventListener('click', (e) => {
            if(e.target === lowTemps) {
                let table = document.querySelector('#table-body')
                table.innerHTML = "";
                let sortedLow = records.data.sort(function(a,b) {
                    return a.attributes.temperature - b.attributes.temperature;
                })
                sortedLow.forEach(record => {
                    let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class
                    document.querySelector('#table-body').innerHTML += newRecord.renderRecord();
                })
            }
        })
        let dateSelector = document.querySelector("a[href='#date']");
        console.log(dateSelector)
        dateSelector.addEventListener('click', (e) => {
            if(e.target === dateSelector) {
                let table = document.querySelector('#table-body');
                table.innerHTML = "";
                let sortedDate = records.data.sort(function(a,b) {
                    return a.attributes.created_at - b.attributes.created_at;
                })
                sortedDate.forEach(record => {
                    let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class
                    document.querySelector('#table-body').innerHTML += newRecord.renderRecord();
                })
            }
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
        //console.log(record);
        const recordData = record.data
        let newRecord = new Record(recordData.id, recordData.attributes) //creates new instance of Record class 
        document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
        location.reload();
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

    // let selectTemps = document.querySelector("a[href='#high']");
    // selectTemps.addEventListener('click', (e) => {
    //     let table = document.querySelector('#table-body')
    //     table.innerHTML = "";
    //     let sortedRecords = Record.all.sort(function(a,b){
    //         if(e.target === selectTemps) {
    //             return b.temperature - a.temperature;
    //         }
    //     });
    //     sortedRecords.forEach(record => { //data is the object key for the array value
    //         //sort the data here? using conditionals?
    //         let newRecord = new Record(record.id, record) //creates new instance of Record class
    //         document.querySelector('#table-body').innerHTML += newRecord.renderRecord();
    //     })      
    // })

            // let highTemps = records.data.sort(function(a,b){
        //     return b.attributes.temperature - a.attributes.temperature;
        // })
        // let lowTemps = records.data.sort(function(a,b){
        //     return a.attributes.temperature - b.attributes.temperature;
        // })