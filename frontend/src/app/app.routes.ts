import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeChatComponent } from './components/employee-chat/employee-chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'card', pathMatch: 'full' }, // Default route, redirects to card
  { path: 'card', component: EmployeeCardComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'crud', component: EmployeeTableComponent },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: '**', redirectTo: 'card' }, // Catch-all fallback route
  { path: 'message', component: EmployeeChatComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
