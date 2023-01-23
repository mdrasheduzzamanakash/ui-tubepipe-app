import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { blog, course, live, pipeModules, youtube } from './module-interface';
import { pipe } from 'rxjs';
import { HomeServiceService } from 'src/app/m-main-body/home-service.service';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-create-pipe',
  templateUrl: './create-pipe.component.html',
  styleUrls: ['./create-pipe.component.css'],
})
export class CreatePipeComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder, private api: HomeServiceService) { }

  valid = {
    title: false,
    description: false,
    date: false,
    tag: false,
  };

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [
    { name: 'Angular' },
    { name: 'Javascript' },
    { name: 'React' },
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();

    if (this.tags.length == 0) this.valid.tag = false;
    else this.valid.tag = true;
    if (
      this.valid.title &&
      this.valid.description &&
      this.valid.date &&
      this.valid.tag
    ) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    if (this.tags.length == 0) this.valid.tag = false;
    if (
      this.valid.title &&
      this.valid.description &&
      this.valid.date &&
      this.valid.tag
    ) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: new FormControl(''),
      title: new FormControl(''),
      author: new FormControl(''),
      description: new FormControl(''),
      likes: new FormControl(''),
      dislikes: new FormControl(''),
      url: new FormControl(''),
      tags: new FormControl(''),
      comments: new FormControl(''),
      date: new FormControl(''),
      module_ids: new FormControl(''),
      impactFactor: new FormControl(''),
      isHidden: new FormControl(''),
      isDeleted: new FormControl(''),
    });
  }

  showModules: boolean = false;
  buttonDisabled: boolean = true;

  dateCheck() {
    this.valid.date = this.formGroup.get('date')?.value != null;
    console.log(this.valid);
    if (
      this.valid.title &&
      this.valid.description &&
      this.valid.date &&
      this.valid.tag
    ) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  onChange(event: Event) {
    const name: string = (event.target as HTMLInputElement).name;
    if (name == 'title') {
      this.valid.title = (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'description') {
      this.valid.description =
        (event.target as HTMLInputElement).value.length > 0;
    }
    this.valid.tag = this.tags.length > 0;
    if (
      this.valid.title &&
      this.valid.description &&
      this.valid.date &&
      this.valid.tag
    ) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
    console.log(this.valid);
  }

  onPipeCreate() {
    this.showModules = true;
  }

  // now we have to add the modules to the pipe
  // we have to add the modules to the pipeModules
  // we have to add the pipeModules to the pipe
  // we have to add the pipe to the database

  // ui controls for the modules
  isYoutube: boolean = false;
  isBlog: boolean = false;
  isCourse: boolean = false;
  isLive: boolean = false;
  showFinish: boolean = false;
  introFormHidden: boolean = false;

  onSelect(param: string) {
    this.showModules = false;
    this.introFormHidden = true;
    if (param == 'youtube') {
      this.isYoutube = true;
    } else if (param == 'blog') {
      this.isBlog = true;
    } else if (param == 'course') {
      this.isCourse = true;
    } else if (param == 'live') {
      this.isLive = true;
    }
  }

  onCancel(param: string) {
    this.showModules = false;
    this.introFormHidden = false;
    if (param == 'youtube') {
      this.isYoutube = false;
    } else if (param == 'blog') {
      this.isBlog = false;
    } else if (param == 'course') {
      this.isCourse = false;
    } else if (param == 'live') {
      this.isLive = false;
    }
  }

  pipeModules: pipeModules = {
    youtube: [],
    blog: [],
    course: [],
    live: [],
  };

  // for youtube
  youtubeForm = this.fb.group({
    title: new FormControl(''),
    link: new FormControl(''),
    note: new FormControl(''),
    rangeStart: new FormControl(''),
    rangeEnd: new FormControl(''),
  });

  onYoutubeAdd(isFinished: boolean) {
    let youtube: youtube = {
      title: this.youtubeForm.get('title')?.value!,
      link: this.youtubeForm.get('link')?.value!,
      note: this.youtubeForm.get('note')?.value!,
      rangeStart: +this.youtubeForm.get('rangeStart')?.value!,
      rangeEnd: +this.youtubeForm.get('rangeEnd')?.value!,
    };
    this.pipeModules.youtube.push(youtube);
    if (isFinished) {
      this.onFinish();
    }
  }

  validYoutube = {
    title: false,
    link: false,
    note: false,
    rangeStart: false,
    rangeEnd: false,
  };

  isYoutueButtonDisabled: boolean = false;
  onChangeYoutube(event: Event) {
    const name: string = (event.target as HTMLInputElement).name;
    if (name == 'title') {
      this.validYoutube.title =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'link') {
      this.validYoutube.link =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'note') {
      this.validYoutube.note =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'rangeStart') {
      this.validYoutube.rangeStart =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'rangeEnd') {
      this.validYoutube.rangeEnd =
        (event.target as HTMLInputElement).value.length > 0;
    }
  }

  // for blog
  blogForm = this.fb.group({
    title: new FormControl(''),
    link: new FormControl(''),
    note: new FormControl(''),
  });

  onBlogAdd(isFinished: boolean) {
    let blog: blog = {
      title: this.blogForm.get('title')?.value!,
      link: this.blogForm.get('link')?.value!,
      note: this.blogForm.get('note')?.value!,
    };
    this.pipeModules.blog.push(blog);
    console.log(this.pipeModules);
  }

  validBlog = {
    title: false,
    link: false,
    note: false,
  };

  isBlogButtonDisabled: boolean = false;
  onChangeBlog(event: Event) {
    const name: string = (event.target as HTMLInputElement).name;
    if (name == 'title') {
      this.validBlog.title =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'link') {
      this.validBlog.link = (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'note') {
      this.validBlog.note = (event.target as HTMLInputElement).value.length > 0;
    }
  }

  // for course
  courseForm = this.fb.group({
    title: new FormControl(''),
    link: new FormControl(''),
    note: new FormControl(''),
    isPaid: new FormControl(''),
    price: new FormControl(''),
  });
  onCourseAdd(isFinished: boolean) {
    let course: course = {
      title: this.courseForm.get('title')?.value!,
      link: this.courseForm.get('link')?.value!,
      note: this.courseForm.get('note')?.value!,
      isPaid: this.courseForm.get('isPaid')?.value! == 'true' ? true : false,
      price: +this.courseForm.get('price')?.value!,
    };

    this.pipeModules.course.push(course);
    console.log(this.pipeModules);
  }

  validCourse = {
    title: false,
    link: false,
    note: false,
    isPaid: false,
    price: false,
  };

  isCourseButtonDisabled: boolean = false;
  onChangeCourse(event: Event) {
    const name: string = (event.target as HTMLInputElement).name;
    if (name == 'title') {
      this.validCourse.title =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'link') {
      this.validCourse.link =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'note') {
      this.validCourse.note =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'isPaid') {
      this.validCourse.isPaid =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'price') {
      this.validCourse.price =
        (event.target as HTMLInputElement).value.length > 0;
    }
  }

  // for live

  liveForm = this.fb.group({
    title: new FormControl(''),
    link: new FormControl(''),
    note: new FormControl(''),
  });

  onLiveAdd(isFinished: boolean) {
    let live: live = {
      title: this.liveForm.get('title')?.value!,
      link: this.liveForm.get('link')?.value!,
      note: this.liveForm.get('note')?.value!,
    };
    this.pipeModules.live.push(live);
    console.log(this.pipeModules);
  }

  validLive = {
    title: false,
    link: false,
    note: false,
  };

  isLiveButtonDisabled: boolean = false;
  onChangeLive(event: Event) {
    const name: string = (event.target as HTMLInputElement).name;
    if (name == 'title') {
      this.validLive.title =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'link') {
      this.validLive.link = (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'note') {
      this.validLive.note = (event.target as HTMLInputElement).value.length > 0;
    }
  }

  onFinish() {
    let finalPipe: any = {
      title: this.formGroup.get('title')?.value!,
      description: this.formGroup.get('description')?.value!,
      date: this.formGroup.get('date')?.value!,
      tags: this.tags,
      modules: this.pipeModules,
      url: this.formGroup.get('url')?.value!,
      likes: 0,
      dislikes: 0,
      comments: [],
      impactFactor: 0,
      isHidden: false,
      isDeleted: false,
      author: 'mdrashed@gmail.com',
    };
    this.api.postPipe(finalPipe).subscribe(data => {
      this.isYoutube = false;
      this.isBlog = false;
      this.isLive = false;
      this.isCourse = false;
      this.introFormHidden = false;
    })
  }
}
