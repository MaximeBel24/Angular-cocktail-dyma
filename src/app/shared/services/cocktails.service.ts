import { Injectable, resource } from '@angular/core';
import { Cocktail } from '../interfaces';
import { httpResource } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  BASE_URL = 'https://restapi.fr/api/acocktails';

  // cocktailsResource = resource({
  //   loader: async (): Promise<Cocktail[]> =>
  //     (await fetch(this.BASE_URL)).json(),
  // });

  cocktailsResource = httpResource<Cocktail[]>(() => ({
    url: this.BASE_URL,
    defaultValue: [],
    params: { delay: 1 },
  }));
}
