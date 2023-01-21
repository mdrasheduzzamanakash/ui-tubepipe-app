import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppConfig } from "./appconfig.interface";

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.service.config');


export const APP_CONFIG: AppConfig = {
    apiendpoint: environment.apiendpoint
}