import { ResolveFn } from '@angular/router';
import {IpInfoHttpService} from "../http/ip-info-http.service";
import {inject} from "@angular/core";

export const ipInfoResolver: ResolveFn<any> = (route, state) => {
  const ipHttpService = inject(IpInfoHttpService);
  return ipHttpService.getIpAddress();
};
