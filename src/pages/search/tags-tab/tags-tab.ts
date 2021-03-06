import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Searchbar } from 'ionic-angular';
import 'rxjs/Rx'

import { ClientProvider } from '../../../providers/client.provider'

@IonicPage()
@Component({
  selector: 'page-tags-tab',
  templateUrl: 'tags-tab.html',
  providers: [ClientProvider]
})
export class TagsTabPage {
  @ViewChild('searchbar') searchbar: Searchbar;
  @ViewChild(Navbar) navBar: Navbar;
  options: any;
  tags: any;
  page: number;
  pageTitle: string;
  showSearchBar: boolean;

  constructor(
    public navCtrl: NavController,
    public clientProvider: ClientProvider,
    
    private navParams: NavParams
  ) {
    this.init();
  }

  ionViewWillEnter(){
   if (this.options[0].id != this.navParams.data.name) {
      this.init();
    }
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.parent.viewCtrl.dismiss();
    };
  }

  ionViewWillLeave() {
    this.showSearchBar = false;
  }

  init(){
    this.pageTitle = this.navParams.data.name;
    this.options = [{
      type: 'search',
      id: this.navParams.data.name
    }]
    this.page = 1;
    this.fetch(this.options);
  }

  fetch(opt: any) {
    this.clientProvider.getListTags(this.page, this.options)
      .subscribe(res => {
        this.tags = res;
      })
  }

  goToTag(id, name) {
    this.navCtrl.push(
      "PostListPage", {
        'type': 'tags',
        'id': id,
        'name': name
      });
  }

  loadMore(infiniteScroll) {
    this.page++;
    setTimeout(() => {
      this.clientProvider.getListTags(this.page, this.options)
        .subscribe(res => {
          res.forEach(element => {
            this.tags.push(element)
          });
          infiniteScroll.complete();
        })
    }, 500)
  }

  search(event: any) {
    this.navParams.data.name = event.target.value;
    this.init();
  }

  searchBlurred(event:any){
    this.showSearchBar = false;
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (this.showSearchBar) {
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 150);
    }
  }
}
