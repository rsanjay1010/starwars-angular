import { Component, OnInit, Input } from "@angular/core";
//import { first } from 'rxjs/operators';

//import { Transaction } from '../../model';
import { CharacterAPIService } from "../../services/character.service";
import { Character } from "../../model";
@Component({
  selector: "character",
  styleUrls: ["character.component.scss"],
  templateUrl: "character.component.html"
})
export class CharacterComponent implements OnInit {
  @Input() character: Character;
  expand = false;
  isLoading = false;
  
  constructor(private characterService: CharacterAPIService) {}

  ngOnInit() {
    //this.toggleContent();
  }

  toggleContent() {
    this.expand = !this.expand;
    if (!this.character.films && this.expand) {
      this.isLoading = true;
      this.loadAllFilms();
    }
  }

  private loadAllFilms() {
    const a = performance.now();
    this.characterService.getFilmsList(this.character.url).subscribe(
      res => {
        this.character.films = res;
        console.log("loading:: " + res);
        this.isLoading = false;
        const c = performance.now();
        console.log("time 2:: " + (c - a));
      },
      err => {
        console.log("error");
        this.character.films = [];
        this.isLoading = false;
        console.log(this.isLoading);
      },
      () => {
        this.isLoading = false;
      }
    );
    const b = performance.now();
    console.log("time 1:: " + (b - a));
  }
}
