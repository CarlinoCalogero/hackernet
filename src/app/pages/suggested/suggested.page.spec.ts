import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestedPage } from './suggested.page';

describe('SuggestedPage', () => {
  let component: SuggestedPage;
  let fixture: ComponentFixture<SuggestedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuggestedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
