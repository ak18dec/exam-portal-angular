import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.loginService.getToken();

        // console.log(`token fetched from local storage is ${token}`)
        
        let authReq = req;

        const headerDict = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        }

        Object.assign(headerDict, token && { 'Authorization': `Bearer ${token}`});
        
        authReq = authReq.clone({
            headers: new HttpHeaders(headerDict)
        });

        return next.handle(authReq);
    }

}


export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]

/** Notes:
 * When you set-> multi: true
 * You're telling Angular:
    “I want to add this interceptor to a list of interceptors associated with the HTTP_INTERCEPTORS token, 
    not replace any existing ones.”

    When you omit multi: true
    Then Angular will replace any previous interceptors with just this one. That means only one interceptor 
    will be active — the last one registered.

    Since you often need multiple interceptors (e.g., for auth, logging, error handling), 
    you must use multi: true so Angular can keep all of them in a chain.


    
 */