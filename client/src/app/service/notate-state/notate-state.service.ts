import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeService } from '../home/home.service';

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
		console.log(notate);

		const removeNotate = {
			id: notate,
			removeState: notate.removeState == undefined ? true : notate.removeState,
		}
		console.log(removeNotate);
		
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/notate/remove', removeNotate, { headers: headers })
			.subscribe(() => {
				this.hs.showNotates()
			})
	}
}
