import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean;
  constructor(private loaderService: ApiService) {
    this.loaderService.isLoading.subscribe((res) => {
      this.loading = res;
    });
  }
  ngOnInit() {
  }

}