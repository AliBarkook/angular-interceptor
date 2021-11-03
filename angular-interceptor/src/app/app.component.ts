import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-interceptor';

  constructor(
    private userService: UserService
  ) {
    
  }

  ngOnInit() {
    console.warn('start service call');
    
    this.userService.getUsersList().subscribe(res => {
      
      console.warn('service date recieved');
    })
  }
}
