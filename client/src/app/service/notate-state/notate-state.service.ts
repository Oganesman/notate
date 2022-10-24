import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from '../home/home.service';

@Injectable({
	providedIn: 'root'
})
export class NotateStateService {

	public fixedNotateArray: any = []

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
			.subscribe((data: any) => {
				data.map((el: any) => {
					if (el.fixed) {
						this.fixedNotateArray.push(el)
					}
				})

				this.hs.showNotates()
			})
	}
}
