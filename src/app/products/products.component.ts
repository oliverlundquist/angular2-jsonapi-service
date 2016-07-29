import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Rx from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'app-products',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css']
})
export class ProductsComponent implements OnInit {
    private http: Http;

    constructor(http: Http) {
        this.http = http;

    }

    ngOnInit() {
        const url = 'http://localhost:8000/shops/xtralars/products';
        var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzMzcsImlhdCI6MTQ2OTYxNzEzNDA1OCwiZXhwIjoxNDY5ODc2MzM0MDU4LCJuYmYiOjE0Njk2MTcxMzQwNTgsImlzcyI6Imh0dHBzOi8vbG9naW4ubXlzdG9yZS5ubyIsImp0aSI6Ijk0ZTZiZjFkMmIyM2M0OWFjMzI5MjFhMmRlYTM4ODk0Iiwibm9fbXlzdG9yZV9ob3N0cyI6WyJ4dHJhbGFycyJdLCJub19teXN0b3JlX3Njb3BlcyI6WyJyZWFkOm9yZyJdfQ.sN6MXo_cLEHGKhYZBRMBTscsBbRAPooLELQWpwi4JbQ';
        var authHeader = new Headers();
        authHeader.append('Authorization', 'Bearer ' + jwt);
        authHeader.append('Content-Type', 'application/json');

        this.http
            .get(url, { headers: authHeader })
            .flatMap((response) => {
            // .map((response) => {
                let data = response.json().data;
                let flattenedData = data.map((_data) => {
                    return {
                        id: parseInt(_data.id, 10),
                        price: _data.attributes.price
                    }
                });
                // return flattenedData;
                // return [flattenedData];
                return Rx.Observable.of(...flattenedData);
            })
            .take(2)
            .subscribe((response) => {
                console.log(response);
            });
    }

}
