import { Component } from '@angular/core';

import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	public myUser: any
	public title: any
	public description: any

	constructor(public hs: HomeService) {
		this.myUser = JSON.parse(localStorage.getItem('user') || '{}')
		this.hs.showNotates(this.myUser.id)
		console.log(this.myUser);

	}

	createNotates() {
		const newNotate = {
			title: this.title,
			description: this.description,
			author: this.myUser.id
		}
		console.log(newNotate);

		this.hs.createNotateApi(newNotate)
		this.title = ''
		this.description = ''
	}
}
