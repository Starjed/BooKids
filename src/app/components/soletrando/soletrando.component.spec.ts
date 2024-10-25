import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoletrandoComponent } from './soletrando.component';

describe('SoletrandoComponent', () => {
  let component: SoletrandoComponent;
  let fixture: ComponentFixture<SoletrandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoletrandoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoletrandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
