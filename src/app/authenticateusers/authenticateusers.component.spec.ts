import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateusersComponent } from './authenticateusers.component';

describe('AuthenticateusersComponent', () => {
  let component: AuthenticateusersComponent;
  let fixture: ComponentFixture<AuthenticateusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
