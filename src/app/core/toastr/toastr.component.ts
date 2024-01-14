import { Component, Input } from '@angular/core';
import { ToastrService } from './toastr.service';
import { Toast } from './toastr.interface';
import {
  trigger,
  transition,
  animate,
  animation,
  useAnimation,
  style,
} from '@angular/animations';

// fade-in-up animation
const fadeInUpAnimation = animation([
  style({
    transform: 'translateY(2rem)',
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  animate('.2s ease-out'),
]);

// fade-out-up animation
const fadeOutUpAnimation = animation([
  animate(
    '.2s ease-in',
    style({
      transform: 'translateY(-2rem)',
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
    })
  ),
]);

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', useAnimation(fadeInUpAnimation)),
      transition(':leave', useAnimation(fadeOutUpAnimation)),
    ]),
  ],
})
export class ToastrComponent {
  @Input() toasts: Toast[] | null = [];

  constructor(private toastr: ToastrService) {}

  remove(toast: Toast) {
    this.toastr.remove(toast);
  }
}
