import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalStatsPage } from './personal-stats.page';

describe('PersonalStatsPage', () => {
  let component: PersonalStatsPage;
  let fixture: ComponentFixture<PersonalStatsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
