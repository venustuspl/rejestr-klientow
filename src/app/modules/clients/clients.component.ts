import { Component } from '@angular/core';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss'],
    standalone: true,
    imports: [ClientsTableComponent]
})
export class ClientsComponent {
  // constructor(private route: ActivatedRoute) {}
  //
  // ngOnInit(): void {
  //   this.route.data.subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
