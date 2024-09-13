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
import {HospitalDTO} from "../interface/hospital.entity";
import {Fire, FireDTO} from "../interface/fire.entity";
import {PoliceStation} from "../interface/police.entity";


@Injectable({
    providedIn: 'root'
})
export class FireService extends CachedAPIRequest {

    private readonly $all = new BehaviorSubject<FireDTO[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<Fire | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.FireService)
        this.getAll().pipe(take(1)).subscribe()
    }


    getAll(refresh = true) {
        return this.get<FireDTO[]>({}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap(res => this.$all.next(res.data ?? [])),
                catchError(handleError)
            )
    }

    getById = (id: string, refresh= true) => {
        return this.get<Fire>({id}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }

    initial(){
        this.$active.next(undefined)
    }

    update = (id: number, fireDetails: any) => {
        const options = {suffix: id.toString()};
        return this.put<any>(fireDetails, options).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }

    create = (fireDetails: any) => {
        return this.post<any>(fireDetails, {}).pipe(
            tap(() => {
                this.$all.next([])
            })
        );
    }

}
