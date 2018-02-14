import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnifeCreateComponent } from './knife-create.component';

describe('KnifeCreateComponent', () => {
  let component: KnifeCreateComponent;
  let fixture: ComponentFixture<KnifeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnifeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnifeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
