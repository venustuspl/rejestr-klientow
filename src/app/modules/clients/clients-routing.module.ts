import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { clientFormDeactivateGuard } from '../core/guards/client-form-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    // canActivate: [authGuardActivate],
    // resolve: { client: ClientResolver },
  },
  {
    path: 'dodaj',
    component: ClientFormComponent,
    canDeactivate: [clientFormDeactivateGuard],
  },
  {
    path: ':id',
    component: ClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
