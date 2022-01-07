import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:String = 'Performance Cockpit';
  home:Boolean = true;
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        if (e.url === "/") {
            this.home = true;
        } else {
            this.home = false;
        }
      }
    })
  }
  gohome(){
    this.router.navigateByUrl("/");
  }
}
