import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate() {
		if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null) {
			return true
		}else{
			this.router.navigate(['/auth'])
			return false
		}
	}

}