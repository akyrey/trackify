import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-nav-list',
  styleUrls: ['./navlist.component.scss'],
  templateUrl: './navlist.component.html',
})
export class NavlistComponent {
  adminExpanded: boolean = false;

  toggleAdmin(): void {
    this.adminExpanded = !this.adminExpanded;
  }
}
