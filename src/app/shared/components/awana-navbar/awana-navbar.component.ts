import { Component, OnInit } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-awana-navbar',
  templateUrl: './awana-navbar.component.html',
  styleUrls: ['./awana-navbar.component.scss'],
})
export class AwanaNavbarComponent implements OnInit {
  profileIcon = faCircleUser;
  constructor() {}

  ngOnInit(): void {}
}
