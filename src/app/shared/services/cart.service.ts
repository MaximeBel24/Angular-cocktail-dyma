import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  likeCocktailIds = signal<string[]>([]);
  
  likeCocktail(cocktailId: string) {
    this.likeCocktailIds.update((likedCocktails) => [
      ...likedCocktails,
      cocktailId,
    ]);
  }

  unlikeCocktail(cocktailId: string) {
    this.likeCocktailIds.update((likedCocktails) =>
      likedCocktails.filter((id) => id !== cocktailId)
    );
  }
}
