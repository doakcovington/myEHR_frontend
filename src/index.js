
console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getRecords()
  
    let createRecordForm = document.querySelector('.container-fluid')
  
    createRecordForm.addEventListener('submit', (e) => createFormHandler(e))
  });

function getRecords(){
    fetch(endPoint)
    .then(response => response.json())
    .then(records => { //gets the records data 
        //console.log(records)
        records.data.forEach(record => { //data is the object key for the array value
            let newRecord = new Record(record.id, record.attributes) //creates new instance of Record class 

            document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
        })
    })
}

function createFormHandler(e){
    e.preventDefault(); //prevents page refresh on form submit
    const temperatureInput = document.querySelector('#input-temperature').value
    const pulseInput = document.querySelector('#input-pulse').value
    const painInput = document.querySelector('#input-pain').value
    const commentsInput = document.querySelector('#input-comments').value
    const chartInput = document.querySelector('#charts').value
    const chartId = parseInt(chartInput)
    postRecord(temperatureInput, pulseInput, painInput, commentsInput, chartInput)
}

function postRecord(temperature, pulse, pain, comments, chart_id) {
    console.log(temperature, pulse, pain, comments, chart_id)

    let bodyData = {temperature, pulse, pain, comments, chart_id}

    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(record => {
        console.log(record);
        const recordData = record.data
        let newRecord = new Record(recordData, recordData.attributes) //creates new instance of Record class 

        document.querySelector('#table-body').innerHTML += newRecord.renderRecord()
    })
    // .catch((error) => {
    //     console.log(error);
    // })
}
