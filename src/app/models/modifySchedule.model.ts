import { Subject } from "./subject.model";

export class ConstantDuration {
    constructor(public isConstant:boolean, public Duration:Number = 0) {}
}

export class Schedule {
    monday : DailySchedule;
    tuesday: DailySchedule;
    wednesday: DailySchedule;
    thursday: DailySchedule;
    friday: DailySchedule;
    saturday: DailySchedule;
    sunday: DailySchedule;

    serializeForPost() {
        
    }
}

export class DailySchedule {
    allLessons: Lesson[];

    addLesson(lesson: Lesson) {
        this.allLessons.push(lesson);
    }

    removeLesson(lesson:Lesson){
        // not sure about that
    }
}

export class Lesson {
    constructor(public start:Number, public duration:Number, public subject: Subject){}
}