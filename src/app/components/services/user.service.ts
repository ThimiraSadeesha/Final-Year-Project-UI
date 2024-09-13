import {Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest} from "../../core";
import {BehaviorSubject, catchError, take, tap} from "rxjs";
import {JobCardSearchResultDTO} from "../interface/plan-card.entity";
import {toSignal} from "@angular/core/rxjs-interop";
import {JobCardResultDTO} from "../interface/job-card.entity";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDataDTO, UserDTO} from "../interface/user.entity";
import {UnitDTO} from "../interface/unit.entity";
import {handleError} from "../../core/util/util";
import {Hospital} from "../interface/hospital.entity";


@Injectable({
    providedIn: 'root'
})
export class UserService extends CachedAPIRequest {

    private readonly $all = new BehaviorSubject<UserDTO[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<UserDataDTO | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})



    constructor(protected override http: HttpClient, private router: Router) {
        super(http, APIRequestResources.UserService)
        this.getAll().pipe(take(1)).subscribe()
    }

    getAll(refresh = true) {
        return this.get<UserDTO[]>({}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap(res => this.$all.next(res.data ?? [])),
                catchError(handleError)
            )
    }

    getById = (id: string, refresh= true) => {
        return this.get<UserDataDTO>({id}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }




}
