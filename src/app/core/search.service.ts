import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  readonly isModalOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');

  open(): void {
    this.isModalOpen.set(true);
  }

  close(): void {
    this.isModalOpen.set(false);
    this.searchQuery.set('');
  }

  toggle(): void {
    if (this.isModalOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  setQuery(query: string): void {
    this.searchQuery.set(query);
  }
}
