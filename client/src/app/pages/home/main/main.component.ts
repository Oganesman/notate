import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from 'src/app/service/home/home.service';
import { NotateStateService } from 'src/app/service/notate-state/notate-state.service';

@Component({
	selector: 'home-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})

export class MainComponent {
	constructor(public hs: HomeService, private http: HttpClient, public ns: NotateStateService) {
	}
	Undo() { document.execCommand("undo", false, 'null') }
	Redo() { document.execCommand("redo", false, 'null') }
}







