import { Subject } from "../models/subject.model";

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

