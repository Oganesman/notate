import { Component, Input } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'home-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {

	constructor(public hs: HomeService) {
	}

}
