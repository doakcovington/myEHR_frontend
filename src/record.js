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
                    <td class= "text-center" "delete"><button type="button" class="btn btn-danger" data-record-id=${this.id}>X</button></td>
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
}

Record.all = []; //global scope



