import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Clubber } from 'projects/insite-kit/src/model/clubber.model';
import { RequestService } from 'projects/insite-kit/src/service/request/request.service';
import { of } from 'rxjs';
import { FBAwanaTestBed } from 'src/test/test-bed';
import { setupTests } from 'src/test/test-setup';
import { ClubberService } from './clubber.service';

describe('ClubberService', () => {
  let service: ClubberService;
  let requestService: RequestService;

  setupTests(async () => FBAwanaTestBed.setup());

  beforeEach(() => {
    service = TestBed.inject(ClubberService);
    requestService = TestBed.inject(RequestService);

    spyOn(requestService, 'get').and.returnValue(of(new HttpResponse({})));
    spyOn(requestService, 'post');
  });

  it('should call get clubbers endpoint', () => {
    const userMap = new Map().set('id', 1);
    service.get(userMap);

    expect(requestService.get).toHaveBeenCalledWith('api/clubbers', userMap);
  });

  it('should call get user by id endpoint', () => {
    service.getById(1);
    expect(requestService.get).toHaveBeenCalledWith('api/clubbers/1');
  });

  it('should call endpoint to create new clubber', () => {
    const newClubber: Clubber = {
      firstName: 'Test',
      lastName: 'Test',
    };

    service.create(newClubber);
    expect(requestService.post).toHaveBeenCalledWith(
      'api/clubbers',
      newClubber
    );
  });
});
