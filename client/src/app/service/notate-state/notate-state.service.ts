import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../home/home.service';

@Injectable({
	providedIn: 'root'
})
export class NotateStateService {

	constructor(private http: HttpClient, private hs: HomeService) { }

	fixedNotate(notate: any) {
		const fixedNotate = {
			id: notate._id,
			fixed: true
		}
		let headers = new HttpHeaders()
		headers.append('Content-Type', 'application/json')
		this.http.post('http://localhost:5000/notate/fixed', fixedNotate, { headers: headers })
			.pipe(map(data => data))
			.subscribe(data => {
				this.hs.showNotates()
			})
	}
}
