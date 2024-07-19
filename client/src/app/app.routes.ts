import { Routes } from '@angular/router';
import { AboutUsPage } from '@pages/about-us-page/about-us-page.component';
import { BecomeAdminPage } from '@pages/become-admin-page/become-admin-page.component';
import { ConversationPage } from '@pages/conversation/conversation.component';
import { MainPageComponent } from '@pages/main-page/main-page.component';
import { NewConversationPage } from '@pages/new-conversation/new-conversation.component';
import { ProfilePage } from '@pages/profile-page/profile-page.component';
import { SignupPageComponent } from '@pages/signup-page/signup-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'authorize', component: SignupPageComponent },
  { path: 'become-admin', component: BecomeAdminPage },
  { path: 'about-us', component: AboutUsPage },
  { path: 'profile', component: ProfilePage },
  { path: 'new-conversation', component: NewConversationPage },
  { path: 'conversation/:chatId', component: ConversationPage },
];
