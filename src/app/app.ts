import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { MobileDrawerComponent } from './layout/mobile-drawer/mobile-drawer.component';
import { SearchModalComponent } from './layout/search-modal/search-modal.component';
import { SearchService } from './core/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MobileDrawerComponent,
    SearchModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private searchService = inject(SearchService);
  readonly isMobileDrawerOpen = signal<boolean>(false);

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchService.toggle();
    }
    if (event.key === 'Escape' && this.searchService.isModalOpen()) {
      this.searchService.close();
    }
  }
}
