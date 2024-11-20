import { ResolveFn } from '@angular/router';
import {ProfileHttpService} from "../http/profile-http.service";
import {inject} from "@angular/core";
import {ProfileDto} from "../dto/receive/profile.dto";

/**
 * The update profile resolver.
 */
export const updateProfileResolver: ResolveFn<ProfileDto> = (route, state) => {
  const profileHttpService = inject(ProfileHttpService);

  return profileHttpService.getProfile();
};
