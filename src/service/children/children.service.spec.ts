import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Child } from 'projects/insite-kit/src/model/user.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { of } from 'rxjs';
import { FBLChurchTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { ChildrenService } from './children.service';

describe('ChildrenService', () => {
  let service: ChildrenService;
  let requestService: RequestService;

  setupTests(async () => FBLChurchTestBed.setup());

  beforeEach(() => {
    service = TestBed.inject(ChildrenService);
    requestService = TestBed.inject(RequestService);

    spyOn(requestService, 'get').and.returnValue(of(new HttpResponse({})));
    spyOn(requestService, 'post');
  });

  it('should call get children endpoint', () => {
    const userMap = new Map().set('id', 1);
    service.get(userMap);

    expect(requestService.get).toHaveBeenCalledWith('api/children', userMap);
  });

  it('should call get user by id endpoint', () => {
    service.getById(1);
    expect(requestService.get).toHaveBeenCalledWith('api/children/1');
  });

  it('should call endpoint to create new child', () => {
    const newChild: Child = {
      firstName: 'Test',
      lastName: 'Test',
    };

    service.create(newChild);
    expect(requestService.post).toHaveBeenCalledWith('api/children', newChild);
  });
});
