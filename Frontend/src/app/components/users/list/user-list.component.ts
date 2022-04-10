import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApiService } from '../../../services/api.service';
/**
 * This class represents the lazy loaded VendorComponent.
 */
@Component({
    // moduleId: module.id,
    selector: 'sd-user',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss'],
    // providers: [CsvService]
})
export class UserListComponent implements OnInit, OnDestroy {
    message: string;
    modalReference: NgbModalRef;
    data: any;
    shownouserFlag:boolean;

    //
    apiLink = '';
    searchFlag = false;
    // pagination
    page = 1;
    collectionSize: any;
    pageSize: any;
    lastPage: any;

    users: any[] = [];
    searchItem = '';

    popoverTitle: string = 'Are you sure?';
    popoverMessage: string = 'Are you really sure you want to do this?';
    

    constructor(
        // private _vendors: VendorService, 
        private modalService: NgbModal, private _flashMessagesService: FlashMessagesService,
        private apiService: ApiService,
        private router: Router,private modal: NgbModal
    ) { }

    @ViewChild('popUp') popUp: ElementRef;

    ngOnInit() {
        this.shownouserFlag= false;
        this.getUserList(1);
    }

    ngOnDestroy() {
        if (typeof this.modalReference !== 'undefined') {
            this.modalReference.close();
        }
    }


    searchUsers() {
        this.searchFlag = true;
        this.getUserList(1);
    }

    clearSearch(event: any) {
        this.searchItem = "";
        this.getUserList(1);
    }


    getUserList(pageNumber: any) {
        this.apiLink = 'customers?page=' + pageNumber;
        if (this.searchFlag) {
            this.apiLink = this.apiLink + '&search=' + this.searchItem;
        }
        
        this.apiService.getRequest(this.apiLink).subscribe(
            (res: any) => {
                console.log(res)

                this.shownouserFlag=true;

                if (res.success) {
                    this.users = res.data.data;
                    this.page = pageNumber;
                    this.collectionSize = res.data.pagination.total_items;
                    this.pageSize = res.data.pagination.per_page;
                    this.lastPage = Math.ceil(this.collectionSize / this.pageSize);
                    this.users.forEach(function (item) {
                        item.name = item.first_name + ' ' + item.last_name;
                    });
                }
                
                
                  
                
               
            },
            (err: any) => console.log(err),
        );
    }

    deleteUser(id: any) {
        this.apiService.deleteRequest('customer/' + id).subscribe(
            (res: any) => {
                if (res.success) {
                    this._flashMessagesService.show('Deleted User Successfully!', { cssClass: 'alert-success' });
                    this.getUserList(this.page);
                } else {
                    this._flashMessagesService.show('Failed User Deletion!', { cssClass: 'alert-danger' });
                }
            },
            (err: any) => console.log(err),
        );
    }
}
