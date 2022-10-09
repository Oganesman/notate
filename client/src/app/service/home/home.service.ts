import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	//modalka
	showLoggoutModal: boolean = false
	//show notates ngFor
	public userNotates: any
	// click outside
	public writing: boolean = false;
	//create notate
	public title: string = ''
	public description: string = ''
	public myUser: any

	constructor(private http: HttpClient, private fm: FlashMessagesService) {
	}

	createNotateApi(newNotate: any) {
		if (newNotate.title == '' && newNotate.description == '' || newNotate.title == undefined && newNotate.description == undefined) {
			this.fm.show('Enter note', {
				cssClass: 'custom-danger',
				timeout: 3000
			})
			return false
		}
		// if (newNotate.title == '' || newNotate.title == undefined) {
		// 	this.fm.show('Enter note title', {
		// 		cssClass: 'custom-danger',
		// 		timeout: 3000
		// 	})
		// 	return false
		// }
		// if (newNotate.description == '' || newNotate.description == undefined) {
		// 	this.fm.show('Enter note description', {
		// 		cssClass: 'custom-danger',
		// 		timeout: 3000
		// 	})
		// 	return false
		// }
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/user/create/notate', newNotate, { headers: headers })
			.pipe(map(data => data))
			.subscribe(data => {
				this.showNotates()
			})
		return false
	}

	showNotates() {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.get(`http://localhost:5000/user/fetch/notate?_id=${this.myUser.id}`)
			.pipe(map((data: any) =>
				data
			))
			.subscribe(data => {
				this.userNotates = data
			})
	}

	// create notate
	createNotates() {
		const newNotate = {
			title: this.title,
			description: this.description,
			author: this.myUser.id
		}
		this.createNotateApi(newNotate)
		this.title = ''
		this.description = ''
	}

	//click Outside and create notate
	clickOutside(event: any) {
		if (
			event.target.classList.contains('main-write__container') ||
			event.target.classList.contains('ng-pristine') ||
			event.target.classList.contains('mat-form-field-infix') ||
			event.target.classList.contains('ng-tns-c75-0') ||
			event.target.classList.contains('mat-form-field-flex') ||
			event.target.classList.contains('cdk-textarea-autosize')
		) {
			return this.writing = true
		} else if (this.title == '' && this.description == '') {
			return this.writing = false
		} else {
			this.writing = false
			return this.createNotates()
		}
	}
}

