import { Component, OnInit } from '@angular/core';
import { Users } from '@models/users.model';
import { UsersService } from '@services/users.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit{
  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getProfile().subscribe();
  }

}
