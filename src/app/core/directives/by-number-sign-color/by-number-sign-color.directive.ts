import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { isPresent } from '../../utils/is-present';
import { match } from '../../utils/pattern-matching';

enum MathSignResult {
  Positive = 1,
  Negative = -1,
  Default = 0,
}

@Directive({
  selector: '[appByNumberSignColor]'
})
export class ByNumberSignColorDirective {

  @Input() set number(value: number) {
    const nativeElement = this.elementRef.nativeElement;

    if (isPresent(value) && isPresent(nativeElement)) {
      const color = match(Math.sign(value))
        .case(MathSignResult.Positive, '#22ab94')
        .case(MathSignResult.Negative, '#f23645')
        .case(MathSignResult.Default, '#b2b5be')
        .default('#b2b5be');
      nativeElement.setAttribute('style', `color: ${color};`);
    }
  };

  constructor(
    @Inject(ElementRef) private elementRef: ElementRef<Element>,
  ) {}
}
