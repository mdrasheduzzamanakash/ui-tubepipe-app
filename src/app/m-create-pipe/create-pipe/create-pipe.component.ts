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
  constructor(private fb: FormBuilder) {}

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
  }

  remove(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
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

  showModules : boolean = false;

  onPipeCreate() {
    console.log(this.formGroup.getRawValue());
    console.log(this.tags);
    this.showModules = true;
  }

  onCancel() {
    console.log('cancel');
  }
}
