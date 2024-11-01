import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './components/editor.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  
  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['/home']);
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.route.navigate(['/login']);
  }
}
