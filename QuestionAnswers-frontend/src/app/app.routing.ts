import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {QaformComponent} from './qaform/qaform.component';
import { ViewformComponent } from './viewform/viewform.component'
import { NewformComponent } from './newform/newform.component'

const appRoutes: Routes = [
    { path: '', component: HomeComponent,},
    { path: 'qa', component: QaformComponent },
    { path: 'view', component: ViewformComponent },
    { path: 'new', component: NewformComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);