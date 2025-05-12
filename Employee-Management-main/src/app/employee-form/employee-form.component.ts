import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { Router , ActivatedRoute} from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Only valid modules/components here
  providers: [EmployeeService],         // ✅ Provide services here if needed
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']  // also fix: styleUrl ➝ style**s**Url
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
  };

  isEditing: boolean = false;

  errorMessage: string = '';

  constructor(private employeeService: EmployeeService , 
    private router : Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if (id){
        //editing employee
        this.isEditing = true;

        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next: (result) => this.employee = result,
          error : (err) => this.errorMessage = `Error: ${err.status} - ${err.message}`,
        })
      
      }
        });
      }
    
  
   
   

  onSubmit() {

    if(this.isEditing) {
      this.employeeService.editEmployee(this.employee)
      .subscribe({
        next: ()=>{
            this.router.navigate(['/']);
        },
        error:(err) => {
           console.error(err);
           this.errorMessage=`Error occured during updating: ${err.status}- ${err.message}`;
        }
      })
  }

    
    
    else{
      //creating employee
      this.employeeService.createEmployee(this.employee)
      .subscribe({
        next: ()=>{
            this.router.navigate(['/']);
        },
        error:(err) => {
           console.error(err);
           this.errorMessage=`Error occured during creating: ${err.status}- ${err.message}`;
        }
      })
  }

    }



    


}
