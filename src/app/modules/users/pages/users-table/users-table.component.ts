import { Component, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { DataSourceUser } from './data-source';
import { Users } from '@models/users.model';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers()
    .subscribe({
      next: (users) =>
        this.dataSource.init(users)
    });
  }
}
