import {
  Access,
  App,
  FeatureType,
  RankedWebRole,
  WebRole,
} from './common.model';
import { User } from './user.model';

export class UserAccess {
  readonly user: User;
  readonly features: Map<string, Map<string, string>>;
  readonly applications: string[];

  get roles(): WebRole[] {
    return this.user.webRole;
  }

  get rankedRoles(): RankedWebRole[] {
    const stringArray: any[] = this.roles;
    return stringArray.map((r) => r as RankedWebRole);
  }

  get apps(): string[] {
    return this.applications;
  }

  get userId(): number {
    return this.user.id;
  }

  constructor(userAccess: UserAccess) {
    Object.assign(this, userAccess);
  }

  /**
   * Determines if the user has the passed in role.
   *
   * @param r The role to check for.
   * @returns The boolean if the user has the role or not.
   */
  hasRole(...r: WebRole[]): boolean {
    return this.roles.some((w) => r.includes(w));
  }

  /**
   * Determines if the user has application access
   *
   * @param app The app to check
   * @returns The boolean if the user has the app or not.
   */
  hasApp(app: App | string): boolean {
    return this.apps.includes(app);
  }

  /**
   * Checks to see if the logged in user is a guardian only
   *
   * @returns The boolean if the user is a guardian only user.
   */
  isGuardianOnlyUser(): boolean {
    let roles = this.roles;
    return roles.includes(WebRole.GUARDIAN) && roles.length == 1;
  }

  /**
   * Determines if a user has access to a given feature for the given level
   *
   * @param app to check feature on
   * @param key to check level access on
   * @param level type of the feature
   * @returns boolean
   */
  hasFeature(
    app: App | string,
    key: FeatureType | string,
    level: Access | 'c' | 'r' | 'u' | 'd' = Access.READ
  ): boolean {
    if (!this.hasApp(app)) {
      return false;
    }

    const feature: [{}] = this.features[app];
    let access = [];

    if (feature) {
      access = feature
        .filter((f) => Object.keys(f)[0] === key)
        .map((v) => Object.values(v)[0]);
    } else {
      return false;
    }

    return this.determineAccess(access, level);
  }

  /**
   * Determine the access of the array and level
   *
   * @param access array of the user feature access
   * @param level to see they have access
   * @returns boolean
   */
  private determineAccess(
    access: string[],
    level: Access | 'c' | 'r' | 'u' | 'd'
  ): boolean {
    if (access.length === 0) return false;
    return access[0].includes(level);
  }
}