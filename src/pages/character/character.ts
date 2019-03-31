import { CharacterDetailPage } from './../character-detail/character-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { CharacterProvider } from '../../providers/character/character';
/**
 * Generated class for the CharacterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-character',
  templateUrl: 'character.html',
  providers: [
    CharacterProvider
  ]
})
export class CharacterPage {
  //public user_name:string = 'Zlatan Ibrahimovic';
  public characterList: any;
  private maxPage:number = 0;
  public current_page:number = 0;
  private response:any;
  private num_result:number = 20;
  public next_disabled:boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private characterProvider: CharacterProvider,
    public loadingCtrl: LoadingController,
    public modalController:ModalController
  ) { 

    this.request();
    //this.maxPage = this.response.data.total;
  }

  ionViewDidLoad() {
        
  }
  
  creatModal(character) {
    let modal = this.modalController.create(CharacterDetailPage, { character_id: character.id });
    modal.present();
  }

  request():void {
    let loading = this.loadingCtrl.create({
      content: 'Loading Characters...'
    });

    loading.present();

    this.characterProvider.getCharacters(this.current_page)
      .subscribe(
        response => {
          this.response = response;
          this.characterList = this.response.data.results;
          let totalResult = this.response.data.total;
          this.maxPage = Math.round(totalResult / this.num_result);
          loading.dismiss();
        },
        error => {
          console.log(error);
        }
      );
  }

  nextPage(){        
    //maxPage deve ser decrementado de 1 pois como estamos fazendo o round
    //da página e o current_page começa em zero, então em um exemplo que tenhamos 3 páginas
    //como resultado o ultimo valor para current page deve ser 2, pois sua contagem começa em zero
    if (this.current_page < (this.maxPage - 1)) {      
      this.current_page++;
      this.request();
    }    
    console.log(this.current_page);
  }

  backPage(){        
    if (this.current_page > 0) {      

      this.current_page--;
      this.request();
    }    
    console.log(this.current_page);    
  }

  goToDetail(character){
    this.navCtrl.push(CharacterDetailPage, { id:character.id});
  }

}
