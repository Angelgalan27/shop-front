import { Injectable } from "@angular/core";
import { SecurityService } from "../services/security.service";
import { ActionModel, RolModel } from "src/app/api-rest";
export class Permissions {
  public static ADMIN = ['ADMIN'];
  public static USER = ['USER'];
  public static ONLYVIEW = ['ONLY_VIEW'];
  public static USER_R = ['USER_R'];
}


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _auth: SecurityService) {}

  hasPermission(actions: string[] | undefined): boolean {
    const user = this._auth.getUserLoged();
    let respuesta = false;
    if (user) {
      actions?.forEach(action => {
        const match = user.roles?.find((rol: RolModel) => {
         const actionMatch = rol.actions?.find( actionUser => actionUser.name === action)
         if (actionMatch) {
          return true;
         } else {
          return false;
         }
        });
        if (match) {
          respuesta = true;
        }
      });
    }
    return respuesta;
  }

}
