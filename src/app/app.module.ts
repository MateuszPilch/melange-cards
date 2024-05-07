import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionsDetailsComponent } from './components/questions/questions-details/questions-details.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    QuestionsComponent,
    QuestionsDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
      provideFirebaseApp(() => initializeApp(environment)),
      provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
