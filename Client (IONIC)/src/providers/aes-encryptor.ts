import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare function require(name:string);
import * as CryptoJS from "crypto-js"; 

@Injectable()
export class AESEncryptor {


  constructor() {
    
  }

  public Encrypt(temp:string,myKey:string,myIv:string):string{

    let key = CryptoJS.enc.Utf8.parse(myKey);  
    let iv = CryptoJS.enc.Utf8.parse(myIv);

    let x = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(temp), key,  
                {  
                    keySize: 128 / 8,  
                    iv: iv,  
                    mode: CryptoJS.mode.CBC,  
                    padding: CryptoJS.pad.Pkcs7  
                });  
    return x;

  }

  

}
