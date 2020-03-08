import { Component, OnInit } from "@angular/core";

import { CharacterAPIService } from "../services/character.service";
import { Character } from "../model";

@Component({
  selector: "app-character-list",
  templateUrl: "character-list.component.html"
})
export class CharacterListComponent implements OnInit {
  isLoading = false;
  characters: Character[] = [];
  constructor(private characterService: CharacterAPIService) {}
  ngOnInit() {
    this.loadAllCharacters();
  }

  private loadAllCharacters() {
    this.isLoading = true;
    this.characterService.getAll().subscribe(
      data => {
        if (data && data.characters) {
          this.characters = data.characters;
        }
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }
}
