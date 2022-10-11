import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	constructor(public hs: HomeService) {
		this.hs.myUser = JSON.parse(localStorage.getItem('user') || '{}')
		this.hs.showNotates()
	}

	showEdit(e: any) {
		if (e.target.classList.contains("ng-star-inserted") ||
			e.target.localName == "notate-edit"
		) {
			this.hs.updateNotate()
			document.body.style.overflow = 'auto'
			return this.hs.showEditModal = !this.hs.showEditModal
		} else {
			return false
		}
	}

}
