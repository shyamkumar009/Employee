import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeChatComponent } from "../employee-chat/employee-chat.component";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EmployeeChatComponent],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee$?: Observable<Employee>;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.employee$ = this.employeeService.getEmployeeById(id);
  }

  goBack(): void {
    this.router.navigate(['/card']);
  }

  sendmessage(): void {
    this.router.navigate(['/'])
  }

  isChatModalOpen: boolean = false;
  toggleChatModel(){
    this.isChatModalOpen=!this.isChatModalOpen;
  }

  edit(employee: Employee): void {
    // Navigate to the employee edit page
    this.router.navigate(['/edit', employee._id]); // Assuming you have a route like /edit-employee/:id
  }

  delete(id: number): void {
    // Delete the employee
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully');
        this.router.navigate(['/card']); // Navigate back to the employee list
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
        alert('There was an error deleting the employee.');
      }
    });
  }
}
