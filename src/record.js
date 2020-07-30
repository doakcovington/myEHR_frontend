console.log("record.js")
class Record {
    constructor(id, recordAttributes) {
        this.id = id
        this.systolic = recordAttributes.systolic
        this.diastolic = recordAttributes.diastolic
        this.created_at = recordAttributes.created_at
        this.temperature = recordAttributes.temperature
        this.pulse = recordAttributes.pulse
        this.pain = recordAttributes.pain
        this.comments = recordAttributes.comments
        this.chart = recordAttributes.chart
        Record.all.push(this) //pushes each new instance into the array
    }

    renderRecord(){
        return `
                <tr data-record-id=${this.id}>
                    <td class="text-center">${formatDate(this.created_at)}</td>
                    <td class="text-center">${this.systolic} / ${this.diastolic}</td>
                    <td class=${this.temperature >= 99 ? "bg-danger" : "text-center"}>${this.temperature}</td>
                    <td class="text-center">${this.pulse}</td>
                    <td class="text-center">${this.pain}
                    <td class="text-center">${this.comments}</td>
                    <td class="delete"><button type="button" class="btn btn-danger" data-record-id=${this.id}>X</button></td>
                </tr>
            `;
    }

    formatDate(date){
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
    

    static findById(id) {
        return this.all.find(record => record.id === id);
    }

    static sortTemp(){
        let temps = [];
        Record.all.forEach(record => temps.push(record.temperature)) //pushs all temps to temps array
        return temps.sort(function(a,b){return b - a}); //sorts temps high to low
        
    }
}

Record.all = []; //global scope

// Record.all
// (2) [Record, Record]0: Record {id: "1", systolic: 120, diastolic: 60, created_at: "2020-07-29T21:17:02.146Z", temperature: 98.5, …}1: Record {id: "2", systolic: 125, diastolic: 65, created_at: "2020-07-29T21:17:02.152Z", temperature: 100, …}length: 2__proto__: Array(0)
// Record.all[0]
// Record {id: "1", systolic: 120, diastolic: 60, created_at: "2020-07-29T21:17:02.146Z", temperature: 98.5, …}
// var temps = [];
// undefined
// Record.all.forEach(record => temps.push(record.temperature))
// undefined
// temps
// (2) [98.5, 100]
// temps.sort(function(a,b){return b - a});
// (2) [100, 98.5]
