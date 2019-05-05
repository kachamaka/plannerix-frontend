import { Pipe, PipeTransform } from "@angular/core";

export class TimeConverter {
    convertStringtoMinutes(s: string):number {
        let split = s.split(/[\:\-\/]+/);
        if(split.length != 2){
            //do somthing
        }
        let minutes = parseInt(split[0])*60 + parseInt(split[1]);
        return minutes;
    }

    convertDateToMinutes(d: Date):number {
        let h = d.getHours();
        let m = d.getMinutes();
        let minutes = h*60 + m;
        return minutes;
    }

    convertMinutesToString(minutes: number): string{
        let h = Math.floor(minutes/60);
        let m = minutes % 60;
        // console.log(h, m, minutes % 60, minutes );
        let hourString = ("0"+h.toString()).slice(-2);
        let minutesString = ("0"+ m.toString()).slice(-2);
        return (hourString + ":" + minutesString);
    }
}

@Pipe({name: "time"})
export class TimePipe implements PipeTransform{
    transform(minutes: number):string {
        let tc = new TimeConverter()
        return tc.convertMinutesToString(minutes);
    }
}