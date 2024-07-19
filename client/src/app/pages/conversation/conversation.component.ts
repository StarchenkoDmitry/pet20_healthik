import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationPage {
  activatedRoute = inject(ActivatedRoute);

  chatId!: string;

  ngOnInit() {
    this.chatId = this.activatedRoute.snapshot.paramMap.get('chatId') ?? '';
  }
}
