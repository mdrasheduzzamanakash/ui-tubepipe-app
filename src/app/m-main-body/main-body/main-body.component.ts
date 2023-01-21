import { Component, Inject, inject, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.serveice';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { HomeServiceService } from '../home-service.service';
import { SinglePipe } from '../Pipe.interface';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit {

  pipeList : SinglePipe[] = [];

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private HomeServiceService: HomeServiceService
  ) { }

  ngOnInit(): void {
    this.HomeServiceService.getPipes().subscribe((data: SinglePipe[]) => {
      this.pipeList = data;
    });
  }
}
