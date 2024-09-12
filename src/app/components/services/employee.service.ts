import {Injectable} from "@angular/core";
import {APIRequestResources, CachedAPIRequest} from "../../core";
import {BehaviorSubject, take} from "rxjs";
import {EmployeeResultDTO} from "../interface/employee.entity";
import {toSignal} from "@angular/core/rxjs-interop";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {handleError} from "../../core/util/util";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CachedAPIRequest {

  private readonly $all = new BehaviorSubject<EmployeeResultDTO[]>([])
  all = toSignal(this.$all, {initialValue: []})


  constructor(protected override http: HttpClient, private router: Router) {
    super(http, APIRequestResources.EmployeeService)
    this.getAll().pipe(take(1)).subscribe()
  }


  getAll(refresh = false) {
    return this.get<EmployeeResultDTO[]>({}, refresh ? 'freshness' : 'performance')
      .pipe(
        tap(res => this.$all.next(res.data?? [])),
        catchError(handleError)
      )
  }

}
