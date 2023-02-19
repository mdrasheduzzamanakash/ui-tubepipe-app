import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.serveice';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { AuthService } from 'src/app/services/auth.service';
import { HomeServiceService } from '../../services/home-service.service';
import { SinglePipe } from '../Pipe.interface';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit, OnDestroy {


  pipeList: SinglePipe[] = [];
  sub: any;
  subAuth: any;
  sublocalStorage: any;
  isLoggedIn: boolean = false;
  localStorageInfo: any = null;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private HomeServiceService: HomeServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.sublocalStorage = this.authService.userLocalStorageInfoObservable.subscribe(x => {
      this.localStorageInfo = x;
      // console.log(x);
    });

    this.subAuth = this.authService.isLoggedIn.subscribe(x => this.isLoggedIn = x);
    this.sub = this.HomeServiceService.getPipes().subscribe((data) => {
      // console.log(data);
      this.pipeList = data;
    });
  }

  onClickLikeButton(_id: string) {
    const pipe = this.pipeList.find(x => x._id === _id);
    if (pipe && this.isLoggedIn) {
      pipe.likes += 1;
      this.HomeServiceService.updatePipe(_id, pipe).subscribe((data) => {
        this.pipeList.splice(this.pipeList.indexOf(pipe), 1, data);
      });
    }
  }

  onClickDisLikeButton(_id: string) {
    const pipe = this.pipeList.find(x => x._id === _id);
    if (pipe && this.isLoggedIn) {
      pipe.dislikes += 1;
      this.HomeServiceService.updatePipe(_id, pipe).subscribe((data) => {
        this.pipeList.splice(this.pipeList.indexOf(pipe), 1, data);
        this.ngOnInit();
      });
    }
  }

  onClickDelete(_id: string) {
    this.HomeServiceService.deletePipe(_id).subscribe((data) => {
      // console.log(data);
      this.pipeList = this.pipeList.filter(x => x._id !== _id);
      this.ngOnInit();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subAuth.unsubscribe();
    this.sublocalStorage.unsubscribe();
  }
}
