import { Component } from '@angular/core';

import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	public title: any
	public description: any

	constructor(public hs: HomeService) { }

	createNotates() {
		const newNotate = {
			title: this.title,
			description: this.description,
			author: '6339e6da1fb0804a710270ad'
		}
		console.log(newNotate);
		
		this.hs.createNotateApi(newNotate)
	}
}
