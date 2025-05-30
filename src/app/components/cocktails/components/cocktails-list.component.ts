import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cocktail } from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktails-list',
  imports: [FormsModule],
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <input
      [(ngModel)]="filter"
      type="text"
      class="mb-20 w-full"
      placeholder="Chercher un cocktail"
    />
    <ul class="mb-20">
      @for (cocktail of filteredCocktails(); track cocktail.name) { @let active =
      cocktail.name === selectedCocktailName();
      <li
        [class.active-item]="active"
        [class.active-primary]="active"
        (click)="selectCocktail.emit(cocktail.name)"
        class="px-12 py-6 my-2 radius"
      >
        <h3>{{ cocktail.name }}</h3>
      </li>
      }
    </ul>
    <button class="btn btn-primary">Ajouter un cocktail</button>
  `,
  styles: `
  li:hover {
    cursor: pointer;
    background-color: var(--light);
    transition: all 0.4s;
  }
  `,
})
export class CocktailsListComponent {
  filter = signal('');
  cocktails = input<Cocktail[]>();
  filteredCocktails = computed(() =>
    this.cocktails()?.filter(({ name }) =>
      name.toLowerCase().includes(this.filter().toLowerCase())
    )
  );
  selectedCocktailName = input.required();
  selectCocktail = output<string>();
}
