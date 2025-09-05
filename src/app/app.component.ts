import {Component, computed, effect, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  value: WritableSignal<number> = signal(1);
  valueArray = signal([
    {title: 'Test'}
  ])
  readonlyValue: Signal<number> = computed(() => this.value() + 10)

  constructor() {
    effect(() => {
      console.log('Wartość sygnału: ', this.valueArray());
      console.log('Wartość sygnału readonly: ', this.readonlyValue());
    })
  }

  ngOnInit(): void {
    // console.log('Wartość sygnału: ', this.valueArray());
    // console.log('Wartość sygnału readonly: ', this.readonlyValue());

    // this.value.set(3);
    this.value.update((value) => value + 3);
    // this.valueArray.mutate(value => {
    //   value[0].title = 'Testowy'
    // })
    // console.log('Wartość sygnału: ', this.valueArray());
    // console.log('Wartość sygnału readonly: ', this.readonlyValue());
  }
}
