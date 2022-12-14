import { Component, Input } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
import { NotateStateService } from 'src/app/service/notate-state/notate-state.service';

@Component({
	selector: 'main-notate',
	templateUrl: './main-notate.component.html',
	styleUrls: ['./main-notate.component.scss']
})
export class MainNotateComponent {

	constructor(public hs: HomeService, public ns: NotateStateService) {
	}
	@Input() notate: any
}
