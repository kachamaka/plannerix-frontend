import { Injectable } from '@angular/core';

@Injectable()

export class DateTimeService {
    constructor() {}
    stringToDate(date:string):Date {
        let separators = [".", "-", "/"];
        let newDate:Array<string>;
        for (let i =0; i< separators.length; i++){
            let el = separators[i];
            newDate = date.split(el)
            if (newDate.length == 3) {
                break;
            }
        }
        if (newDate.length != 3) {
            return null;
        }
        
        let d = new Date(parseInt(newDate[2]), parseInt(newDate[1])-1, parseInt(newDate[0]));
        return d;
    }
    getDay(date: Date):string {
        // console.log(date, date.getDay());
        switch (date.getDay()) {
            case 0:
                return "Неделя"
            case 1:
                return "Понеделник"
            case 2:
                return "Вторник"
            case 3:
                return "Сряда"
            case 4:
                return "Четвъртък"
            case 5:
                return "Петък"    
            case 6:
                return "Събота"    
            default:
                return ""
        }
    }
}


export class SimpleDate {
    
    constructor(date:Array<string>) {
        console.log("Simple date",date)
    }
}