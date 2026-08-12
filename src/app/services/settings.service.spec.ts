import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('defaults to classic theme and serif font', () => {
    expect(service.currentTheme()).toBe('classic');
    expect(service.currentFont()).toBe('serif');
  });

  it('updates theme and font', () => {
    service.setTheme('jade');
    service.setFont('kai');

    expect(service.currentTheme()).toBe('jade');
    expect(service.currentFont()).toBe('kai');
    expect(service.fontFamily()).toContain('Ma Shan Zheng');
  });
});
