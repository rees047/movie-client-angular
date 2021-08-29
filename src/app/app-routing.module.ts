import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

/**
 * Implement the Routing Module and paths
 * Paths were declared on app.module.ts
 */
export class AppRoutingModule { }
