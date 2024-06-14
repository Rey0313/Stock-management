import { TestBed } from '@angular/core/testing';

import { NotificationsManagerService } from './notifications-manager.service';

describe('NotificationsManagerService', () => {
  let service: NotificationsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
