import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  users: any[] = [];
  roles: string[] = ['Admin', 'Employee', 'User'];
  message = '';
  isError = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.accountService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: () => {
        this.isError = true;
        this.message = 'Failed to load users. Make sure you are logged in as Admin.';
      }
    });
  }

  saveRole(user: any): void {
    this.accountService.assignRole(user.id, user.role).subscribe({
      next: () => {
        this.isError = false;
        this.message = `Updated ${user.email} → ${user.role}`;
      },
      error: () => {
        this.isError = true;
        this.message = 'Failed to update role.';
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/Dashboard']);
  }
}
