import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArticleSnippetBetterApiComponent } from './article-snippet-better-api.component';

describe('ArticleSnippetBetterApiComponent', () => {
  let component: ArticleSnippetBetterApiComponent;
  let fixture: ComponentFixture<ArticleSnippetBetterApiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSnippetBetterApiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleSnippetBetterApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
