console.log("record.js")

class Record {
    constructor(id, recordAttributes) {
        this.id = id
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
                    <td>${this.chart.pcp}</td>
                    <td class=${this.temperature >= 99 ? "bg-danger": console.log("false")}>${this.temperature}</td>
                    <td>${this.pulse}</td>
                    <td>${this.pain}
                    <td>${this.comments}</td>
                    <td><button type="button" class="btn btn-danger" data-record-id=${this.id}>X</button></td>
                </tr>
            `;
    }
}

Record.all = []; //global scope