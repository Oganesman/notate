import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from 'src/app/service/home/home.service';
import { NotateStateService } from 'src/app/service/notate-state/notate-state.service';

@Component({
	selector: 'notate-tab',
	templateUrl: './notate-tab.component.html',
	styleUrls: ['./notate-tab.component.scss']
})
export class NotateTabComponent {

	constructor(public hs: HomeService, private http: HttpClient, public ns: NotateStateService) { }

	Undo() { document.execCommand("undo", false, 'null') }
	Redo() { document.execCommand("redo", false, 'null') }

}
