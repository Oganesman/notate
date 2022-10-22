import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { find, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	//modalka
	showLoggoutModal: boolean = false;
	showEditModal: boolean = false;
	public notateInfo: any
	//show notates ngFor
	public userNotates: any
	// bacground Number for class
	public bgNum: number
	// click outside
	public writing: boolean = false;
	//create notate
	public title: string = ''
	public description: string = ''
	public myUser: any

	constructor(private http: HttpClient, private fm: FlashMessagesService) { }

	// modal edit notate
	notateEdit(notate: any) {
		this.notateInfo = notate;
		this.bgNum = notate.background == undefined ? 0 : notate.background;
		this.showEditModal = !this.showEditModal
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

	createNotateApi(newNotate: any) {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/user/create/notate', newNotate, { headers: headers })
			.pipe(map(data => data))
			.subscribe(data => {
				this.showNotates()
			})
	}

	// get Notate
	showNotates() {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.get(`http://localhost:5000/user/fetch/notate?_id=${this.myUser.id}`)
			.pipe(map((data: any) => data))
			.subscribe(data => {
				this.notateInfo = data.find((el: any) => {
					return el._id == this.notateInfo?._id
				})
				this.bgNum = this.notateInfo?.background
				this.userNotates = data
			})
	}

	// update Notate
	updateNotate() {
		const newEdit = {
			title: this.notateInfo.title,
			description: this.notateInfo.description,
			id: this.notateInfo._id,
		}
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.put('http://localhost:5000/user/notate/edit', newEdit, { headers: headers })
			.pipe(map(data => data))
			.subscribe(data => data)
	}

	//click Outside and create notate
	clickOutside(event: any) {
		if (
			event.target.classList.contains('main-write__container') ||
			event.target.classList.contains('main-write__field') ||
			event.target.classList.contains('pre-tag') ||
			event.target.classList.contains('click-out') ||
			event.target.classList.contains('settings-items') ||
			event.target.classList.contains('image')
		) {
			return this.writing = true
		} else if (this.title == '' && this.description == '') {
			return this.writing = false
		} else if (event.target.currentSrc == "http://localhost:4200/assets/icon/trash.svg") {
			this.title = ''
			this.description = ''
			return this.writing = false
		} else {
			this.writing = false
			return this.createNotates()
		}
	}
	// delete Notate
	deleteNotate(id: string) {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.delete(`http://localhost:5000/user/notate/delete?_id=${id}`)
			.pipe(map(data => data))
			.subscribe(data => {
				this.showNotates()
				this.showEditModal = false
			})
	}

	// change Bacground Color Notate
	changeBackground(notate: any = null) {
		this.notateInfo = notate == null ? this.notateInfo : notate
		const notateObj = {
			id: this.notateInfo._id,
			colorNum: this.notateInfo.background == 6 ? 0 : this.notateInfo.background += 1,
		}
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/user/notate/background', notateObj, { headers: headers })
			.pipe(map(data => data))
			.subscribe(data => {
				this.showNotates()
			})
	}
}

