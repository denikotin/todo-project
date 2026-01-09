import { CanActivateFn, Router, UrlTree } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { inject } from "@angular/core"

export const nonAuthGuard: CanActivateFn = (route, state): boolean | UrlTree =>{
    
    const auth = inject(AuthService)
    const router = inject(Router)

    if(auth.isLoggedIn()){
        setTimeout(() => {
            router.navigate(['/'], {replaceUrl:true});
        },0);
        return router.createUrlTree(['/']);
    }

    return true

}