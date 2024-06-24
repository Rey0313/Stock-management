import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        display: 'block',
        transform: 'translateY(0)'
      })),
      state('closed', style({
        opacity: 0,
        display: 'none',
        transform: 'translateY(-20px)'
      })),
      transition('closed => open', [
        animate('0.5s ease')
      ]),
      transition('open => closed', [
        animate('0.5s ease')
      ])
    ]),
  ],
})
export class HeaderComponent {
  users: any[] = [];
  isScrolled = false;
  isCollapsed = true;
  userId: string | null = null;

  constructor(library: FaIconLibrary, private authService: AuthService, private router: Router) {
    library.addIcons(faBars, faTimes);
    this.userId = this.authService.getUserId();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  closeMenu() {
    this.isCollapsed = true;
    document.body.style.overflow = 'auto';
  }

  logout() {
    this.authService.logout();
    if(!this.isCollapsed) {
      this.isCollapsed = !this.isCollapsed;
      document.body.style.overflow = 'auto';
    }
    this.router.navigate(['/login']);
  }

  updateUserProfile() {
    if (this.userId) {
      this.router.navigate([`/update-user/${this.userId}`]);
      this.closeMenu();
    }
  }
}
