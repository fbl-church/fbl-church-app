export enum WebRole {
  USER = 100,
  LEADER = 300,
  HELPER = 200,
  TNT_LEADER = 300,
  TNT_HELPER = 200,
  SPARKS_LEADER = 300,
  SPARKS_HELPER = 200,
  CUBBIES_LEADER = 300,
  CUBBIES_HELPER = 200,
  CROSS_CHECK_LEADER = 300,
  CROSS_CHECK_HELPER = 200,
  SITE_ADMIN = 500,
  ADMIN = 1000,
}

export enum ChurchGroup {
  CUBBIES = 'CUBBIES',
  SPARKS = 'SPARKS',
  TNT_GIRLS = 'TNT_GIRLS',
  TNT_BOYS = 'TNT_BOYS',
  CROSS_CHECK = 'CROSS_CHECK',
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
  CLUBBERS = 'clubbers',
  GURDIANS = 'gurdians',
  REPORTS = 'reports',
  ABOUT = 'about',
  REPOSITORIES = 'repositories',
  SETTINGS = 'settings',
  GLOBAL = 'global',
}
