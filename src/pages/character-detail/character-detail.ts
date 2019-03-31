import { CharacterProvider } from './../../providers/character/character';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CharacterDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-character-detail',
  templateUrl: 'character-detail.html',
  providers:[
    CharacterProvider
  ]
})
export class CharacterDetailPage {

  public character;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public characterProvider:CharacterProvider 
  ) {
  }

  ionViewDidLoad() {
    let character_id = this.navParams.get('character_id');
    this.characterProvider.getCharactersById(character_id)
      .subscribe(data=>{
        this.character = (data as any).data.results[0];              
      },error=>{
        console.log(error)
      });
  }

  dismiss() {
    this.viewController.dismiss();
  }

}
