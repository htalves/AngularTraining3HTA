import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string | undefined;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.title.subscribe(title => this.title = title);
  }
}
