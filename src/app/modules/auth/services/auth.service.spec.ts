import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import * as mockRaw from "../../../data/user.json"
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default;
  let httpClientSpy: {post: jasmine.Spy}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('🔴 Should retrun an object with "data" and "tokenSession"',(done: DoneFn)=>{

    const user: any = mockUser.userOk;
    const mockResponse = {
      data: {},
      tokenSession: '0x0x0x0'
    }
    httpClientSpy.post.and.returnValue(
      of(mockResponse)
    )

    service.sendCredentials(user.email, user.password)
      .subscribe(res => {
        const getProperties= Object.keys(res);
        expect(getProperties).toContain('data')
        expect(getProperties).toContain('tokenSession');
        done();
      })
  })
});
