import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
import { NotateStateService } from 'src/app/service/notate-state/notate-state.service';

@Component({
	selector: 'trash-tab',
	templateUrl: './trash-tab.component.html',
	styleUrls: ['./trash-tab.component.scss']
})
export class TrashTabComponent {

	constructor(public hs: HomeService, public ns: NotateStateService) { }

	
}
