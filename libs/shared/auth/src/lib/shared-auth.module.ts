import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth-guard';

@NgModule({
  imports: [CommonModule],
  providers: [AuthGuard]
})
export class SharedAuthModule {}
