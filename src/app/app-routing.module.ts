import { NgModule} from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FlatsComponent } from './flats/flats.component';
import { AuthGuard } from './guards/auth-guard.service';
import { HousesComponent } from './houses/houses.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path: 'houses', component: HousesComponent, canActivate:[AuthGuard]},
    {path: 'flats', component: FlatsComponent, canActivate:[AuthGuard]},
    {path: 'login', component: LoginComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HousesComponent, FlatsComponent, LoginComponent]
