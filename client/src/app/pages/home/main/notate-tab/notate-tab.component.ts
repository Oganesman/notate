import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from 'src/app/service/home/home.service';
import { NotateStateService } from 'src/app/service/notate-state/notate-state.service';
import * as SampleJson from "../../../../../assets/i18n/ukr.json";

@Component({
	selector: 'notate-tab',
	templateUrl: './notate-tab.component.html',
	styleUrls: ['./notate-tab.component.scss']
})
export class NotateTabComponent {

	// public biba: any = 'SampleJson'

	constructor(public hs: HomeService, private http: HttpClient, public ns: NotateStateService) { 
		

		// console.log(SampleJson.default.Archives);
		
	}

	Undo() { document.execCommand("undo", false, 'null') }
	Redo() { document.execCommand("redo", false, 'null') }

}
