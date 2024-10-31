import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as mockRaw from "../../../../data/user.json"

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let mockUser: any = (mockRaw as any).default

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('🔴 Should cover invalid form case', () =>{

    // ----Arrange-----
    const mockCredential = mockUser.userFail;
    const emailForm: AbstractControl<string> = component.formLogin.get('email')!
    const passForm: AbstractControl<string> = component.formLogin.get('password')!
    // ----Arrange-----

    // ---- Act -----
    emailForm.setValue(mockCredential.email);
    passForm.setValue(mockCredential.password);
    // ---- Act -----

    //------Assert------
    expect(component.formLogin.invalid).toBeTrue();
    //------Assert------

  })

  it('🔴 Should cover valid form case', () =>{

    // ----Arrange-----
    const mockCredential = mockUser.userOk;
    const emailForm: AbstractControl<string> = component.formLogin.get('email')!
    const passForm: AbstractControl<string> = component.formLogin.get('password')!
    // ----Arrange-----

    // ---- Act -----
    emailForm.setValue(mockCredential.email);
    passForm.setValue(mockCredential.password);
    // ---- Act -----

    //------Assert------
    expect(component.formLogin.valid).toBeTrue();
    //------Assert------

  })

  it('🔴 The button should have the word "Iniciar Sesión"', ()=>{
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));
    const getInnerText = elementRef.nativeElement.innerText;

    expect(getInnerText).toEqual('Iniciar sesión')
  })
});
