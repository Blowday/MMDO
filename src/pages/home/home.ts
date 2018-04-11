import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { apikey } from '../../app/tmdb';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/subscription';
import { Platform } from 'ionic-angular';



export interface Result {
  title : string;
  id : number;
  vote_average : number;
  poster_path : string;
  overview : string;
  release_date : string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results: Observable<Result[]>;
  pushPage : any;
  private shakeSubscription : Subscription;

  constructor(public http : HttpClient, public alertCtrl: AlertController, public navCtrl: NavController, private shake: Shake, private platform:Platform) {
    this.results = Observable.of([]);
    this.pushPage = DetailsPage;
  }

  ionViewDidEnter() {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())
    .switchMap(()=>this.shake.startWatch())
    .switchMap(()=>this.discoverMovies())
    .subscribe(movies => this.showRandomMovieAlert(movies));
  }
  ionViewWillLeave() {

  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    val ? this.results = this.fetchResults(val) : this.results = Observable.of([]);
  }

  fetchResults(query: string) : Observable<Result[]>  {

    let url : string = 'https://api.themoviedb.org/3/search/movie';

    return this.http.get<Result[]>(url,{
      params:{
        api_key: apikey,
        query: query
      }
    }).pluck('results');
  }

  private discoverMovies(): Observable<Result[]> {

    let url : string = 'https://api.themoviedb.org/3/search/movie';
    
    return this.http.get<Result[]>(url,{
      params:{
        api_key: apikey,
        page: '1',
        primary_release_year: '2018'
      }
    }).pluck('results');
  }

  private showRandomMovieAlert(movies: Result[]):void {
    let item:Result = movies[Math.floor(Math.random()*movies.length)];
      let confirm = this.alertCtrl.create({
        title: item.title,
        message: item.overview,
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Details',
            handler: () => {
              console.log('Agree clicked');
              this.navCtrl.push(this.pushPage);
            }
          }
        ]
      });
      confirm.present();
  }

}
