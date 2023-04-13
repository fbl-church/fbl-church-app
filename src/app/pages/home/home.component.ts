import { Component, OnInit } from '@angular/core';
import { default as json } from 'projects/insite-kit/src/assets/translations/applications/en.json';
import { App } from 'projects/insite-kit/src/models/app.model';
import { JwtService } from 'projects/insite-kit/src/service/jwt-service/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apps: App[] = new Array();
  name: string;

  constructor(private jwt: JwtService) {}

  ngOnInit() {
    this.name = this.jwt.get('firstName');
    this.buildApps();
  }

  buildApps() {
    const data = Object.values(json)[1];
    this.jwt.get('apps').forEach((v: string) => this.apps.push(data[v]));
  }
}
