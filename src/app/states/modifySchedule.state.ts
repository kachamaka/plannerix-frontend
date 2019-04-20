import { ConstantDuration, Schedule } from "../models/modifySchedule.model";
import { Subject } from "../models/subject.model";
import { State, Action, StateContext, Selector, InitState } from "@ngxs/store";
import { AddSubject, FetchSubjects, RemoveSubject, UpdateSubject } from "../actions/modifySchedule.action";
import { HttpService } from "../shared/http.service";

import { tap } from 'rxjs/operators';

export interface ModifyScheduleModel {
    modifiableSubjects: Subject[],
    serverSubjects: Subject[],
    schedule: Schedule,
    constantLessonDuration: ConstantDuration,
}

@State<ModifyScheduleModel>({
    name: "modifySchedule",
    defaults: {
        modifiableSubjects: [],
        serverSubjects: [],
        schedule: new Schedule,
        constantLessonDuration: undefined
    }
})
export class ModifyScheduleState {

    constructor(private httpService: HttpService) {}

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
        return this.httpService.getSubjectsNew().pipe(
            tap(subjects=>{
                patchState({modifiableSubjects: subjects, serverSubjects: subjects});
            }),
        );
    }

    @Action(InitState)
    ngxsOnInit(ctx: StateContext<ModifyScheduleModel>){
        ctx.dispatch(new FetchSubjects())
    }


}
