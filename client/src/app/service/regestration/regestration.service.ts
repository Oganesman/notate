import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RegestrationService {
	constructor(private fm: FlashMessagesService, private http: HttpClient, private router: Router) { }
	checkParametrs(newUser: any) {
		if (newUser.name == '' || newUser.name == undefined) {
			this.fm.show('Enter your name', {
				cssClass: 'custom-danger',
				timeout: 3000
			})
			return false
		}
		if (newUser.email == '' || newUser.email == undefined) {
			this.fm.show('Enter your email', {
				cssClass: 'custom-danger',
				timeout: 3000
			})
			return false
		}
		if (newUser.password == '' || newUser.password == undefined) {
			this.fm.show('Enter your password', {
				cssClass: 'custom-danger',
				timeout: 3000
			})
			return false
		}
		else {
			const headers = new HttpHeaders()
			headers.append('Content-Type', 'application/json')
			this.http.post('http://localhost:5000/user/reg', newUser, { headers: headers })
				.pipe(map(data => data))
				.subscribe((data: any) => {
					console.log(data);
					if (data.status == true){
						this.fm.show(data.msg, {
							cssClass: 'custom-success',
							timeout: 3000
						})
						this.router.navigate([""])
					}else{
						this.fm.show(data.msg, {
							cssClass: 'custom-danger',
							timeout: 3000
						})
					}
				})
			return true
		}
	}
}

