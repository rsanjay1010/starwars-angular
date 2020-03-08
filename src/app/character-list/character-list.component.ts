import { Component, OnInit } from "@angular/core";
//import { Observable } from 'rxjs/Observable';
import { first } from "rxjs/operators";
//import { NgRedux } from '@angular-redux/store';

import { CharacterAPIService } from "../services/character.service";
//import { TransactionAPIService } from '../services/transaction.service';
//import { TransactionAPIActions } from '../store/actions';
//import { Transaction } from '../model';
import { Character } from "../model";

@Component({
  selector: "character-list",
  styleUrls: ["character-list.component.css"],
  templateUrl: "character-list.component.html"
})
export class CharacterListComponent implements OnInit {
  //  currentSortKey='transactionDate';
  //  currentSortOrder='asc';
  //  transactions:Transaction[] = [];
  //  searchText = '';

  characters: Character[] = [];
  //constructor(private ngRedux: NgRedux<any>, private transactionService:TransactionAPIService, private actions:TransactionAPIActions) {}
  constructor(private characterService: CharacterAPIService) {}
  ngOnInit() {
    /*(this.ngRedux.select('transactions').subscribe((list:Transaction[]) => {
        this.transactions = list;
        console.log("list >> "+list);
      });
      this.loadAllTransactions();*/
    this.loadAllCharacters();
  }

  private loadAllCharacters() {
    const a = performance.now();
    this.characterService.getAll().subscribe((data: any) => {
      if (data && data.characters) {
        this.characters = data.characters;
      }
      const c = performance.now();
      console.log("time 2:: " + (c - a));
      //this.characters.loadDataSucceeded(transactions.data);
    });
    const b = performance.now();
    console.log("time 1:: " + (b - a));
    /*() this.transactionService.getAll().subscribe((transactions:any) => {
          this.actions.loadDataSucceeded(transactions.data);
        });*/
  }
}
