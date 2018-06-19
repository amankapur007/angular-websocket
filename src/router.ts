import { Router, Routes } from "@angular/router";
import { ChatComponent } from "./app/chat/chat.component";

export const routes: Routes = [
    {path: 'chat', component: ChatComponent},
    {path: '', pathMatch: 'full', redirectTo:'/chat'}
]