
console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getRecords();

    const createRecordForm = document.querySelector("#create-record-form")

    createRecordForm.addEventListener("submit", (e) => createFormHandler(e))
});

function getRecords(){
    fetch(endPoint)
    .then(response => response.json())
    .then(records => { //gets the records data 
        //console.log(records)
        records.data.forEach(record => { //data is the object key for the array value
            //debugger
            const recordMarkup = `
                <div data-id=${record.id}>
                    <p>Date: ${record.attributes.date}</p>
                    <p>Time: ${record.attributes.time}</p>
                    <p>Blood Pressure: ${record.attributes.blood_pressure}</p>
                    <p>Temperature: ${record.attributes.temperature}</p>
                    <p>Pulse: ${record.attributes.pulse}</p>
                    <p>Pain: ${record.attributes.pain}</p>
                    <p>Comments: ${record.attributes.comments}</p>
                    <button data-id=${record.id}>edit</button>
                </div>
                <br>`;
                document.querySelector('#record-container').innerHTML += recordMarkup

        })
    })
}

function createFormHandler(e){
    e.preventDefault(); //prevents page refresh on form submit
    const dateInput = document.querySelector('#input-date').value
    const timeInput = document.querySelector('#input-time').value
    const blood_pressureInput = document.querySelector('#input-blood_pressure').value
    const temperatureInput = document.querySelector('#input-temperature').value
    const pulseInput = document.querySelector('#input-pulse').value
    const painInput = document.querySelector('#input-pain').value
    const commentInput = document.querySelector('#input-comment').value
    postFetch(dateInput, timeInput, blood_pressureInput, temperatureInput, pulseInput, painInput, commentInput)
}

function postFetch(date, time, blood_pressure, temperature, pulse, pain, comment) {
    console.log(date, time, blood_pressure, temperature, pulse, pain, comment);
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(record => {
        console.log(record)
    })

    document.querySelector('#records-container').innerHTML += recordsMarkup;
}