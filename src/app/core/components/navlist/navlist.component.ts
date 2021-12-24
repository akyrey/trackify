import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components';
import { ConfirmDialogData } from '@shared/models';
import { take } from 'rxjs';

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
  @Output() logout = new EventEmitter<void>();
  adminExpanded: boolean = false;

  constructor(private dialog: MatDialog) {}

  toggleAdmin(): void {
    this.adminExpanded = !this.adminExpanded;
  }

  onLogout(): void {
    this.dialog
      .open<ConfirmDialogComponent, ConfirmDialogData, boolean | undefined>(ConfirmDialogComponent, {
        data: { title: 'Logout', text: 'Are you sure you want to logout?' },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirm: boolean | undefined) => {
        if (confirm) {
          this.logout.emit();
        }
      });
  }
}
