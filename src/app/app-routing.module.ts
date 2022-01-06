import { MonstersExplorerComponent } from './containers/monsters-explorer.component';
import { MonsterViewerComponent } from './containers/components/monster-viewer/monster-viewer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  component: MonstersExplorerComponent,
  path: '',
  children: [{
    component: MonsterViewerComponent,
    path: ':code'
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
