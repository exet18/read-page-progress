import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, Subject, tap} from "rxjs";

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrls: ['./progress-page.component.scss']
})
export class ProgressPageComponent implements OnDestroy {
  @ViewChild('progressElement') progressElement: ElementRef<HTMLProgressElement>
  private destroy$ = new Subject<void>();

  constructor() {
    fromEvent(window, 'scroll').pipe(
      tap(() => {
        const scrollPosition = window.scrollY;
        const height = document.body.scrollHeight - document.body.offsetHeight;
        this.progressElement.nativeElement.value = (scrollPosition * 100) / height;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
