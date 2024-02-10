import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;
  //defined , binding the 'editEmployee'  by ngModel 
  //then gave reference to forum - so we can access the value from forum
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

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
        console.log(this.employees);
      }, 
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public searchEmployee(key: string): void {
    console.log(key);
    const results: Employee[] = [];
     for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ){
        results.push(employee);
      }
     }
     this.employees = results;
     if(results.length === 0 && !key){
      this.getEmployees();
     }
  }

  public onAddEmployee(addForm : NgForm) : void { 

    document.getElementById('add-employee-form').click();
      //the value of the form is going to be 
      //a json representation of every single one of these inputs 
      // with those names attributes

      //subscribe in order to be notified something comes from backend
    this.employeeService.addEmployees(addForm.value).subscribe(
      (response : Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      }, 
      (error : HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee : Employee) : void { 
    this.employeeService.updateEmployees(employee).subscribe(
      (response : Employee) => {
        console.log(response);
        this.getEmployees();
      }, 
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId : number ) : void { 
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response : void) => {
        console.log(response);
        this.getEmployees();
      }, 
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee : Employee, mode : string) : void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    //if it is on edit
    else if(mode === 'edit'){
      //we say this.employee on this class which is binding 
      //make it employee  when they click on
      //because there will be iteration for every single one of the employees
      //when clicked onOpenModal - gonna pass in the employee for actual iteration
      //so this employee will always be set 
      //we bind editEmployee to form so we have access to value 
      //- which represent json format of employee
      //then we gonna pass it into updateEmployee
      //hidden attributes - needs for to be complete 
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
