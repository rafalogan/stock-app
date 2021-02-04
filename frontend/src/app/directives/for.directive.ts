import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {


  @Input('myForEm') numbers: number[] | undefined;

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<any>) {
  }

  ngOnInit(): void {
    const items: number[] = (this.numbers) ?? [];
    for (const number of items) this.container
      .createEmbeddedView(this.template, {$implicit: number});
    console.log('convert numbers', items);
  }

}
