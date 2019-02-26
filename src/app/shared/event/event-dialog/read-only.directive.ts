import { Directive, Input, OnChanges, ElementRef, SimpleChanges, OnInit } from "@angular/core";

@Directive({
    selector:'[appReadOnly]'
})

export class ReadOnlyDirective {
    constructor(private el: ElementRef){
    }
    @Input('appReadOnly') edit: boolean;
    ngOnInit() {
        let element = (this.el.nativeElement as HTMLElement);
        element.classList.add('read-only');
        this.changeState()
    }
    ngOnChanges(changes: SimpleChanges) {
        this.changeState();
    }
    changeState() {
        let element = (this.el.nativeElement as HTMLElement);
        if (element.classList.contains('read-only') && this.edit) {
            element.classList.remove('read-only');
        } else if (!element.classList.contains('read-only') && !this.edit) {
            element.classList.add('read-only');
        }
    }
}