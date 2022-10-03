import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthorizationService {

	public token: any = null
	public user: any = null

	constructor(private http: HttpClient, private router: Router, private fm: FlashMessagesService) { }

	checkAuthParam(authUser: any) {
		if (authUser.email == undefined || authUser.email == '') {
			this.fm.show('Invalid email', {
				cssClass: 'custom-danger',
				timeout: 3000
			})
			return false
		}
		if (authUser.password == undefined || authUser.password == '') {
			this.fm.show('Invalid Password', {
				cssClass: 'custom-danger',
				timeout: 3000
			})
			return false
		}
		else {
			let headers = new HttpHeaders()
			headers.append('Content-Type', 'application/json')
			this.http.post('http://localhost:5000/user/auth', authUser, { headers: headers })
				.pipe(map(data => data))
				.subscribe((data: any) => {
					if (data.status == false) {
						this.fm.show(data.msg, {
							cssClass: 'custom-danger',
							timeout: 3000
						})
					} else {
						this.fm.show(data.msg, {
							cssClass: 'custom-success',
							timeout: 3000
						})
						localStorage.setItem('token', data.token)
						localStorage.setItem('user', data.user)
						this.token = data.token
						this.user = data.user
						this.router.navigate(['/'])
					}
				})
			return false
		}
	}

	loggoutUser() {
		this.token = null
		this.user = null
		localStorage.clear()
		this.fm.show('You are logged out', {
			cssClass: 'custom-success',
			timeout: 3000
		})
		this.router.navigate(['/auth'])
	}
}
