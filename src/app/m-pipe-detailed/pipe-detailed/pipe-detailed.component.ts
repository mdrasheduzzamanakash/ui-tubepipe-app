import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  youtube,
  blog,
  live,
  course,
} from 'src/app/m-create-pipe/create-pipe/module-interface';
import { PipeDetailsServiceService } from '../pipe-details-service.service';

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
  allModules: any[] = [];

  sub: any;
  httpSub: any;

  constructor(
    private route: ActivatedRoute,
    private pipeDetailsService: PipeDetailsServiceService
  ) { }

  onClickYoutube(link: string) {
    window.open(link, '_blank');
  }

  onClickCourse(link: string) {
    window.open(link, '_blank');
  }

  onClickBlog(link: string) {
    window.open(link, '_blank');
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.httpSub = this.pipeDetailsService
      .getPipeDetails(this.id)
      .subscribe((data) => {
        this.pipeDetails = data;
        this.youtubeModules = this.pipeDetails.modules.youtube;
        this.blogModules = this.pipeDetails.modules.blog;
        this.liveModules = this.pipeDetails.modules.live;
        this.courseModules = this.pipeDetails.modules.course;
        this.allModules = [
          ...this.youtubeModules,
          ...this.blogModules,
          ...this.liveModules,
          ...this.courseModules,
        ];
        console.log(this.allModules);
        sortAllModules(this.allModules);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.httpSub.unsubscribe();
  }
}

function sortAllModules(allModules: any[]) {
  allModules.sort((a, b) => (a.sequence > b.sequence ? 1 : -1));
}
