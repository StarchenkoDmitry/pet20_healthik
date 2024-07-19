import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from '@common/constants/chat';
import { Router } from '@angular/router';
import { isString } from '@shared/utils/check';
import { ChatService } from '@core/chat/chat.service';

@Component({
  selector: 'app-new-conversation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FloatLabelModule,
    InputTextModule,

    InputTextareaModule,

    ButtonModule,
  ],
  templateUrl: './new-conversation.component.html',
  styleUrl: './new-conversation.component.scss',
})
export class NewConversationPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  chatService = inject(ChatService);

  form = this.fb.group({
    title: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(MIN_TITLE_LENGTH),
        Validators.maxLength(MAX_TITLE_LENGTH),
      ],
    }),
    description: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(MIN_DESCRIPTION_LENGTH),
        Validators.maxLength(MAX_DESCRIPTION_LENGTH),
      ],
    }),
  });

  get title() {
    return this.form.controls['title'];
  }

  get description() {
    return this.form.controls['description'];
  }

  get minTitleLanght() {
    return MIN_TITLE_LENGTH;
  }

  get maxTitleLanght() {
    return MAX_TITLE_LENGTH;
  }

  get minDescriptionLanght() {
    return MIN_DESCRIPTION_LENGTH;
  }

  get maxDescriptionLanght() {
    return MAX_DESCRIPTION_LENGTH;
  }

  loading = false;

  async onSubmit() {
    if (!this.form.valid) return;

    const { title, description } = this.form.value;

    if (!isString(title) || !isString(description)) return;

    if (this.loading) return;
    this.loading = true;

    this.chatService.createConversation({ title, description })
    .subscribe({
      next: (result) => {
        this.loading = false;
        this.router.navigate([`/conversation/${result.chatId}`]);
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}
