import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { CharacterAPIService } from "./services/character.service";

import { AppComponent } from "./app.component";
import { CharacterListComponent } from "./character-list/character-list.component";
import { CharacterComponent } from "./character-list/character/character.component";
import { FilmComponent } from "./character-list/film/film.component";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterComponent,
    FilmComponent
  ],
  imports: [BrowserModule, HttpClientModule, NoopAnimationsModule],
  providers: [CharacterAPIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
