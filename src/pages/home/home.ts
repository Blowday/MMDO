import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

export interface Result {
  title : string;
  author : string;
  image : string;

}

const fakeResults : Result[] = [
  {
    title : 'Charlie et la chocolaterie', 
    author : 'Charlie',
    image : "http://img.over-blog-kiwi.com/0/93/14/92/20140323/ob_7bcc55_540792-394996087251191-1015015309-n.jpg"
  },
  {
    title : 'Charlie et la carosserie', 
    author : 'encore Charlie',
    image : "http://img.over-blog-kiwi.com/0/93/14/92/20140323/ob_7bcc55_540792-394996087251191-1015015309-n.jpg"
  },
  {
    title : 'Charlie et la bijouterie', 
    author : 'sharly',
    image : "http://img.over-blog-kiwi.com/0/93/14/92/20140323/ob_7bcc55_540792-394996087251191-1015015309-n.jpg"
  }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results: Result[];
  pushPage : any;

  constructor(public navCtrl: NavController) {
    //this.results = fakeResults;
    this.pushPage = DetailsPage;
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    val ? this.results = fakeResults : this.results = [];
  }
}

