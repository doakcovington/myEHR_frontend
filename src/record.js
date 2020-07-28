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
                    <td class=${this.temperature >= 99 ? "bg-danger" : "text-center"}>${this.temperature}</td>
                    <td class="text-center">${this.pulse}</td>
                    <td class="text-center">${this.pain}
                    <td class="text-center">${this.comments}</td>
                    <td class="delete"><button type="button" class="btn btn-danger" data-record-id=${this.id}>X</button></td>
                </tr>
            `;
    }

    static findById(id) {
        return this.all.find(record => record.id === id);
      }
}

Record.all = []; //global scope