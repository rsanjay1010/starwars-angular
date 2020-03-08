import { Component, OnInit, Input } from "@angular/core";

import { Film } from "../../model";

@Component({
  selector: "film",
  styleUrls: ["film.component.scss"],
  templateUrl: "film.component.html"
})
export class FilmComponent {
  @Input() data: Film;

  constructor() {}
}
