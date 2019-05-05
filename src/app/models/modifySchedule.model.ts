import { Subject } from "./subject.model";

export const MONDAY: string = "monday"; 
export const TUESDAY: string = "tuesday";
export const WEDNESDAY: string = "wednesday";
export const THURSDAY: string = "thursday";
export const FRIDAY: string = "friday";
export const SATURDAY: string = "saturday";
export const SUNDAY: string = "sunday";
export class ConstantDuration {
    constructor(public isConstant:boolean, public Duration:Number = 0) {}
}

export class Schedule {
    serializeForPost() {
        
    }
    constructor() {
        this[MONDAY] = new DailySchedule();
        this[TUESDAY] = new DailySchedule();
        this[WEDNESDAY]= new DailySchedule();
        this[THURSDAY] = new DailySchedule();
        this[FRIDAY] = new DailySchedule();
        this[SATURDAY] = new DailySchedule();
        this[SUNDAY] = new DailySchedule();
    }
}

export class DailySchedule {
    allLessons: Lesson[] = [];

    getLessons():Lesson[] {
        return this.allLessons;
    }

    addLesson(lesson: Lesson) {
        this.allLessons.push(lesson);
    }

    removeLesson(lesson:Lesson){
        // not sure about that
        this.allLessons = this.allLessons.filter(v=>v != lesson);
    }

    sort() {
        this.allLessons.sort((a: Lesson, b: Lesson)=>{
            return a.start - b.start;
        })
    }

    getLastLessonEnd():number {
        let lastLesson = this.allLessons[this.allLessons.length -1];
        return lastLesson.start + lastLesson.duration;
    }
}

export class Lesson {
    constructor(public start:number, public duration:number, public subject: Subject,public id?:string){} // id is the subject id
    // static createLesson(schedule: DailySchedule, duration: number, subject : Subject): Lesson {
    //     let lastLesson:Lesson = schedule.allLessons[schedule.allLessons.length-1];
    //     return new Lesson(lastLesson.start + lastLesson.duration, duration, subject);
    // }
}



export class Day {
    constructor(public name: string, public index: string,) {}
}

export const AllDays: Day[] = [
    new Day("Понеделник", MONDAY), 
    new Day("Вторник", TUESDAY), 
    new Day("Сряда", WEDNESDAY), 
    new Day("Четвъртък", THURSDAY),
    new Day("Петък", FRIDAY),
    new Day("Събота", SATURDAY),
    new Day("Неделя", SUNDAY)
]; 