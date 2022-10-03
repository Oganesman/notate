import { Component, OnInit } from '@angular/core';
import { RegestrationService } from 'src/app/service/regestration/regestration.service';

@Component({
	selector: 'app-reg',
	templateUrl: './reg.component.html',
	styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

	constructor(private rs: RegestrationService) { }

	name: any
	email: any
	login: any
	password: any

	regestration() {
		let newUser = {
			name: this.name,
			email: this.email,
			login: this.login,
			password: this.password,
		}
		this.rs.checkParametrs(newUser)
		return false
	}
	ngOnInit(): void {
	}
}
