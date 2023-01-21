import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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
  constructor(private fb: FormBuilder) { }

  valid = {
    title: false,
    description: false,
    date: false,
    tag: false,
  }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [{ name: 'Angular' }, { name: 'Javascript' }, { name: 'React' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();

    if(this.tags.length == 0)this.valid.tag = false;
    else this.valid.tag = true;
    if(this.valid.title && this.valid.description && this.valid.date && this.valid.tag) {
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
    if(this.tags.length == 0)this.valid.tag = false;
    if(this.valid.title && this.valid.description && this.valid.date && this.valid.tag) {
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


  onPipeCreate() {
    console.log(this.formGroup.getRawValue());
    this.showModules = true;
  }

  dateCheck() {
    this.valid.date = this.formGroup.get('date')?.value != null;
    console.log(this.valid);
    if(this.valid.title && this.valid.description && this.valid.date && this.valid.tag) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  onChange(event: Event) {
    const name : string = (event.target as HTMLInputElement).name;
    if(name == "title") {
      this.valid.title = (event.target as HTMLInputElement).value.length > 0;
    } else if(name == "description") {
      this.valid.description = (event.target as HTMLInputElement).value.length > 0;
    }
    this.valid.tag = this.tags.length > 0;
    if(this.valid.title && this.valid.description && this.valid.date && this.valid.tag) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
    console.log(this.valid);
  }

  onCancel() {
    this.showModules = false;
    
  }
}
