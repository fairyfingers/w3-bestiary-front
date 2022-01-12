import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { Monster, MonstersByCategory } from 'src/app/models/monster/monster';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class MonstersService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  getMonster(code: string) {
    const { lang } = this._localStorageService;

    const cached = this._findMonsterByLang(lang, code);
    if (cached) {
      return of(cached);
    }
    
    return this
      ._httpClient
      .get<Monster>(
        `http://localhost:3000/api/monster/search?code=${code}&lang=${lang}`
      ).pipe(
        tap(
          monster => this
            ._localStorageService
            .addMonsterToCache(monster)
        )
      );
  }

  getMonstersByCategories() {
    const { lang } = this._localStorageService;

    const cached = this._findMonstersByCategoriesByLang(lang);
    if (cached) {
      return of(cached);
    }
    
    return this
      ._httpClient
      .get<MonstersByCategory[]>(
        `http://localhost:3000/api/monster?lang=${lang}`
      )
      .pipe(
        tap(
          monstersByCategories => this
            ._localStorageService
            .addMonstersByCategoriesToCache(monstersByCategories)
        )
      );
  }

  private _findMonstersByCategoriesByLang(lang: string): MonstersByCategory[] | undefined {
    try {
      return this
      ._localStorageService
      .monstersByCategoriesByLang
      .find(
        cached => cached.lang === lang
      )
      ?.monsters;

    } catch (e: unknown) {
      return undefined;
    }
  }

  private _findMonsterByLang(lang: string, code: string): Monster | undefined {
    try {
      const match = this
      ._localStorageService
      .monstersByLang
      .find(
        cached => cached.lang === lang
      )
      ?.monsters
      .find(
        monster => monster.code === code
      );
      return match;
      
    } catch (e: unknown) {
      return undefined;
    }
  }
}