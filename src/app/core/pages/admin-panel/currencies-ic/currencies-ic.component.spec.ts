import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesICComponent } from './currencies-ic.component';

describe('CurrenciesICComponent', () => {
  let component: CurrenciesICComponent;
  let fixture: ComponentFixture<CurrenciesICComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesICComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesICComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
