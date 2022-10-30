import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	//change tab
	public tabShow: string = 'notate'
	//modalka
	showLoggoutModal: boolean = false;
	showEditModal: boolean = false;
	public notateInfo: any
	//all notates
	public userAllNotates: any = []
	//show notates for Simple
	public userSimpleNotates: any = []
	//show notates for Fixed
	public userFixedNotates: any = []
	//show notates for Remove
	public userRemoveNotate: any = []
	// bacground Number for notate writing block
	public writingBlockBg: number
	// bacground Number for notate main and modal
	public modalBgColor: number
	// click outside
	public writing: boolean = false;
	//create notate
	public title: string = ''
	public description: string = ''
	public myUser: any

	constructor(private http: HttpClient, private fm: FlashMessagesService) { }

	// change tab
	changeTab(tab: string) {
		this.tabShow = tab
	}

	// modal edit notate
	notateEdit(notate: any) {
		this.notateInfo = notate;
		this.modalBgColor = notate.background == undefined ? 0 : notate.background;
		this.showEditModal = !this.showEditModal
	}

	// create notate
	createNotates() {
		const newNotate = {
			title: this.title,
			description: this.description,
			author: this.myUser.id,
			background: this.writingBlockBg || 0
		}
		this.createNotateApi(newNotate)
		this.title = ''
		this.description = ''
		this.writingBlockBg = 0
	}

	createNotateApi(newNotate: any) {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/notate/create', newNotate, { headers: headers })
			.pipe(map(data => data))
			.subscribe(data => {
				this.showNotates()
			})
	}

	// get Notate
	showNotates() {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.get(`http://localhost:5000/notate/show?_id=${this.myUser.id}`, { headers: headers })
			.subscribe((data: any) => {
				//null
				this.userRemoveNotate = []
				this.userSimpleNotates = []
				this.userFixedNotates = []
				// map
				this.userAllNotates = data
				data.map((el: any) => {
					if (el.removeState) {
						this.userRemoveNotate.push(el)
					} else if (el.fixed) {
						this.userFixedNotates.push(el)
					} else if (!el.fixed) {
						this.userSimpleNotates.push(el)
					}
				})
			})
	}

	// update Notate
	updateNotate() {
		// add scroll for page
		document.body.style.overflow = 'auto'
		//update notate
		const newEdit = {
			title: this.notateInfo.title,
			description: this.notateInfo.description,
			id: this.notateInfo._id,
		}
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.patch('http://localhost:5000/notate/update', newEdit, { headers: headers })
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
			event.target.classList.contains('image')
		) {
			return this.writing = true
		} else if (this.title == '' && this.description == '') {
			this.writingBlockBg = 0
			return this.writing = false
		} else if (event.target.classList.contains('trash')) {
			this.title = ''
			this.description = ''
			this.writingBlockBg = 0
			return this.writing = false
		} else {
			this.writing = false
			return this.createNotates()
		}
	}
	

	// change Background Color Notate for writing block
	writingChangeColor() {
		this.writingBlockBg = this.writingBlockBg == undefined ? 1 : this.writingBlockBg += 1
		this.writingBlockBg = this.writingBlockBg > 6 ? 0 : this.writingBlockBg
	}

	// change Background Color Notate for main page
	mainChangeColor(notate: any) {
		this.userAllNotates.map((el: any) => {
			if (el._id == notate._id) {
				el.background = notate.background == 6 ? 0 : notate.background += 1
			}
		})
		const { _id, background } = this.userAllNotates.find((el: any) => {
			if (el._id == notate._id) {
				return el
			}
		})
		const newColor = {
			id: _id,
			colorNum: background
		}
		this.changeBacground(newColor)
	}

	// change Background Color Notate for modal
	modalChangeColor() {
		this.notateInfo.background = this.notateInfo.background >= 6 ? 0 : this.notateInfo.background += 1
		const newColor = {
			id: this.notateInfo._id,
			colorNum: this.notateInfo.background,
		}
		this.modalBgColor = newColor.colorNum
		this.changeBacground(newColor)
	}

	// API for change notate background
	changeBacground(newColor: object) {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/notate/background', newColor, { headers: headers })
			.pipe(map(data => data))
			.subscribe(data => {
			})
	}

}
