import {Component, OnDestroy} from '@angular/core';
import {fromEvent, Subject, tap} from "rxjs";

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrls: ['./progress-page.component.scss']
})
export class ProgressPageComponent implements OnDestroy {
  progressValue = 0;
  private destroy$ = new Subject<void>();

  constructor() {
    fromEvent(window, 'scroll').pipe(
      tap(() => {
        const scrollPosition = window.scrollY;
        const height = document.body.scrollHeight - document.body.offsetHeight;
        this.progressValue = (scrollPosition * 100) / height;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
