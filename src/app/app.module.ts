import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminModule } from './pages/admin/admin.module';
import { AppRoutingModule } from './app.routing';
import { AdminRoutingModule } from './pages/admin/admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { LoadingComponent } from './common/loading/loading.component';
import { LoadingService } from './common/loading/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AdminModule,
    AppRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
