console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getRecords();
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
                    <p>${record.attributes.date}</p>
                    <p>${record.attributes.time}</p>
                    <p>${record.attributes.blood_pressure}</p>
                    <p>${record.attributes.temperature}</p>
                    <p>${record.attributes.pulse}</p>
                    <p>${record.attributes.pain}</p>
                    <p>${record.attributes.comments}</p>
                    <button data-id=${record.id}>edit</button>
                </div>
                <br>`;
                document.querySelector('#record-container').innerHTML += recordMarkup

        })
    })
}