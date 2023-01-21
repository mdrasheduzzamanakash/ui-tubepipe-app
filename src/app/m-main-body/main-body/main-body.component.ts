import { Component, Inject, inject, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.serveice';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit {

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig) { }

  ngOnInit(): void {
    console.log(this.config)
  }

}
