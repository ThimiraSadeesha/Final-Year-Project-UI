import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  private customerDetailsSource = new BehaviorSubject<any>(null);
  customerDetails$ = this.customerDetailsSource.asObservable();

  searchProductSample = (baseUrl: string): Observable<HttpResponse<Response>> => {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<Response>(baseUrl, { params: params, observe: 'response', headers });
  }
  getDepartment = (Url: string): Observable<HttpResponse<Response>> => {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<Response>(Url, { params: params, observe: 'response', headers });
  }
  getHsCode = (hsCode: string): Observable<HttpResponse<Response>> => {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<Response>(hsCode, { params: params, observe: 'response', headers });
  }
  getCustomer = (customer: string): Observable<HttpResponse<Response>> => {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<Response>(customer, { params: params, observe: 'response', headers });
  }
  getPo = (pono: string): Observable<HttpResponse<Response>> => {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<Response>(pono, { params: params, observe: 'response', headers });
  }
  findsalesorder(
    sales_order_date?: string,
    sales_order_reference?: string,
    po_number?: string,
    customer_id?: -1,
    items_per_page?: '50',
    page_number?: '1',
  ): Observable<any> {
    // Construct the URL with query parameters
    const url = `localhost:3000/sales-order/find`;

    // Construct the query parameters
    let params = new HttpParams()
    .set('sales_order_date', sales_order_date || '')  // Set empty string if code is undefined
    .set('sales_order_reference', sales_order_reference || '')
    .set('po_numberv', po_number || '')
    .set('customer_id', customer_id || '')
    .set('page', page_number !== undefined ? page_number.toString() : '')
    .set('limit', items_per_page !== undefined ? items_per_page.toString() : '');
    return this.httpClient.get(url, { params });
  }
  // findSalesOrder(
  //   salesOrderDate: string,
  //   salesOrderReference: string,
  //   poNumber: string,
  //   customer_id: number,
  //   itemsPerPage: number,
  //   pageNumber: number
  // ): Observable<any> {
  //   // Construct the URL with query parameters
  //   const url = 'http://localhost:3000/sales-order/find';

  //   // Construct the query parameters
  //   const params = new HttpParams()
  //     .set('sales_order_date', salesOrderDate || '')
  //     .set('sales_order_reference', salesOrderReference || '')
  //     .set('po_number', poNumber || '')
  //     .set('customer_id', customer_id.toString())
  //     .set('page', pageNumber.toString())
  //     .set('limit', itemsPerPage.toString());

  //   return this.httpClient.get(url, { params });
  // }
  getCustomerDetailsById(customerId: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/customer/${customerId}`);
  }
}
