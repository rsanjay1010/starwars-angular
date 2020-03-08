import { Component, OnInit, Input } from "@angular/core";
import { CharacterAPIService } from "../../services/character.service";
import { Character } from "../../model";

@Component({
  selector: "app-character",
  styleUrls: ["character.component.scss"],
  templateUrl: "character.component.html"
})
export class CharacterComponent implements OnInit {
  @Input() character: Character;
  expand = false;
  isLoading = false;

  constructor(private characterService: CharacterAPIService) {}

  ngOnInit() {}

  toggleContent() {
    this.expand = !this.expand;
    if (!this.character.films && this.expand) {
      this.isLoading = true;
      this.loadAllFilms();
    }
  }

  private loadAllFilms() {
    this.characterService.getFilmsList(this.character.url).subscribe(
      res => {
        this.character.films = res;
        this.isLoading = false;
      },
      err => {
        this.character.films = [];
        this.isLoading = false;
      }
    );
  }
}
