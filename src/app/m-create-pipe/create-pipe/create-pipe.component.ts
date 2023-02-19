import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { blog, course, live, pipeModules, youtube } from './module-interface';
import { pipe } from 'rxjs';
import { HomeServiceService } from 'src/app/services/home-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileUploadService } from 'src/app/services/file-uploading.service';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-create-pipe',
  templateUrl: './create-pipe.component.html',
  styleUrls: ['./create-pipe.component.css'],
})
export class CreatePipeComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  authSub: any;
  constructor(private fileUploadService: FileUploadService, private router: Router, private authService: AuthService, private fb: FormBuilder, private api: HomeServiceService, private http: HttpClient) { }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

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

  localStorageUserInfo: any;
  uniquePipeId: string = '';

  ngOnInit(): void {


    this.authSub = this.authService.userLocalStorageInfoObservable.subscribe((data) => {
      this.localStorageUserInfo = data;
      // console.log(this.localStorageUserInfo);
    });

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

    this.uniquePipeId = generateUniqueId();
  }



  showModules: boolean = false;
  buttonDisabled: boolean = true;

  dateCheck() {
    this.valid.date = this.formGroup.get('date')?.value != null;
    // console.log(this.valid);
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
    // console.log(this.valid);
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
  isUpload: boolean = false;
  showFinish: boolean = false;
  introFormHidden: boolean = false;

  onSelect(param: string) {
    this.showModules = false;
    this.introFormHidden = true;
    if (param == 'youtube') {
      this.isBlog = false;
      this.isCourse = false;
      this.isLive = false;
      this.isYoutube = true;
      this.isUpload = false;
    } else if (param == 'blog') {
      this.isBlog = true;
      this.isCourse = false;
      this.isLive = false;
      this.isYoutube = false;
      this.isUpload = false;
    } else if (param == 'course') {
      this.isCourse = true;
      this.isBlog = false;
      this.isLive = false;
      this.isUpload = false;
      this.isYoutube = false;
    } else if (param == 'live') {
      this.isLive = true;
      this.isBlog = false;
      this.isCourse = false;
      this.isUpload = false;
      this.isYoutube = false;
    } else if (param == 'upload') {
      this.isUpload = true;
      this.isBlog = false;
      this.isCourse = false;
      this.isLive = false;
      this.isYoutube = false;
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
    } else if (param == 'upload') {
      this.isUpload = false;
    }
  }

  pipeModules: pipeModules = {
    youtube: [],
    blog: [],
    course: [],
    live: [],
    upload: [],
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
      sequence: 0,
      category: 'youtube'
    };
    this.pipeModules.youtube.push(youtube);
    if (isFinished) {
      this.onFinish();
    } else {
      this.showModules = true;
    }
  }

  validYoutube = {
    title: false,
    link: false,
    note: false,
    rangeStart: false,
    rangeEnd: false,
  };

  isYoutueButtonDisabled: boolean = true;
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
    if (
      this.validYoutube.title &&
      this.validYoutube.link &&
      this.validYoutube.note &&
      this.validYoutube.rangeStart &&
      this.validYoutube.rangeEnd
    ) {
      this.isYoutueButtonDisabled = false;
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
      sequence: 0,
      category: 'blog'
    };
    this.pipeModules.blog.push(blog);
    if (isFinished) {
      this.onFinish();
    } else {
      this.showModules = true;
    }
  }

  validBlog = {
    title: false,
    link: false,
    note: false,
  };

  isBlogButtonDisabled: boolean = true;
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
    if (this.validBlog.title && this.validBlog.link && this.validBlog.note) {
      this.isBlogButtonDisabled = false;
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
      sequence: 0,
      category: 'course'
    };

    this.pipeModules.course.push(course);
    if (isFinished) {
      this.onFinish();
    } else {
      this.showModules = true;
    }
  }

  validCourse = {
    title: false,
    link: false,
    note: false,
    isPaid: false,
    price: false,
  };

  isCourseButtonDisabled: boolean = true;
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
    if (
      this.validCourse.title &&
      this.validCourse.link &&
      this.validCourse.note &&
      this.validCourse.isPaid &&
      this.validCourse.price
    ) {
      this.isCourseButtonDisabled = false;
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
      sequence: 0,
      category: 'live'
    };
    this.pipeModules.live.push(live);
    if (isFinished) {
      this.onFinish();
    } else {
      this.showModules = true;
    }
  }

  validLive = {
    title: false,
    link: false,
    note: false,
  };

  isLiveButtonDisabled: boolean = true;
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
    if (this.validLive.title && this.validLive.link && this.validLive.note) {
      this.isLiveButtonDisabled = false;
    }
  }



  // for upload

  uploadForm = new FormGroup({
    title: new FormControl('',),
    link: new FormControl('',),
    note: new FormControl('',),
    name: new FormControl('',),
    avatar: new FormControl(null),
  });

  onUploadAdd(isFinished: boolean) {
    let upload: any = {
      title: this.uploadForm.get('title')?.value!,
      link: this.uploadForm.get('link')?.value!,
      note: this.uploadForm.get('note')?.value!,
      name: this.uploadForm.get('name')?.value!,
      pipe_id: this.uniquePipeId,
      sequence: 0,
      category: 'upload',
      download_link: '',
    };
    if (isFinished) {
      this.handleUpload(upload, true);
    } else {
      this.handleUpload(upload, false);
      this.showModules = true;
    }
  }
  preview: string = '';

  percentDone: any = 0;
  uploadFile(event: any) {
    //@ts-ignore
    const file = (event.target as HTMLInputElement).files[0];

    this.uploadForm.patchValue({
      //@ts-ignore
      avatar: file
    });
    //@ts-ignore
    this.uploadForm.get('avatar').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  validUpload = {
    title: false,
    link: false,
    note: false,
  };

  isUploadButtonDisabled: boolean = true;
  onChangeUpload(event: Event) {
    const name: string = (event.target as HTMLInputElement).name;
    // console.log('changing')
    if (name == 'title') {
      this.validUpload.title =
        (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'link') {
      this.validUpload.link = (event.target as HTMLInputElement).value.length > 0;
    } else if (name == 'note') {
      this.validUpload.note = (event.target as HTMLInputElement).value.length > 0;
    }
    if (this.validUpload.title && this.validUpload.link && this.validUpload.note) {
      this.isUploadButtonDisabled = false;
    }
  }

  handleUpload(upload: any, isFinish : boolean = false) {
    
    this.fileUploadService.addUser(
      //@ts-ignore
      this.uploadForm.value.name,
      this.uploadForm.value.avatar,
      this.uploadForm.value.title,
      this.uploadForm.value.link,
      this.uploadForm.value.note,
      this.uniquePipeId
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          // console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          // console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          //@ts-ignore
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          upload.download_link = event.body.userCreated.download_link;
          this.pipeModules.upload.push(upload);
          if(isFinish) this.onFinish(upload.pipe_id);
          return;
      }
    })
  }

  onFinish(paramId: any = null) {
    let finalPipe: any = {
      id: paramId,
      title: this.formGroup.get('title')?.value!,
      description: this.formGroup.get('description')?.value!,
      date: this.formGroup.get('date')?.value!,
      tags: this.tags,
      modules: this.pipeModules,
      url: this.localStorageUserInfo.profile_pic,
      likes: 0,
      dislikes: 0,
      comments: [],
      impactFactor: 0,
      isHidden: false,
      isDeleted: false,
      author: this.localStorageUserInfo.email,
    };

    console.log("final pipe ----- > " , finalPipe)
    this.api.postPipe(finalPipe).subscribe(data => {
      this.isYoutube = false;
      this.isBlog = false;
      this.isLive = false;
      this.isCourse = false;
      this.introFormHidden = false;
      this.formGroup.reset();
      this.blogForm.reset();
      this.courseForm.reset();
      this.liveForm.reset();
      this.tags = [];
      this.pipeModules = {
        youtube: [],
        blog: [],
        course: [],
        live: [],
        upload: [],
      };
      this.router.navigate(['/pipes']);
    })
  }
}


function generateUniqueId(): string {
  let id = '';
  for (let i = 0; i < 20; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
}

