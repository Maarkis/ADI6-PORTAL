import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {environment} from '../../environments/environment';
import {BaseResponse} from '../models/response/base-response';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly urlAPI = environment.urlAPI + '/Product';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<BaseResponse<Product[]>> {
        return this.http.get<BaseResponse<Product[]>>(`${this.urlAPI}`);
    }

    public getById(id: string): Observable<BaseResponse<Product>> {
        return this.http.get<BaseResponse<Product>>(`${this.urlAPI}/${id}`);
    }

    public put(product: Product): Observable<BaseResponse<Product>> {
        return this.http.put<BaseResponse<Product>>(`${this.urlAPI}`, product);
    }

    public post(product: Product): Observable<BaseResponse<Product>> {
        return this.http.post<BaseResponse<Product>>(`${this.urlAPI}`, product);
    }

    public delete(id: string): Observable<BaseResponse<boolean>> {
        return this.http.delete<BaseResponse<boolean>>(`${this.urlAPI}/${id}`);
    }

}
