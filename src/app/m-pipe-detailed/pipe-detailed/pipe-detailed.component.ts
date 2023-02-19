import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  youtube,
  blog,
  live,
  course,
} from 'src/app/m-create-pipe/create-pipe/module-interface';
import { AuthService } from 'src/app/services/auth.service';
import { HomeServiceService } from 'src/app/services/home-service.service';

@Component({
  selector: 'app-pipe-detailed',
  templateUrl: './pipe-detailed.component.html',
  styleUrls: ['./pipe-detailed.component.css'],
})
export class PipeDetailedComponent implements OnInit, OnDestroy {
  id: string = '';
  pipeDetails: any;
  youtubeModules: youtube[] = [];
  blogModules: blog[] = [];
  liveModules: live[] = [];
  courseModules: course[] = [];
  uplaodModules: any[] = [];
  allModules: any[] = [];

  sub: any;
  httpSub: any;
  authSub: any;
  loggedInSub : any;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeServiceService, 
    private authService : AuthService
  ) { }

  onClickYoutube(link: string) {
    window.open(link, '_blank');
  }

  onClickUpload(link: string) {
    link = 'http://localhost:4010/api/compresspdf/download/' + link;
    window.open(link, '_blank');
  }

  onClickCourse(link: string) {
    window.open(link, '_blank');
  }

  onClickBlog(link: string) {
    window.open(link, '_blank');
  }

  deleteClick(module: any) {
    if (module.category === 'youtube') {
      this.youtubeModules = this.youtubeModules.filter((item) => item !== module);
    } else if (module.category === 'blog') {
      this.blogModules = this.blogModules.filter((item) => item !== module);
    } else if (module.category === 'live') {
      this.liveModules = this.liveModules.filter((item) => item !== module);
    } else if (module.category === 'course') {
      this.courseModules = this.courseModules.filter((item) => item !== module);
    } else if(module.category === 'upload') {
      this.courseModules = this.courseModules.filter((item) => item !== module);
    }
    this.pipeDetails.modules = {
      youtube: this.youtubeModules,
      blog: this.blogModules,
      live: this.liveModules,
      course: this.courseModules,
      upload: this.uplaodModules
    };
    this.allModules = [];
    for(let i = 0;i < this.pipeDetails.modules.youtube.length;i++) {
      this.allModules.push(this.pipeDetails.modules.youtube[i]);
    }
    for(let i = 0;i < this.pipeDetails.modules.blog.length;i++) {
      this.allModules.push(this.pipeDetails.modules.blog[i]);
    }
    for(let i = 0;i < this.pipeDetails.modules.live.length;i++) {
      this.allModules.push(this.pipeDetails.modules.live[i]);
    }
    for(let i = 0;i < this.pipeDetails.modules.course.length;i++) {
      this.allModules.push(this.pipeDetails.modules.course[i]);
    }
    for(let i = 0;i < this.pipeDetails.modules.upload.length;i++) {
      this.allModules.push(this.pipeDetails.modules.upload[i]);
    }
    sortAllModules(this.allModules);
    this.httpSub = this.homeService.updatePipe(this.pipeDetails._id, this.pipeDetails).subscribe((data) => {
      console.log(data);
    });
  }

  editClick(module: any) {
    throw new Error('Method not implemented.');
  }

  localStorageUserInfo : any;
  isEnrolled : boolean = false;
  enrolledPipeIdInMongo: string = '';
  isLoggedIn : boolean = false;

  clickOnEnroll() {
    this.homeService.addToEnrolled(this.pipeDetails._id).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  clickOnUnEnroll() {
    this.homeService.removeFromEnrolled(this.enrolledPipeIdInMongo).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.authSub = this.authService.userLocalStorageInfoObservable.subscribe((data) => {
      this.localStorageUserInfo = data;
    });
    this.loggedInSub = this.authService.isLoggedIn.subscribe(x => this.isLoggedIn = x);
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.httpSub = this.homeService
      .getSinglePipe(this.id)
      .subscribe((data) => {
        this.pipeDetails = data;
        this.youtubeModules = this.pipeDetails.modules.youtube;
        this.blogModules = this.pipeDetails.modules.blog;
        this.liveModules = this.pipeDetails.modules.live;
        this.courseModules = this.pipeDetails.modules.course;
        this.uplaodModules = this.pipeDetails.modules.upload;
        this.allModules = [
          ...this.youtubeModules,
          ...this.blogModules,
          ...this.liveModules,
          ...this.courseModules,
          ...this.uplaodModules
        ];
        // console.log(this.allModules);
        sortAllModules(this.allModules);
        this.isEnrolled = false;
        this.homeService.getAllEnrolled().subscribe((data) => {
          let enrolledPipes = data;
          for(let i = 0; i < enrolledPipes.length; i++) {
            if(enrolledPipes[i].pipeId === this.pipeDetails._id && enrolledPipes[i].email === this.localStorageUserInfo.email) {
              this.isEnrolled = true;
              this.enrolledPipeIdInMongo = enrolledPipes[i]._id;
              break; 
            }
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.httpSub.unsubscribe();
    this.authSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }
}

function sortAllModules(allModules: any[]) {
  allModules.sort((a, b) => (a.sequence > b.sequence ? 1 : -1));
}
