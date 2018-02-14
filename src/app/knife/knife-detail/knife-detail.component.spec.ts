import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnifeDetailComponent } from './knife-detail.component';

describe('KnifeDetailComponent', () => {
  let component: KnifeDetailComponent;
  let fixture: ComponentFixture<KnifeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnifeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnifeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
