import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
import { NotateStateService } from 'src/app/service/notate-state/notate-state.service';

@Component({
	selector: 'notate-edit',
	templateUrl: './notate-edit.component.html',
	styleUrls: ['./notate-edit.component.scss']
})
export class NotateEditComponent {
	constructor(public hs: HomeService, public ns:NotateStateService) {
		document.body.style.overflow = 'hidden'
	}
	Undo() { document.execCommand("undo", false, 'null') }
	Redo() { document.execCommand("redo", false, 'null') }
}
