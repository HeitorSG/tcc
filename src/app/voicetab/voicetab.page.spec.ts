import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoicetabPage } from './voicetab.page';

describe('VoicetabPage', () => {
  let component: VoicetabPage;
  let fixture: ComponentFixture<VoicetabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicetabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoicetabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
