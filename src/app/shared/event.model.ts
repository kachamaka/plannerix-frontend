export class SchoolEvent{
    date: number;
    title: string;
    type: number
    constructor(date:number, title: string, type: number) {
        this.date = date;
        this.title = title;
        this.type = type;
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