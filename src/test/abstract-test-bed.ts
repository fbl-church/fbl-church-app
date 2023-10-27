import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

export abstract class AbstractTestBed {
  static getModuleMetaData(): TestModuleMetadata {
    return null;
  }

  static async setup(updateModuleMetaData?: (moduleMetaData: TestModuleMetadata) => void): Promise<any> {
    const moduleMetaData = this.getModuleMetaData();

    if (updateModuleMetaData) {
      updateModuleMetaData(moduleMetaData);
    }

    TestBed.configureTestingModule(moduleMetaData);
  }

  static useProvider(moduleMetaData: TestModuleMetadata, provider: any) {
    const index = moduleMetaData.providers.findIndex((p) => p.provide === provider || p.provide === provider.provide);
    if (index >= 0) {
      moduleMetaData.providers.splice(index, 1);
    }
    moduleMetaData.providers.push(provider);
  }

  static withRoutes(moduleMetaData: TestModuleMetadata, routes: Routes): void {
    moduleMetaData.imports = moduleMetaData.imports.filter((i) => i !== RouterTestingModule);
    moduleMetaData.imports.push(RouterTestingModule.withRoutes(routes));
  }
}
