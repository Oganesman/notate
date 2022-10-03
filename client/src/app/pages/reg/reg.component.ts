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
	password: any

	regestration() {
		let newUser = {
			name: this.name,
			email: this.email,
			password: this.password,
		}
		this.rs.checkParametrs(newUser)
		console.log(newUser);
		
		return false
	}
	ngOnInit(): void {
	}
}
