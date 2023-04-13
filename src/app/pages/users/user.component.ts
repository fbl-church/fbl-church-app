import { Component, OnInit } from '@angular/core';
import { User } from 'insite-kit';
import { UserService } from 'src/service/user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  dataloader: User[];

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => (this.dataloader = res));
  }

  onSearch(value: any) {}
}
