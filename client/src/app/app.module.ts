import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegComponent } from './pages/reg/reg.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'flash-messages-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ArchivesTabComponent } from './pages/home/main/archives-tab/archives-tab.component';
import { ChangesTabComponent } from './pages/home/main/changes-tab/changes-tab.component';
import { NotificationsTabComponent } from './pages/home/main/notifications-tab/notifications-tab.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


const routers: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthenticateGuard] },
	{ path: 'reg', component: RegComponent },
	{ path: 'auth', component: AuthComponent },
]

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		RegComponent,
		AuthComponent,
		LoggoutModalComponent,
		HeaderComponent,
		SidebarComponent,
		MainComponent,
		NotateEditComponent,
		MainNotateComponent,
		NotateTabComponent,
		TrashTabComponent,
		ArchivesTabComponent,
		ChangesTabComponent,
		NotificationsTabComponent,
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
		MatInputModule,
		TranslateModule.forRoot({
			loader: {
				 provide: TranslateLoader,
				 useFactory: HttpLoaderFactory,
				 deps: [HttpClient]
			}
	  })
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
