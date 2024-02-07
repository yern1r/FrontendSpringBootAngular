import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Employee} from './employee'
import { environment } from "../environments/environment";

//entire angular app know about this service by injecting it here
//then providing in root
@Injectable({
    providedIn: 'root'
})

//creating a function - reach backend to do some work
export class EmployeeService{

    //Define url
    private apiServerUrl = environment.apiBaseurl;

    //HttpClient for creating http request
    constructor(private http: HttpClient){ }

    //return Observable<T> 
    public getEmployees(): Observable<Employee[]>{
        //calling http to make get request
        //define return type < >
        //url
        return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
    }

    //function tells http client where to make the request 
    //and the type of request to make
    //and it is a get request we do not need to pass anything
    public addEmployees(employee : Employee): Observable<Employee>{
        return this.http.post<Employee>(`${this.apiServerUrl}/employee/all` , employee);
    }

    public updateEmployees(employee : Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update` , employee);
    }

    public deleteEmployees(employeeId : number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }
}