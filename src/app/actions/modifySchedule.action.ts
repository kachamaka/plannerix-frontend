import { Subject } from "../models/subject.model";
import { Lesson } from "../models/modifySchedule.model";

export class AddSubject {
    static readonly type = '[modifySchedule] add subject';
    constructor(public payload: Subject) {};
}

export class RemoveSubject {
    static readonly type = '[modifySchedule] remove subject'
    constructor(public payload: Subject){};
}

export class UpdateSubject {
    static readonly type = '[modifySchedule] update subject';
    constructor(public oldSubject: Subject, public newName: String) {}
}

export class FetchSubjects {
    static readonly type = '[modifySchedule] fetch subjects';
}

export class UpdateChosenDay {
    static readonly type = '[modifySchedule] update chosen day';
    constructor(public payload: number){}
}

export class AddLessonToDailySchedule {
    static readonly type = '[modifySchedule] add lesson to daily schedule';
    constructor(public lesson: Lesson){}
}

export class DeleteLessonFromDailySchedule {
    static readonly type = '[modifySchedule] delete lesson from daily schedule';
    constructor(public lesson: Lesson) {}
}

// ???
export class UpdateLessonFromDailySchedule{
    static readonly type = '[modifySchedule] update lesson from daily schedule';
    constructor(public oldLesson: Lesson, public newLesson: Lesson) {}
}

export class SendSubjectUpdateToServer {
    static readonly type = '[modifySchedule] send request to server to update subjects';
}

export class CreateSubjectsServer{
    static readonly type= '[modifySchedule] send request to server to create subjects';
}

export class DeleteSubjectsServer {
    static readonly type = '[modifySchedule] send request to server to delete subjects';
}

export class AllModifiedSubjectsServer {
    static readonly type = '[modifySchedule] start all request to modify subject list';
}

export class UpdateSchdeule {
    static readonly type = '[modifySchedule] send request to server to update schedule';
}

export class FetchSchedule {
    static readonly type = '[modifySchedule] send request to server to fetch schedule'
}