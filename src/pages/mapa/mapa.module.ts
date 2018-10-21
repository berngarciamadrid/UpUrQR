import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapaPage
  ],
  imports: [
    IonicPageModule.forChild(MapaPage),
    AgmCoreModule
  ],
})
export class MapaPageModule {}
