import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedMaterialsComponent } from './assigned-materials.component';

describe('AssignedMaterialsComponent', () => {
  let component: AssignedMaterialsComponent;
  let fixture: ComponentFixture<AssignedMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedMaterialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
