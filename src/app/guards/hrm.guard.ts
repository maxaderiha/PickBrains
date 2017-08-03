import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { UserService } from '../core-service/user.service';

@Injectable()
export class HrmGuard implements CanActivate{

  constructor(private userService: UserService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | boolean {
    return this.userService.type.map(data => ['admin'].indexOf(data) !== -1);
  }
}
