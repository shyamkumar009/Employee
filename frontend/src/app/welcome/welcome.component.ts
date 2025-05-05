import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [RouterModule],
  standalone:true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
