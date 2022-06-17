import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeBaseComponent } from './user-home-base.component';

describe('UserHomeBaseComponent', () => {
  let component: UserHomeBaseComponent;
  let fixture: ComponentFixture<UserHomeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHomeBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
