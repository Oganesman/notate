import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/service/authorization/authorization.service';
import { HomeService } from 'src/app/service/home/home.service';
@Component({
	selector: 'app-loggout-modal',
	templateUrl: './loggout-modal.component.html',
	styleUrls: ['./loggout-modal.component.scss']
})
export class LoggoutModalComponent implements OnInit {

	constructor(private as: AuthorizationService, public hs: HomeService) { }
	loggout() {
		this.as.loggoutUser()
	}
	ngOnInit(): void {
	}

}
