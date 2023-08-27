import {User} from "../model/user.model";
import {Appuser} from "../model/appuser";
export interface EditProfileRequest {
  user: User;
  newPassword: string;
}
