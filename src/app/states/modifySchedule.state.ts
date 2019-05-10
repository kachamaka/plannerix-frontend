import { Router } from '@angular/router';
import { ConstantDuration, Schedule, Day, AllDays, DailySchedule, Lesson } from "../models/modifySchedule.model";
import { Subject } from "../models/subject.model";
import { State, Action, StateContext, Selector, InitState } from "@ngxs/store";
import { AddSubject, FetchSubjects, RemoveSubject, UpdateSubject, UpdateChosenDay, AddLessonToDailySchedule, DeleteLessonFromDailySchedule, SendSubjectUpdateToServer, CreateSubjectsServer, DeleteSubjectsServer, AllModifiedSubjectsServer, UpdateSchdeule, FetchSchedule } from "../actions/modifySchedule.action";
import { HttpService } from "../shared/http.service";

import { tap, mergeMap } from 'rxjs/operators';
import { combineLatest } from "rxjs";
import { StorageService } from "../shared/storage.service";
import { NgZone } from '@angular/core';

export interface ModifyScheduleModel {
    modifiableSubjects: Subject[],
    serverSubjects: Subject[],
    schedule: Schedule,
    constantLessonDuration: ConstantDuration,
    chosenDay: number
}

@State<ModifyScheduleModel>({
    name: "modifySchedule",
    defaults: {
        modifiableSubjects: [],
        serverSubjects: [],
        schedule: new Schedule(),
        constantLessonDuration: undefined,
        chosenDay: 0
    }
})
export class ModifyScheduleState {

    constructor(
        private zone: NgZone,
        private router: Router, 
        private storageService: StorageService, 
        private httpService: HttpService) {}

    @Selector()
    static getSubjects(state: ModifyScheduleModel) {
        return  state.modifiableSubjects;
    }

    @Action(UpdateSubject)
    updateSubject({getState, patchState}: StateContext<ModifyScheduleModel>, {oldSubject, newName}: UpdateSubject){
        let subjects = getState().modifiableSubjects;
        let clone = subjects.slice(0);
        for(let i = 0; i < clone.length; i++) {
            if (clone[i].name == oldSubject.name) {
                clone[i] = new Subject(newName,oldSubject.id)
            }
        }
        patchState({modifiableSubjects: clone});
    }

    @Action(AddSubject)
    addSubject({ getState ,patchState }: StateContext<ModifyScheduleModel>, {payload}: AddSubject) {
        let state = getState();
        patchState({modifiableSubjects: [...state.modifiableSubjects, payload]})
    }

    @Action(RemoveSubject)
    removeSubject({getState,patchState}: StateContext<ModifyScheduleModel>, {payload}: AddSubject) {
        let subjects = getState().modifiableSubjects;
        subjects = subjects.filter((el)=>{
            if (el.id == undefined || payload.id == undefined) {
                return el.name != payload.name;
            } else {
                return el.id != payload.id;
            }
        })
    
        patchState({modifiableSubjects: subjects});
    }

    @Action(FetchSubjects)
    fetchSubjects({ patchState}: StateContext<ModifyScheduleModel>){
        return this.httpService.getSubjectsNew().subscribe((v)=>{
                patchState({modifiableSubjects: v.subjects, serverSubjects: v.subjects});
            },
        );
    }

    @Action(InitState)
    ngxsOnInit(ctx: StateContext<ModifyScheduleModel>){
        ctx.dispatch(new FetchSubjects())
        ctx.dispatch(new FetchSchedule());
    }

    @Selector()
    static getSelectedDay(state: ModifyScheduleModel) {
        return state.chosenDay;
    }

    @Action(UpdateChosenDay)
    updateChosenDay({patchState}: StateContext<ModifyScheduleModel>, {payload}: UpdateChosenDay) {
        patchState({chosenDay: payload});
    }

    @Selector()
    static getChosenSchedule(state: ModifyScheduleModel) {
        let days = AllDays;
        let day: Day = days[state.chosenDay];
        let dailySch = state.schedule[day.index];
        let ds = new DailySchedule();

        return Object.assign(ds, dailySch);
    }

    @Action(AddLessonToDailySchedule)
    addLesson({getState, patchState}:StateContext<ModifyScheduleModel>, { lesson }: AddLessonToDailySchedule){
        let day = AllDays[getState().chosenDay];
        let dailySch: DailySchedule = getState().schedule[day.index];
        let newObj = new DailySchedule();
        newObj.allLessons = [...dailySch.allLessons];
        newObj.addLesson(lesson);
        newObj.sort();
        let newShc = getState().schedule;
        newShc[day.index] = newObj
        patchState({schedule: newShc})
    }
    
    @Action(DeleteLessonFromDailySchedule)
    deleteLesson({getState, patchState}:StateContext<ModifyScheduleModel>, {lesson}: DeleteLessonFromDailySchedule) {
        let day = AllDays[getState().chosenDay];
        let dailySch: DailySchedule = getState().schedule[day.index];
        let newObj = new DailySchedule();
        newObj.allLessons = [...dailySch.allLessons];
        newObj.removeLesson(lesson);
        let newShc = getState().schedule;
        newShc[day.index] = newObj
        patchState({schedule: newShc})
    }

    @Action(SendSubjectUpdateToServer)
    sendupdatedSubjectsToServer({getState}: StateContext<ModifyScheduleModel>) {
        let forUpdate = [];
        let {modifiableSubjects, serverSubjects} = getState();
        for(let i = 0; i < modifiableSubjects.length; i++) {
            let serverSubject = findSubjectById(modifiableSubjects[i].id, serverSubjects);
            if(serverSubject != undefined && serverSubject.name != modifiableSubjects[i].name) {
                forUpdate.push(modifiableSubjects[i])
            }
        }
        if (forUpdate.length > 0) {
            return this.httpService.updateSubjects(forUpdate)
        }
    }

    @Action(CreateSubjectsServer)
    sendNewSuubjectsToServer({getState}: StateContext<ModifyScheduleModel>) {
        let { modifiableSubjects } = getState();
        let newSubjects = [];
        for(let i= 0; i < modifiableSubjects.length; i++) {
            if (modifiableSubjects[i].id == undefined) {
                newSubjects.push(modifiableSubjects[i]);
            }
        }
        if(newSubjects.length>0) {
            return this.httpService.createSubjects(newSubjects);
        }
    }

    @Action(DeleteSubjectsServer)
    sendDeletedSubjectsIDsToServer({getState}: StateContext<ModifyScheduleModel>) {
        let {modifiableSubjects, serverSubjects} = getState();
        let toDelete = [];
        for(let i = 0;i < serverSubjects.length; i++) {
            if (findSubjectById(serverSubjects[i].id, modifiableSubjects)== undefined) {
                toDelete.push(serverSubjects[i].id);
            }
        }
        if (toDelete.length > 0) {
            return this.httpService.deletSubjects(toDelete);
        }
    }

    @Action(AllModifiedSubjectsServer)
    startAllSubjectsProcedures({getState, dispatch}: StateContext<ModifyScheduleModel>) {
        let {modifiableSubjects, serverSubjects} = getState();

        if(modifiableSubjects != serverSubjects) {

            return combineLatest( //this starts the observable at the same time than waits for all of them to finish
                dispatch(new CreateSubjectsServer),
                dispatch(new DeleteSubjectsServer),
                dispatch(new SendSubjectUpdateToServer),
                (create, del, update)=>{
                    console.log(create, del, update);
                    return {create, del, update}
                    }
                ).pipe(mergeMap((result)=> {
                    console.log(result);
                    return dispatch(new FetchSubjects)
                    }))
        }
    }

    @Selector()
    static getSchedule(state: ModifyScheduleModel){
        return state.schedule;
    }

    @Action(UpdateSchdeule)
    updateSchedule({getState}: StateContext<ModifyScheduleModel>){
        return this.httpService.putSchedule(getState().schedule).subscribe(v=>{
            console.log(v); 
            this.zone.run(() => {
                if(this.storageService.isDesktop()){
                    this.router.navigate(["/desktop/schedule"]);      
                }else{
                    this.router.navigate(["schedule"]);
                }
            })
            return v;
        });
    }

    @Action(FetchSchedule)
    fetchSchedule({patchState}: StateContext<ModifyScheduleModel>){
        this.httpService.getNewSchedule().subscribe((v)=>{
            let s = new Schedule()
            console.log(v);
            console.log("from fetch", v.schedule)
            Object.assign(s, v.schedule);
            console.log(s);
            patchState({schedule: s})
        })
    }
}

function findSubjectById(id: string, subjects: Subject[]): Subject {
    for(let i = 0; i < subjects.length; i++) {
        if (subjects[i].id == id) {
            return subjects[i];
        }
    }
    return undefined;
}