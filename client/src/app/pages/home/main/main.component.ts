import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HomeService } from 'src/app/service/home/home.service';
import { AutofillMonitor } from '@angular/cdk/text-field';

@Component({
	selector: 'home-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent {
	//material
	// @ViewChild('first', { read: ElementRef }) firstName: ElementRef<HTMLElement>;
	// firstNameAutofilled: boolean;

	@Input() userNotates: any
	@Input() title: any
	@Input() description: any
	@Input() myUser: any


	constructor(private hs: HomeService, private _autofill: AutofillMonitor) {
	}

	createNotates() {
		const newNotate = {
			title: this.title,
			description: this.description,
			author: this.myUser.id
		}
		this.hs.createNotateApi(newNotate)
		this.title = ''
		this.description = ''
	}

	//material 
	// ngAfterViewInit() {
	// 	this._autofill
	// 		.monitor(this.firstName)
	// 		.subscribe(e => (this.firstNameAutofilled = e.isAutofilled));
	// }
	// ngOnDestroy() {
	// 	this._autofill.stopMonitoring(this.firstName);
	// }
}
