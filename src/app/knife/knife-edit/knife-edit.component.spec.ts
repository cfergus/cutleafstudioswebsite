import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnifeEditComponent } from './knife-edit.component';

describe('KnifeEditComponent', () => {
  let component: KnifeEditComponent;
  let fixture: ComponentFixture<KnifeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnifeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnifeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
