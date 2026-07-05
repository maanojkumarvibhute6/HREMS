import { Routes } from "@angular/router";

import { LoginComponent } from "./pages/login/login";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password";
import { URL_ROUTES } from "../../core/constants/ulrs.constant";

export const AUTH_ROUTES: Routes = [
    {
        path: URL_ROUTES.AUTH.LOGIN,
        component: LoginComponent
    },
    {
        path: URL_ROUTES.AUTH.FORGOT_PASSWORD,
        component: ForgotPasswordComponent
    },
]