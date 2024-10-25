import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacaPalavrasComponent } from './caca-palavras.component';

describe('CacaPalavrasComponent', () => {
  let component: CacaPalavrasComponent;
  let fixture: ComponentFixture<CacaPalavrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacaPalavrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CacaPalavrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
