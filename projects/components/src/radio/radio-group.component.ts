import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { LoggerService } from '@hypertrace/common';
import { RadioOption } from './radio-option';

@Component({
  selector: 'ht-radio-group',
  styleUrls: ['./radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ht-label [label]="title"></ht-label>
    <mat-radio-group [ngModel]="this.selected!.value" (change)="this.onRadioChange($event)" [disabled]="this.disabled">
      <mat-radio-button *ngFor="let option of options" class="radio-button" [value]="option.value">
        <ht-label [label]="option.label"></ht-label>
      </mat-radio-button>
    </mat-radio-group>
  `
})
export class RadioGroupComponent implements OnInit {
  @Input()
  public title!: string;

  @Input()
  public selected: RadioOption | undefined;

  @Input()
  public options: RadioOption[] = [];

  @Input()
  public disabled: boolean | undefined;

  @Output()
  public readonly selectedChange: EventEmitter<string> = new EventEmitter();

  public constructor(private readonly loggerService: LoggerService) {}

  public ngOnInit(): void {
    // tslint:disable-next-line:strict-type-predicates
    if (this.title === undefined) {
      this.loggerService.warn('RadioGroupComponent requires "title" input');
    }

    if (this.selected === undefined) {
      this.selected = {
        label: '',
        value: ''
      };
    }
  }

  public onRadioChange(event: MatRadioChange): void {
    this.selected = this.options.find(option => option.value === event.value);
    this.selectedChange.emit(event.value);
  }
}
