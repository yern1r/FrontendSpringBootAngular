import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService){ } 
  
  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void{
    //since it observable, 
    //so its gonna make request over the internet/network
    // - its gonna take a some time , thats why its returning observable  

    //so we need to subscribe to that observable  - so will be notified 
    //whenever some data comes back from the server, responses/errors 
    this.employeeService.getEmployees().subscribe(
      //here we gonna specify our response
      //if we get a response back which is a type of Employee[]
      //so we gonna execute some code
      (response: Employee[])=>{
        //set the variable to be equal to the body of request 
        //by default using a observable 
        //- its just going to give you whatever response is coming back 
        // inside that body response
        this.employees = response;
      }, 
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }
}
