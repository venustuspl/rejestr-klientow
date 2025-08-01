import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: true
})
export class AlertComponent {
  @Input() text!: string;
}
