import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Contact} from './contact';
import {ApiService} from './api.service';
import {ContactDetailComponent} from './contact-detail.component';

@Component({
    selector: 'contact-list',
    directives: [ContactDetailComponent],
    providers: [ApiService],
    template: `
        <table>
            <caption>{{title}}</caption>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            <tr *ngFor="#contact of contacts" (click)="onSelect(contact)">
                <td>{{contact.id}}</td>
                <td>{{contact.firstName}}</td>
                <td>{{contact.lastName}}</td>
            </tr>
        </table>
    `,
    styles: [`
        table {
            border-collapse: collapse;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }

        th, td {
            text-align: left;
            padding: 8px;
        }

        tr {
            cursor: pointer;
        }

        tr:hover {
            color: #369;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
    `]
})
export class ContactListComponent implements OnInit {
    public title: string = 'Contact List'; // Type not really needed here (inferred based on string value given).
    public contacts: Contact[] = []; // List of contacts we will display.

    /**
     * ContactListComponent Constructor.
     *
     * @param {Router} _router - Private Router injected into this component.
     * @param {ApiService} _apiService - Private ApiService injected into this component.
     * Note: Underscore convention in Angular 2 signifies a private variable.
     */
    constructor(private _router: Router, private _apiService: ApiService) {}

    /**
     * Lifecycle Hook: ngOnInit - after the first ngOnChanges.
     * More Info: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
     */
    ngOnInit() {
        this._apiService.getContacts().subscribe(res => res.json().hits.hits.forEach(c => this.contacts.push(c._source)));
    }

    /**
     * Callback for clicking on a contact.
     */
    onSelect(contact: Contact) {
        this._router.navigate(['ContactDetail', { id: contact.id }]);
    }
}