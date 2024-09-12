import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {APIRequestResources, CachedAPIRequest} from "../../core";
import {catchError, take, tap} from "rxjs";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {toSignal} from "@angular/core/rxjs-interop";
import {handleError} from "../../core/util/util";
import {UnitDTO} from "../interface/unit.entity";


@Injectable({
    providedIn: 'root'
})
export class UnitService extends CachedAPIRequest {

    private readonly $all = new BehaviorSubject<UnitDTO []>([]);
    all = toSignal(this.$all, {initialValue: []});


    constructor(protected override http: HttpClient) {
        super(http, APIRequestResources.UnitService);
        this.getAll().pipe(take(1)).subscribe()
    }

    getAll(refresh = true) {
        return this.get<UnitDTO[]>({}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap(res => this.$all.next(res.data ?? [])),
                catchError(handleError)
            )
    }


}
