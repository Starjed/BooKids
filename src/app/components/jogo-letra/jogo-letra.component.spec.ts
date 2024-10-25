import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoLetraComponent } from './jogo-letra.component';

describe('JogoLetraComponent', () => {
  let component: JogoLetraComponent;
  let fixture: ComponentFixture<JogoLetraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogoLetraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JogoLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
