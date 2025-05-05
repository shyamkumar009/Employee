import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';import { EmployeeChatComponent } from './components/employee-chat/employee-chat.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
// import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
// import { UserLoginComponent } from './pages/user-login/user-login.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: '', component: EmployeeCardComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'admin-login', component: AdminLoginComponent }, // ✅ Add this
  // { path: 'user-login', component: UserLoginComponent },   // ✅ And this
  { path: 'card', component: EmployeeCardComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'crud', component: EmployeeTableComponent },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: 'message', component: EmployeeChatComponent },
  { path: '**', component: EmployeeCardComponent}
  // { path: 'employee-details', component: EmployeeDetailsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
