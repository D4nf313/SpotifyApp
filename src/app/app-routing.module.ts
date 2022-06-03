import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionGuard } from '@core/guards/session.guard';
import { HomepagesComponent } from '@modules/home/pages/homepages/homepages.component';

const routes: Routes = [


  {
    path: 'auth',
    loadChildren:() => import ('./modules/auth/auth.module').then(m=>m.AuthModule)
 
   },
   {
   path: '',
   component: HomepagesComponent,
   loadChildren:() => import ('./modules/home/home.module').then(m=>m.HomeModule),
    canActivate:[SessionGuard] 
  }
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
