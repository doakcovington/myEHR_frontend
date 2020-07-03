console.log("We Don't Go To Ravenholm")
const endPoint = "http://localhost:3000/api/v1/records"

//load DOM
document.addEventListener('DOMContentLoaded', () => {
    getReports();
});

function getReports(){
    fetch(endPoint)
    .then(response => response.json())
    .then(reports => {
        //console.log(reports)
    })
}