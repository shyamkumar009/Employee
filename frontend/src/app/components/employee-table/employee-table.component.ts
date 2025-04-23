import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  employee$!: Observable<Employee>;
  newEmployee: Employee = new Employee();
  editMode: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();  // Load all employees when the component initializes
  }

  goBack(): void {
    this.router.navigate(['/card']);
  }

  // Load all employees
  loadEmployees() {
    this.employees$ = this.employeeService.getEmployees();  // Fetch all employees
  }

  // Save new or updated employee
  save(): void {
    if (this.editMode) {
      // If we're in edit mode, update the employee
      this.employeeService.updateEmployee(this.newEmployee).subscribe(() => {
        this.resetForm();
        alert("Employee updated successfully");
        this.loadEmployees();  // Reload employees after update
      });
    } else {
      // If we're adding a new employee, use addEmployee method
      this.employeeService.addEmployee({ ...this.newEmployee }).subscribe(() => {
        this.resetForm();
        alert("Employee added successfully");
        this.router.navigate(['./card'])
        this.loadEmployees();  // Reload employees after add
      });
    }
  }

  // Edit existing employee
  edit(emp: Employee): void {
    console.log('Editing employee:', emp);  // Check if it's being triggered
    this.newEmployee = { ...emp };  // Fill the form with existing employee data
    this.editMode = true;  // Set edit mode to true
  }

  // Delete employee by ID
  delete(id: number): void {
    console.log('Deleting employee with id:', id);  // Check if the ID is passed correctly
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();  // Reload employees after deletion
    });
  }

  // Reset the form to add a new employee
  resetForm(): void {
    this.newEmployee = new Employee();
    this.newEmployee.bio = '';  // Reset bio to an empty string
    this.editMode = false;
  }
}
