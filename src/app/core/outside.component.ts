// Se renderiza cuando esta logueado
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-outside',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: []
})
export class OutsideComponent {
  title = 'green_metal_front';
}