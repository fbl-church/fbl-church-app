import { Component, OnInit } from '@angular/core';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';

@Component({
  selector: 'ik-home-image',
  templateUrl: './home-image.component.html',
  styleUrls: ['./home-image.component.scss'],
})
export class HomeImageComponent implements OnInit {
  name: string;

  constructor(private jwt: JwtService) {}

  ngOnInit() {
    this.name = this.jwt.get('firstName');
  }
}
