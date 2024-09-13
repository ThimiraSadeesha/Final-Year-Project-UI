import {Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest, PaginationResponse} from "../../core";
import {BehaviorSubject} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CheckJobCard, JobCardSearchResultDTO} from "../interface/plan-card.entity";
import {tap} from "rxjs/operators";
import {JobCardResultDTO} from "../interface/job-card.entity";

@Injectable({
    providedIn: 'root'
})
export class PlanCardService extends CachedAPIRequest {

    private readonly $all = new BehaviorSubject<JobCardSearchResultDTO[]>([])
    all = toSignal(this.$all, {initialValue: []})

    private readonly $active = new BehaviorSubject<JobCardResultDTO | undefined>(undefined)
    active = toSignal(this.$active, {initialValue: undefined})

    private readonly $statistics = new BehaviorSubject<any>(undefined)
    stat = toSignal(this.$statistics, {initialValue: undefined})

    // constructor(protected override http: HttpClient, private router: Router) {
    //     super(http, APIRequestResources.PlanCardService)
    // }

    find = (searchParams: any, refresh = true) => {
        return this.get<PaginationResponse<JobCardSearchResultDTO[]>>({
            endpoint: `/find`,
            params: searchParams,
        }, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => {
                    if (res.data && res.data.data) {
                        this.$all.next(res.data.data);
                    } else {
                        this.$all.next([]);
                    }
                }),
                tap((res) => {
                    if (res.data) {
                        const {data, ...obj} = res.data;
                        this.$statistics.next(obj);
                    } else {
                        this.$statistics.next(undefined);
                    }
                })
            );
    }

    create = (jobCard: any) => {
        return this.post<any>(jobCard, {}).pipe(
            tap(() => {
                this.$all.next([]);
                this.notifyJobUpdated();
            })
        );
    }

    update = (jobId: number, inventoryDetails: any) => {
        const options = {suffix: jobId.toString()};
        return this.put<any>(inventoryDetails, options).pipe(
            tap(() => {
                this.notifyJobUpdated();
            })
        );
    }

    getById = (id: string, refresh= true) => {
        return this.get<JobCardResultDTO>({id}, refresh ? 'freshness' : 'performance')
            .pipe(
                tap((res) => this.$active.next(res.data)),
            )
    }

    initial() {
        this.$active.next(undefined);
        this.notifyJobUpdated();
    }


    check = (name: any, refresh= true) => {
        return this.get<CheckJobCard>({
            endpoint: `check`,
            params: {name},
        }, refresh ? 'freshness' : 'performance')
            .pipe(
                // tap((res) => this.$statistics.next(res.data)),
            )
    }
    private jobUpdatedSource = new BehaviorSubject<void>(undefined);
    jobUpdated$ = this.jobUpdatedSource.asObservable();

    private notifyJobUpdated() {
        this.jobUpdatedSource.next();
    }

}

