import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab1PageModule } from './tab1/tab1.module';
import { Tab2Page } from './tab2/tab2.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path:'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tab6',
    loadChildren: () => import('./tab6/tab6.module').then( m => m.Tab6PageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
