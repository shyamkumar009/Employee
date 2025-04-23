import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeId: string | null = null;
  employee: Employee = new Employee();

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    // Capture the 'id' from the route parameter
    this.employeeId = this.route.snapshot.paramMap.get('id');
    console.log('Editing Employee ID:', this.employeeId);
    
    if (this.employeeId) {
      // Fetch employee data using this employeeId
      this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
        this.employee = { ...employee }; // Prefill the form with the employee data
      });
    }
  }

  save(): void {
    if (this.employeeId) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        alert('Employee updated successfully');
        this.router.navigate(['/card']);
        // Redirect to another page if needed
      });
    }
  }
}
