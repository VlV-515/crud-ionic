import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectionService {
  private arrPlatform: string[] = [];
  constructor(private platform: Platform) {
    this.setCurrentDevice();
  }
  public isMobile(): boolean {
    return this.arrPlatform.includes('mobile');
  }
  public isMobieWeb(): boolean {
    return this.arrPlatform.includes('mobileweb');
  }
  public isAndroid(): boolean {
    return this.arrPlatform.includes('android');
  }
  public isIos(): boolean {
    return this.arrPlatform.includes('ios');
  }
  public isiPhone(): boolean {
    return this.arrPlatform.includes('iphone');
  }
  public isTablet(): boolean {
    return this.arrPlatform.includes('tablet');
  }
  public isDesktop(): boolean {
    return this.arrPlatform.includes('desktop');
  }
  public getAllVerifications() {
    const obj = {
      isMobile: this.isMobile(),
      isMobieWeb: this.isMobieWeb(),
      isAndroid: this.isAndroid(),
      isIos: this.isIos(),
      isiPhone: this.isiPhone(),
      isTablet: this.isTablet(),
      isDesktop: this.isDesktop(),
    };
    return obj;
  }
  private setCurrentDevice(): void {
    this.platform.ready().then(() => {
      this.arrPlatform = this.platform.platforms();
      console.log({ arrPlatform: this.arrPlatform });
    });
  }
}
