import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class MaterialModule { }