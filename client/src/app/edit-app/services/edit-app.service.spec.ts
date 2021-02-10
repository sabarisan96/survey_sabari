import { TestBed } from '@angular/core/testing';

import { EditAppService } from './edit-app.service';

describe('EditAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditAppService = TestBed.get(EditAppService);
    expect(service).toBeTruthy();
  });
});
