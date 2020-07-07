//console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getRecords()
  
    let createRecordForm = document.querySelector('#create-record-form')
  
    createRecordForm.addEventListener('submit', (e) => createFormHandler(e))
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
                    <h3>Primary Care Provider: ${record.attributes.chart.pcp}</h3>
                    <p>Temperature: ${record.attributes.temperature}</p>
                    <p>Pulse: ${record.attributes.pulse}</p>
                    <p>Pain: ${record.attributes.pain}</p>
                    <p>Comments: ${record.attributes.comments}</p>
                </div>
                <br>`;
                document.querySelector('#record-container').innerHTML += recordMarkup

        })
    })
}

function createFormHandler(e){
    e.preventDefault(); //prevents page refresh on form submit
    const temperatureInput = document.querySelector('#input-temperature').value
    const pulseInput = document.querySelector('#input-pulse').value
    const painInput = document.querySelector('#input-pain').value
    const commentInput = document.querySelector('#input-comments').value
    const chartInput = document.querySelector('#charts').value
    postRecord(temperatureInput, pulseInput, painInput, commentInput, chartInput)
}

function postRecord(date) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            date: date
        })
    })
    .then(response => response.json())
    .then(record => {
        console.log(record);
        //document.querySelector('#record-container').innerHTML += recordMarkup
    })
    // .catch((error) => {
    //     console.log(error);
    // })
}


// const data = { username: 'example' };

// fetch(endPoint, {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });