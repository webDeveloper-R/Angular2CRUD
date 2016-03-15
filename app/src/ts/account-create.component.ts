import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {ApiService} from './api.service';

@Component({
    selector: 'create',
    directives: [ROUTER_DIRECTIVES],
    template: `
        <h4>Create Account</h4>

        <form #f="ngForm" (ngSubmit)="onSubmit(email.value, password.value)">
            <label for="email">Email</label>
            <input type="email" #email id="email" required>
            
            <label for="password">Password</label>
            <input type="password" #password required>

            <button type="submit">Submit</button>
            <button (click)="navLogin()">Goto Login Page</button>
        </form>
    `
})
export class AccountCreateComponent {

    /**
     * CreateComponent Constructor.
     *
     * @param {Router} _router - Private Router injected into this component.
     * @param {ApiService} _apiService - Private ApiService injected into this component.
     * Note: Underscore convention in Angular 2 signifies a private variable.
     */
    constructor(private _router: Router,
                private _apiService: ApiService) {}

    /**
     * Submit click handler.
     */
    onSubmit(email, password) {
        this._apiService.createAccount(email, password, success => {
            if (success) {
                this._router.navigate(['Login']);
            }
        });
    }

    /**
     * Navigate to Login page click handler.
     */
    navLogin() {
        this._router.navigate(['Login']);
    }
}