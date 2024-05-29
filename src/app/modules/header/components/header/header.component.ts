import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
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
  isScrolled = false;
  isCollapsed = true;

  constructor(library: FaIconLibrary) {
    library.addIcons(faBars, faTimes);
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
}
