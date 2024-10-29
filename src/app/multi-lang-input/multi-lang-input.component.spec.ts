import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLangInputComponent } from './multi-lang-input.component';

describe('MultiLangInputComponent', () => {
  let component: MultiLangInputComponent;
  let fixture: ComponentFixture<MultiLangInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLangInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiLangInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
