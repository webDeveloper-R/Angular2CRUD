import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {ApiService} from './api.service';
import {Contact} from './contact';

@Component({
    selector: 'contact-detail',
    providers: [ApiService],
    template: `
        <div *ngIf="contact">
            <div class="detail-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">{{contact.firstName}} {{contact.lastName}}</h2>
                </div>

                <div class="mdl-card__supporting-text mdl-color-text--grey-600">
                    Phone Number: (555)555-5555
                    <br>
                    <br>
                    Email: example@example.com
                </div>

                <div class="mdl-card__actions mdl-card--border">
                    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="button" (click)="onEdit()">Edit</button>
                    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="button" (click)="onDelete()">Delete</button>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class ContactDetailComponent implements OnInit {
    public contact: Contact; // Current contact we are viewing.

    /**
     * ContactDetailComponent Constructor.
     *
     * @param {Router} _router - Private Router injected into this component.
     * @param {RouteParams} _routeParams - Private RouteParams injected into this component.
     * @param {ApiService} _apiService - Private ApiService injected into this component.
     * Note: Underscore convention in Angular 2 signifies a private variable.
     */
    constructor(private _router: Router, 
                private _routeParams: RouteParams, 
                private _apiService: ApiService) {}

    /**
     * Lifecycle Hook: ngOnInit - after the first ngOnChanges.
     * More Info: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
     */
    ngOnInit() {
        let id = this._routeParams.get('id'); // 'let' keyword allows block scoping for variables.
        this._apiService.getContact(id).subscribe(contact => this.contact = contact);
    }

    /**
     * Edit contact click callback.
     */
    onEdit() {
        this._router.navigate(['ContactEdit', { id: this.contact.id }]);
    }

    /**
     * Delete contact click callback.
     */
    onDelete() {
        this._apiService.deleteContact(this.contact.id).then(() => this._router.navigate(['Contacts']));
    }
}