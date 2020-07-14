console.log("record.js")

class Record {
    constructor(record, recordAttributes) {
        this.id = record.id
        this.temperature = recordAttributes.temperature
        this.pulse = recordAttributes.pulse
        this.pain = recordAttributes.pain
        this.comments = recordAttributes.comments
        this.chart = recordAttributes.chart
        Record.all.push(this) //pushes each new instance into the array 
    }

    renderRecord(){
        return `
                <tr>
                    <td>${this.chart.pcp}</td>
                    <td>${this.temperature}</td>
                    <td>${this.pulse}</td>
                    <td>${this.pain}
                    <td>${this.comments}</td>
                </tr>
            `;

            // <div data-id=${this.id}>
            // <h3>Primary Care Provider: ${this.chart.pcp}</h3>
            // <p>Temperature: ${this.temperature}</p>
            // <p>Pulse: ${this.pulse}</p>
            // <p>Pain: ${this.pain}</p>
            // <p>Comments: ${this.comments}</p>
            // </div>
    }
}

Record.all = []; //global scope