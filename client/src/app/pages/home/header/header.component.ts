import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'home-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

	public lang

	@Input() userName: any
	@Input() modal: Boolean = false
	@Output() showModalOutput = new EventEmitter<any>()

	constructor() { }

	modalChange(){
		this.modal = true
		this.showModalOutput.emit(this.modal)
	}

	ngOnInit(): void {
		this.lang = localStorage.getItem('lang') || 'en'
		console.log(this.lang);
		
	}

	changeLang(e:any){
		localStorage.setItem('lang', e.value)
		window.location.reload()
	}


}
