import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeService } from '../home/home.service';
import { map } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class NotateStateService {

	constructor(private http: HttpClient, private hs: HomeService) {
	}

	// fixed notate
	fixedNotate(notate: any) {
		const fixedNotate = {
			id: notate._id,
			fixed: notate.fixed == undefined ? true : !notate.fixed
		}
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/notate/fixed', fixedNotate, { headers: headers })
			.subscribe(() => {
				this.hs.showNotates()
			})
	}

	// remove notate
	removeNotate(notate: any) {
		const removeNotate = {
			id: notate._id,
			removeState: notate.removeState == undefined ? true : !notate.removeState,
		}

		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/notate/remove', removeNotate, { headers: headers })
			.subscribe(() => {
				this.hs.showNotates()
			})
	}

	// delete Notate
	deleteNotate(id: string) {
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.delete(`http://localhost:5000/notate/delete?_id=${id}`)
			.pipe(map(data => data))
			.subscribe(data => {
				this.hs.showNotates()
				this.hs.showEditModal = false
			})
	}

	// delete all
	deleteAllNotate() {
		for (let i = 0; i < this.hs.userRemoveNotate.length; i++) {
				let idNotate = this.hs.userRemoveNotate[i]._id
				this.deleteNotate(idNotate)
		}
	}
}
