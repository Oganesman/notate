import { Component } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'home-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
	constructor(public hs: HomeService) { }

}
