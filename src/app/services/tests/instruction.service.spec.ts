import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InstructionService } from '../instruction.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InstructionService', () => {
  let service: InstructionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(InstructionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
