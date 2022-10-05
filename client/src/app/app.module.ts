import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegComponent } from './pages/reg/reg.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'flash-messages-angular';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticateGuard } from './service/authenticate.guard';
import { LoggoutModalComponent } from './modals/loggout-modal/loggout-modal.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { SidebarComponent } from './pages/home/sidebar/sidebar.component';


const routers: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthenticateGuard] },
	{ path: 'reg', component: RegComponent },
	{ path: 'auth', component: AuthComponent },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticateGuard] },
]

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		RegComponent,
		AuthComponent,
		DashboardComponent,
		LoggoutModalComponent,
  HeaderComponent,
  SidebarComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		RouterModule.forRoot(routers),
		FormsModule,
		FlashMessagesModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
