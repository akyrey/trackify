import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbar',
  styleUrls: ['./toolbar.component.scss'],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() currentRoute: string | null = null;
  @Input() showMenu: boolean = false;
  @Output() openSidenav: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousPage: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Display or hide back button.
   *
   * @return true to display the button, false otherwise
   */
  displayBackButton(): boolean {
    const regex: RegExp = new RegExp([].map((r: any) => r.source).join('|'));
    return !this.currentRoute?.match(regex);
  }
}
