import { Routes } from "@angular/router";
import { URL_ROUTES } from "../../core/constants/url.constant";
import { DashboardComponent } from "./pages/dashboard/dashboard";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: URL_ROUTES.HOME.DASHBOARD,
        component: DashboardComponent
    }
]