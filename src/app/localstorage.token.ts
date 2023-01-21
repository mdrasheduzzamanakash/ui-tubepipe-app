import { InjectionToken } from "@angular/core";


export const LocalStorageToken = new InjectionToken<Storage>('LocalStorageToken', {
    providedIn: 'root',
    factory () {
        return localStorage;
    }
});