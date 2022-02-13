import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/shared/components';
import { ConfirmDialogData } from '@app/shared/models';
import { take } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() userName: string | null = null;
  @Input() userPicture: string | null = null;
  @Output() login: EventEmitter<void> = new EventEmitter<void>();
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  @Output() settings: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

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
