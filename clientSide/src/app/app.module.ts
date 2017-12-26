import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TshirtComponent } from './components/tshirt/tshirt.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent, 
    routingComponents,
    NavbarComponent,
    TshirtComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
