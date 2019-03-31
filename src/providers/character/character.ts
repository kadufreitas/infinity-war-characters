import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CharacterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CharacterProvider {

  private root = 'https://gateway.marvel.com:443/v1/';
  private key = 'apikey=60bbca16de62f9bf891b7ab88fa63d22'
  private hash = 'hash=3e47b49f23794c3f09876465965f06c1'
  private offset = 'offset=';
  private num_result:number = 20;
  private ts = 'ts=1';

  constructor(public http: HttpClient) {
    console.log('Hello CharacterProvider Provider');
  }

  getCharacters(page){
    let current_page = this.offset + (page * this.num_result);
    return this.http.get(`${this.root}public/events/29/characters?${current_page}&${this.ts}&${this.key}&${this.hash}`);
  }

  getCharactersById(id){
    return this.http.get(`${this.root}public/characters/${id}?${this.key}&${this.hash}&${this.ts}`);
  }
}
