export enum WebRole {
  USER = 100,
  GURDIAN = 100,
  LEADER = 300,
  WORKER = 200,
  TNT_LEADER = 300,
  TNT_WORKER = 200,
  SPARKS_LEADER = 300,
  SPARKS_WORKER = 200,
  CUBBIES_LEADER = 300,
  CUBBIES_WORKER = 200,
  CROSS_CHECK_LEADER = 300,
  CROSS_CHECK_WORKER = 200,
  SITE_ADMIN = 500,
  ADMIN = 1000,
}

export enum ChurchGroup {
  CUBBIES = 'CUBBIES',
  SPARKS = 'SPARKS',
  TNT_GIRLS = 'TNT_GIRLS',
  TNT_BOYS = 'TNT_BOYS',
  CROSS_CHECK = 'CROSS_CHECK',
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

export enum Feature {
  OVERVIEW = 'overview',
  DETAIL = 'detail',
  PROFILE = 'profile',
  NOTIFICATION = 'notification',
}

export enum App {
  USERS = 'users',
  CHILDREN = 'children',
  GURDIANS = 'gurdians',
  REPORTS = 'reports',
  ABOUT = 'about',
  REPOSITORIES = 'repositories',
  SETTINGS = 'settings',
  GLOBAL = 'global',
}
