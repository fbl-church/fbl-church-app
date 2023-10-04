import { default as churchGroupsJson } from 'projects/insite-kit/src/assets/translations/church-groups/en.json';
import { default as relationshipJson } from 'projects/insite-kit/src/assets/translations/relationships/en.json';
import { default as statusJson } from 'projects/insite-kit/src/assets/translations/status/en.json';
import { default as webRolesJson } from 'projects/insite-kit/src/assets/translations/web-roles/en.json';

export enum WebRole {
  USER = 'USER',
  PASTOR = 'PASTOR',
  CHILD = 'CHILD',
  GUARDIAN = 'GUARDIAN',
  LEADER = 'LEADER',
  MODERATOR = 'MODERATOR',
  WORKER = 'WORKER',
  NURSERY_DIRECTOR = 'NURSERY_DIRECTOR',
  NURSERY_SUPERVISOR = 'NURSERY_SUPERVISOR',
  NURSERY_WORKER = 'NURSERY_WORKER',
  JUNIOR_CHURCH_DIRECTOR = 'JUNIOR_CHURCH_DIRECTOR',
  JUNIOR_CHURCH_SUPERVISOR = 'JUNIOR_CHURCH_SUPERVISOR',
  JUNIOR_CHURCH_WORKER = 'JUNIOR_CHURCH_WORKER',
  VBS_DIRECTOR = 'VBS_DIRECTOR',
  VBS_WORKER = 'VBS_WORKER',
  VBS_REGISTRATION = 'VBS_REGISTRATION',
  VBS_PRE_PRIMARY = 'VBS_PRE_PRIMARY',
  VBS_PRIMARY = 'VBS_PRIMARY',
  VBS_MIDDLER = 'VBS_MIDDLER',
  VBS_JUNIOR = 'VBS_JUNIOR',
  VBS_GAMES = 'VBS_GAMES',
  VBS_SNACKS = 'VBS_SNACKS',
  VBS_CRAFTS = 'VBS_CRAFTS',
  AWANA_DIRECTOR = 'AWANA_DIRECTOR',
  AWANA_REGISTRATION = 'AWANA_REGISTRATION',
  AWANA_LEADER = 'AWANA_LEADER',
  AWANA_WORKER = 'AWANA_WORKER',
  TNT_LEADER = 'TNT_LEADER',
  TNT_WORKER = 'TNT_WORKER',
  SPARKS_LEADER = 'SPARKS_LEADER',
  SPARKS_WORKER = 'SPARKS_WORKER',
  CUBBIES_LEADER = 'CUBBIES_LEADER',
  CUBBIES_WORKER = 'CUBBIES_WORKER',
  CROSS_CHECK_LEADER = 'CROSS_CHECK_LEADER',
  CROSS_CHECK_WORKER = 'CROSS_CHECK_WORKER',
  SITE_ADMINISTRATOR = 'SITE_ADMINISTRATOR',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export enum RankedWebRole {
  USER = 100,
  PASTOR = 100,
  CHILD = 100,
  GUARDIAN = 100,
  LEADER = 300,
  WORKER = 200,
  NURSERY_DIRECTOR = 400,
  NURSERY_SUPERVISOR = 300,
  NURSERY_WORKER = 200,
  JUNIOR_CHURCH_DIRECTOR = 400,
  JUNIOR_CHURCH_SUPERVISOR = 300,
  JUNIOR_CHURCH_WORKER = 200,
  VBS_DIRECTOR = 300,
  VBS_WORKER = 200,
  VBS_REGISTRATION = 200,
  VBS_PRE_PRIMARY = 200,
  VBS_PRIMARY = 200,
  VBS_MIDDLER = 200,
  VBS_JUNIOR = 200,
  VBS_GAMES = 200,
  VBS_SNACKS = 200,
  VBS_CRAFTS = 200,
  AWANA_DIRECTOR = 400,
  AWANA_REGISTRATION = 300,
  AWANA_LEADER = 300,
  AWANA_WORKER = 200,
  TNT_LEADER = 300,
  TNT_WORKER = 200,
  SPARKS_LEADER = 300,
  SPARKS_WORKER = 200,
  CUBBIES_LEADER = 300,
  CUBBIES_WORKER = 200,
  CROSS_CHECK_LEADER = 300,
  CROSS_CHECK_WORKER = 200,
  MODERATOR = 500,
  SITE_ADMINISTRATOR = 800,
  ADMINISTRATOR = 1000,
}

export enum ChurchGroup {
  CUBBIES = 'CUBBIES',
  SPARKS = 'SPARKS',
  TNT_GIRLS = 'TNT_GIRLS',
  TNT_BOYS = 'TNT_BOYS',
  CROSS_CHECK = 'CROSS_CHECK',
  JUNIOR_CHURCH = 'JUNIOR_CHURCH',
  NURSERY = 'NURSERY',
  VBS_PRE_PRIMARY = 'VBS_PRE_PRIMARY',
  VBS_PRIMARY = 'VBS_PRIMARY',
  VBS_MIDDLER = 'VBS_MIDDLER',
  VBS_JUNIOR = 'VBS_JUNIOR',
}

export enum Relationship {
  MOTHER = 'MOTHER',
  FATHER = 'FATHER',
  BROTHER = 'BROTHER',
  SISTER = 'SISTER',
  GRANDMA = 'GRANDMA',
  GRANDPA = 'GRANDPA',
  AUNT = 'AUNT',
  UNCLE = 'UNCLE',
  OTHER = 'OTHER',
}

export enum Access {
  CREATE = 'c',
  READ = 'r',
  UPDATE = 'u',
  DELETE = 'd',
}

export enum FeatureType {
  OVERVIEW = 'overview',
  DETAIL = 'detail',
  PROFILE = 'profile',
  REGISTRATION = 'registration',
  CHECK_IN = 'check-in',
  WORKERS = 'workers',
  NOTIFICATION = 'notification',
  LESSONS = 'lessons',
}

export enum App {
  ACCESS_MANAGER = 'access-manager',
  DASHBOARD = 'dashboard',
  USERS = 'users',
  CHILDREN = 'children',
  GUARDIANS = 'guardians',
  REPORTS = 'reports',
  ABOUT = 'about',
  SETTINGS = 'settings',
  JUNIOR_CHURCH = 'junior-church',
  NURSERY = 'nursery',
  VBS = 'vbs',
  GLOBAL = 'global',
}

export enum TranslationKey {
  CHURCH_GROUP = 'CHURCH_GROUP',
  RELATIONSHIP = 'RELATIONSHIP',
  STATUS = 'STATUS',
  WEB_ROLE = 'WEB_ROLE',
  APPS = 'APPS',
}

export const TranslateMapping = {
  CHURCH_GROUP: churchGroupsJson,
  RELATIONSHIP: relationshipJson,
  STATUS: statusJson,
  WEB_ROLE: webRolesJson,
};
