import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoicetabPageRoutingModule } from './voicetab-routing.module';

import { VoicetabPage } from './voicetab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoicetabPageRoutingModule
  ],
  declarations: [VoicetabPage]
})
export class VoicetabPageModule {}
