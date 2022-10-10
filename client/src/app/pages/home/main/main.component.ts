import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { HomeService } from 'src/app/service/home/home.service';

@Component({
	selector: 'home-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})

export class MainComponent {
	constructor(public hs: HomeService, private http: HttpClient) {
	}
}






// (click)="deleteNotate(notate._id)"
	// deleteNotate(id: any) {
	// 	let headers = new HttpHeaders()
	// 	headers.append('Content-Type', 'application/json')
	// 	this.http.delete(`http://localhost:5000/user/notate/delete?_id=${id}`)
	// 	.pipe(map(data => data))
	// 	.subscribe(data => data)
	// }