import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {
  employees: Employee[] = [];
  // filteredEmployees: Employee[] = [];
  searchText = '';

  filteredEmployees$!: Observable<Employee[]>;
  constructor(private employeeService: EmployeeService) {}


  ngOnInit() {
    this.filteredEmployees$ = this.employeeService.getEmployees();
    //console.log( firstValueFrom(this.filteredEmployees$));
    this.loadEmployees();
  }
  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees$ = of(data); // show all initially
    });
  }
  
  

  search() {
    const text = this.searchText.toLowerCase().trim();
  
    const filtered = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(text) ||
      emp.email.toLowerCase().includes(text) ||
      emp.skills.join(',').toLowerCase().includes(text)
    );
  
    this.filteredEmployees$ = of(filtered);
  }
}
