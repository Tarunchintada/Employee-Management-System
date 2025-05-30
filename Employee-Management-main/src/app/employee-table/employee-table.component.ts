import { Component , OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-table',
  imports: [FormsModule,CommonModule],
  providers: [EmployeeService],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit {

  employees: Employee[]=[];

  constructor(private employeeService: EmployeeService , private router : Router){}

  ngOnInit():void{
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next:(response) =>{
        this.employees= this.employees.filter(e => e.id !== id);

      },
      error: (err) => {
        console.error('Error deleting employee:', err);
      }


    })
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }
  
  
  }

