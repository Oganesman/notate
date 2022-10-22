import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'notate-edit',
	templateUrl: './notate-edit.component.html',
	styleUrls: ['./notate-edit.component.scss']
})
export class NotateEditComponent {
	constructor(public hs: HomeService) {
		document.body.style.overflow = 'hidden'
	}
	
}
