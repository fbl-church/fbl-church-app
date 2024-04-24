import { Component, HostBinding, OnInit } from '@angular/core';
import { JwtService } from '../../service/auth/jwt.service';

@Component({
  selector: 'ik-footer',
  templateUrl: 'footer.component.html',
})
export class FooterComponent implements OnInit {
  @HostBinding('class.app-footer') hostClass = true;

  authenticated = false;
  constructor(private readonly jwt: JwtService) {}

  ngOnInit() {
    this.authenticated = this.jwt.isAuthenticated();
  }
}
