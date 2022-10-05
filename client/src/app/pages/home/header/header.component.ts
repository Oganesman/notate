import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'home-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	@Input() userName: any

	@Input() modal: Boolean = false
	@Output() showModalOutput = new EventEmitter<any>()

	constructor() { }

	modalChange(){
		this.modal = true
		this.showModalOutput.emit(this.modal)
	}


}
