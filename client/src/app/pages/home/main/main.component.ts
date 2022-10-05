import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'home-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {
	@Input() userNotates: any
	@Input() title: any
	@Input() description: any
	@Input() myUser: any


	constructor(private hs: HomeService) {
	}

	createNotates() {
		const newNotate = {
			title: this.title,
			description: this.description,
			author: this.myUser.id
		}
		this.hs.createNotateApi(newNotate)
		this.title = ''
		this.description = ''
	}
}
