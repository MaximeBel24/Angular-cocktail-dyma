import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer.component';
import { CocktailsComponent } from './components/cocktails/cocktails.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, CocktailsComponent],
  template: `
    <app-header />
    <app-cocktails class="flex-auto" />
    <app-footer />
  `,
  styles: `
    :host {
      min-height: 100vh;
      display:flex;
      flex-direction:column;
    }
 `,
})
export class AppComponent {}