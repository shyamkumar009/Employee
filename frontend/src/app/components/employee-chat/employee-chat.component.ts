import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-chat.component.html',
  styleUrls: ['./employee-chat.component.css']
})

export class EmployeeChatComponent implements OnInit {
   messages: string[] = [];
   employee$?: Observable<Employee>;
   newMessage: string = '';


constructor(
  private route: ActivatedRoute,
  private EmployeeService: EmployeeService,
  private router: Router,
  private http: HttpClient
) {}

ngOnInit(): void {
  this.employee$ = this.EmployeeService.getEmployeeById(this.route.snapshot.params['id']);
}
sendMessage(message: string): void {
  this.messages.push(message);
  if (!this.employee$) {
    console.error('Employee observable is undefined');
    return;
  }

  this.employee$.subscribe(employee => {
    if (!employee) {
      console.error('Employee is undefined');
      return;
    }
    const payload = {
      to: employee.email,
      subject: `Message from HR`,
      text: message
    };

    this.http.post('http://localhost:5000/api/message', payload)
      .subscribe({
        next: () => alert('Email sent successfully'),
        error: err => console.error('Failed to send email', err)
      });
  });
}
}
