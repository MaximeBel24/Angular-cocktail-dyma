import { Component, computed, inject, signal } from '@angular/core';
import { CocktailsListComponent } from './components/cocktails-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details.component';
import { Cocktail } from 'app/shared/interfaces';
import { CocktailsService } from 'app/shared/services/cocktails.service';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'app-cocktails',
  imports: [CocktailsListComponent, CocktailDetailsComponent],
  template: `
    @if (cocktailsIsLoading()) {
    <h2>Chargement en cours...</h2>
    } @else {
    <app-cocktails-list
      [(selectedCocktailId)]="selectedCocktailId"
      [likedCocktailIds]="likedCocktailIds()"
      (likeCocktail)="likeCocktail($event)"
      (unlikeCocktail)="unlikeCocktail($event)"
      [cocktails]="cocktails()"
      class="w-half card"
    />
    @let sc = selectedCocktail(); @if (sc) {
    <app-cocktail-details
      (likeCocktail)="likeCocktail($event)"
      (unlikeCocktail)="unlikeCocktail($event)"
      [cocktail]="sc"
      [isLiked]="selectedCocktailLiked()"
      class="w-half card"
    />
    } }
  `,
  styles: `
    :host {
      display: flex;
      gap:24px;
      padding: 24px;

      @media screen and (max-width: 820px) {
        flex-direction: column;
      }
    }
  `,
})
export class CocktailsComponent {
  cocktailsService = inject(CocktailsService);
  cartService = inject(CartService);

  cocktails = computed(
    () => this.cocktailsService.cocktailsResource.value() || []
  );
  selectedCocktailId = signal<string | null>(null);
  selectedCocktail = computed(() =>
    this.cocktails().find(({ _id }) => _id === this.selectedCocktailId())
  );

  selectedCocktailLiked = computed(() => {
    const selectedCocktailId = this.selectedCocktailId();
    return selectedCocktailId
      ? this.likedCocktailIds().includes(selectedCocktailId)
      : false;
  });

  likedCocktailIds = computed(() => this.cartService.likeCocktailIds());

  likeCocktail(cocktailId: string) {
    this.cartService.likeCocktail(cocktailId);
  }

  unlikeCocktail(cocktailId: string) {
    this.cartService.unlikeCocktail(cocktailId);
  }

  cocktailsIsLoading = this.cocktailsService.cocktailsResource.isLoading;

  //Reprendre à 8min
}
