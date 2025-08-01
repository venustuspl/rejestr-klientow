import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../../../core/models/client.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-clients-table',
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, MatSortModule, HighlightDirective, MatButtonModule, RouterLink, MatPaginatorModule]
})
export class ClientsTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'lp',
    'firstname',
    'surname',
    'email',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Client>;
  totalCount = 0;
  filterValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientsService: ClientsService) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemsPerPage = this.paginator.pageSize;
            const sortDirection = this.sort.direction;
            const sortColumnName = this.sort.active;

            return this.clientsService.getClients(
              pageIndex,
              itemsPerPage,
              sortDirection,
              sortColumnName
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            return data.clients;
          })
        )
        .subscribe((clients) => {
          this.dataSource = new MatTableDataSource<Client>(clients);
        })
    );

    this.sub.add(
      this.filterValue.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          const val = value?.trim();
          this.applyFilter(val);
        })
    );
  }

  applyFilter(val: string) {
    const pageIndex = this.paginator.pageIndex + 1;
    const itemsPerPage = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortColumnName = this.sort.active;

    this.clientsService
      .getClients(pageIndex, itemsPerPage, sortDirection, sortColumnName, val)
      .subscribe({
        next: (resp) => {
          this.totalCount = resp.totalCount;
          this.dataSource = new MatTableDataSource<Client>(resp.clients);
        },
      });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
