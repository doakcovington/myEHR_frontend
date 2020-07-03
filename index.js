console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getReports();
});

function getReports(){
    fetch(endPoint)
    .then(response => response.json())
    .then(reports => { //gets the reports data 
        //console.log(reports)
        reports.data.forEach(report => { //data is the object key for the array value
            const reportMarkup = `
                <div data-id=${report.id}>
                    <p>${report.attributes.date}</p>
                    <p>${report.attributes.time}</p>
                    <p>${report.attributes.blood_pressure}</p>
                    <p>${report.attributes.temperature}</p>
                    <p>${report.attributes.pulse}</p>
                    <p>${report.attributes.pain}</p>
                    <p>${report.attributes.comments}</p>
                    <button data-id=${report.id}>edit</button>
                </div>
                <br>`;
                document.querySelector('#report-container').innerHTML += reportMarkup

        })
    })
}