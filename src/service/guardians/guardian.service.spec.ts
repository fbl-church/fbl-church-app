import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { of } from 'rxjs';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { GuardianService } from './guardian.service';

describe('GuardianService', () => {
  let service: GuardianService;
  let requestService: RequestService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    service = TestBed.inject(GuardianService);
    requestService = TestBed.inject(RequestService);

    spyOn(requestService, 'get').and.returnValue(of(new HttpResponse({})));
    spyOn(requestService, 'post');
  });

  it('should call get guardians endpoint', () => {
    const userMap = new Map().set('id', 1);
    service.get(userMap);

    expect(requestService.get).toHaveBeenCalledWith('api/guardians', userMap);
  });
});
