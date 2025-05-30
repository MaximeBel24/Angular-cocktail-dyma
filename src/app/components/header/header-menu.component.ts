import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  imports: [],
  template: `
    <button (click)="toggleMenu()">=</button>
    @if (show()) {
    <ul>
      @for (link of navigations; track $index) {
      <li (click)="show.set(false)" [class.mb-20]="!$last">
        <a [href]="link.path">{{ link.name }}</a>
      </li>
      }
    </ul>
    }
  `,
  styles: `
  button {
    padding: 16px;
    font-size: 24px;
    border: none;
    color: white;
    background-color: inherit;
  }
  ul {
    position: absolute;
    right: 12px;
    top: 64px;
    padding: 12px;
    border: var(--border);
    border-radius: var(--radius);
    color: var(--text-color);
    background-color: white;
  }
  `,
})
export class HeaderMenuComponent {
  show = signal(false);
  navigations = [
    {
      path: '#',
      name: 'Liste des cocktails',
    },
    {
      path: '#',
      name: 'Panier',
    },
  ];

  toggleMenu() {
    this.show.update((s) => !s);
  }
}
