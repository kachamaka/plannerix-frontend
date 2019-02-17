import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[eventColor]'
})


export class EventColorDirective implements OnInit{
    @Input('type') eventType: number;
    constructor (private el: ElementRef) {}
    ngOnInit() {
        if (this.eventType == 0) {
            this.el.nativeElement.style.backgroundColor = "red";
        } else if (this.eventType == 1) {
            this.el.nativeElement.style.backgroundColor = "green";
        } else {
            this.el.nativeElement.style.backgroundColor = "gray";
        }
    }
}