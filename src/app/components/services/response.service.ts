import {Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest} from "../../core";
import {BehaviorSubject, catchError, take, tap} from "rxjs";
import {JobCardSearchResultDTO} from "../interface/plan-card.entity";
import {toSignal} from "@angular/core/rxjs-interop";
import {JobCardResultDTO} from "../interface/job-card.entity";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDTO} from "../interface/user.entity";
import {UnitDTO} from "../interface/unit.entity";
import {handleError} from "../../core/util/util";
import {Hospital, HospitalDTO} from "../interface/hospital.entity";
import {Incident, IncidentDto} from "../interface/incident.entity";


@Injectable({
    providedIn: 'root'
})
export class ResponseService extends CachedAPIRequest {

    private readonly $all = new BehaviorSubject<IncidentDto[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<Incident | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.ResponseService)

    }

    create = (hospital: any) => {
        return this.post<any>(hospital, {}).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }
}