import { ChurchGroup } from './common.model';

export interface WizardData {
  baseRoute?: string;
  translation?: string;
  filteredOutGroups?: ChurchGroup[];
  registrationGroup?: ChurchGroup;
  [key: string]: any;
}
