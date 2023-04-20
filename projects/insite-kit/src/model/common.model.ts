export enum WebRole {
  USER = 100,
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

export enum Access {
  CREATE = 'c',
  READ = 'r',
  UPDATE = 'u',
  DELETE = 'd',
}

export enum Feature {
  USER_DETAIL = 'detail',
  PROFILE = 'profile',
  NOTIFICATION = 'notification',
}
