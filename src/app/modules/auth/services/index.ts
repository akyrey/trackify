import { Provider } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';

export const authServices: Provider[] = [AuthService];

export * from '@modules/auth/services/auth.service';
