export class SchoolEvent{
    date: number;
    subject: string;
    description: string;
    type: number;
    event_id: number;
    constructor(event_id: number, date:number, subject:string, description: string, type: number) {
        this.date = date/1000;
        this.subject = subject;
        this.description = description;
        this.type = type;
        this.event_id = event_id;
        // console.log(new Date(this.date*1000))
    }
    getDate() {
        let d = new Date(this.date*1000);
        return d;
    }
    typeToString() {
        if(this.type == 0) {
            return "Тест";
        } else if (this.type == 1) {
            return "Проект";
        } else {
            return "Друго";
        }
    }
}