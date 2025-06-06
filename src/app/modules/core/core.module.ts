import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterModule, BrowserAnimationsModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
