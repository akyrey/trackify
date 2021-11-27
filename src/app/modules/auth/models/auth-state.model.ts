import { User } from '@modules/auth/models/user.model';

export interface AuthState {
  isLogged: boolean;
  user: User | null;
}
