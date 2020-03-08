import { Component, OnInit } from '@angular/core';

import { CharacterAPIService } from '../services/character.service';
import { Character } from '../model';

@Component({
  selector: 'app-character-list',
  styleUrls: ['character-list.component.css'],
  templateUrl: 'character-list.component.html'
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  constructor(private characterService: CharacterAPIService) {}
  ngOnInit() {
    this.loadAllCharacters();
  }

  private loadAllCharacters() {
    this.characterService.getAll().subscribe((data: any) => {
      if (data && data.characters) {
        this.characters = data.characters;
      }
    });
  }
}
