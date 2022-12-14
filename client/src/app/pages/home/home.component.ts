import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
import { NotateStateService } from 'src/app/service/notate-state/notate-state.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	constructor(public hs: HomeService, private ns: NotateStateService) {
		this.hs.myUser = JSON.parse(localStorage.getItem('user') || '{}')
		this.hs.showNotates()
	}

	showEdit(e: any) {
		if (e.target.classList.contains("ng-star-inserted") ||
			e.target.localName == "notate-edit"
		) {
			this.hs.updateNotate()
			return this.hs.showEditModal = !this.hs.showEditModal
		} else {
			return false
		}
	}

}
