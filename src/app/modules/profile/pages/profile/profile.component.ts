import { Component, OnInit } from '@angular/core';
import { Users } from '@models/users.model';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit{
  profile!: Users | null;

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getProfile().subscribe({
      next: (response) => this.profile = response
    })

    this.usersService.user$.subscribe({
      next: (profile) => {
        this.profile = profile
      }
    })
  }
}
