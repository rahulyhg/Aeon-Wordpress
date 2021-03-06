import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsTabPage } from './posts-tab';
import { IonicImageLoader } from 'ionic-image-loader';
import { MomentModule } from 'angular2-moment';
import { AeonModule } from '../../../components/aeon.module';

@NgModule({
   declarations: [PostsTabPage],
   imports: [
      IonicPageModule.forChild(PostsTabPage),
      AeonModule,
      IonicImageLoader,
      MomentModule
   ],
   exports: [
      PostsTabPage
   ]
})
export class PostsTabPageModule { }