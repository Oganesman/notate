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
import { MainComponent } from './pages/home/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotateEditComponent } from './modals/notate-edit/notate-edit.component';
import { MainNotateComponent } from './pages/home/main/notate-tab/main-notate/main-notate.component';
import { NotateTabComponent } from './pages/home/main/notate-tab/notate-tab.component';
import { TrashTabComponent } from './pages/home/main/trash-tab/trash-tab.component';


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
		SidebarComponent,
		MainComponent,
		NotateEditComponent,
		MainNotateComponent,
		NotateTabComponent,
  TrashTabComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		RouterModule.forRoot(routers),
		FormsModule,
		FlashMessagesModule.forRoot(),
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
