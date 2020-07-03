
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
    debugger
}