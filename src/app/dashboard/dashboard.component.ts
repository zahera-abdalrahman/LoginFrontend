import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { DashboardService } from '../Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  userName = '';

  loading = true;
  error = false;

  stats = { users: 0, posts: 0, comments: 0, todos: 0 };

  completedTodos = 0;
  pendingTodos = 0;
  completionPercent = 0;

  users: any[] = [];
  recentPosts: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private dashboard: DashboardService
  ) {}

  ngOnInit(): void {
    this.role = this.auth.getRole();

    const stored = localStorage.getItem('SocialMediaUser');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        this.userName = user.firstName || user.email || '';
      } catch {
        this.userName = '';
      }
    }

    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.dashboard.getAll().subscribe({
      next: res => {
        this.stats.users = res.users.length;
        this.stats.posts = res.posts.length;
        this.stats.comments = res.comments.length;
        this.stats.todos = res.todos.length;

        this.completedTodos = res.todos.filter((t: any) => t.completed).length;
        this.pendingTodos = res.todos.length - this.completedTodos;
        this.completionPercent = res.todos.length
          ? Math.round((this.completedTodos / res.todos.length) * 100)
          : 0;

        this.users = res.users.slice(0, 6);
        this.recentPosts = res.posts.slice(0, 5);

        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  get isAdmin(): boolean {
    return this.role === 'Admin';
  }

  get donutBackground(): string {
    return `conic-gradient(#6366f1 ${this.completionPercent}%, #e5e7eb 0)`;
  }

  goToRoles(): void {
    this.router.navigate(['/Roles']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
