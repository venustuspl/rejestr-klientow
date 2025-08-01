import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: true,
    imports: [NgIf, MatProgressSpinnerModule, AsyncPipe]
})
export class SpinnerComponent {
  isLoading = this.spinnerService.isLoading;

  constructor(private spinnerService: SpinnerService) {}
}
