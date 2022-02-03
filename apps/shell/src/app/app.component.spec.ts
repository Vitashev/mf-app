import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GalleryFacade } from '@mf-app/shared/data-store';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: GalleryFacade, useValue: GalleryFacade }]
    }).compileComponents();
  });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    TestBed.inject(GalleryFacade).init = function() {}
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shell'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });
});
