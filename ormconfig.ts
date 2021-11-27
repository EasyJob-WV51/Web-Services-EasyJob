module.exports = {
  type: 'mysql',
  url: 'mysql://admin:adminadmin@mysql8.cselj9r9ujlf.us-east-2.rds.amazonaws.com:3306/estefano-bran-prueba',
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  entities: [getEntityDirectory()],
  migrations: [getMigrationDirectory()],
  cli: {
    migrationsDir: 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};

function getEntityDirectory() {
  const path = 'dist/src/**/infrastructure/persistence/typeorm/entities/*.js';
  return path;
}

function getMigrationDirectory() {
  const path =
    'dist/src/common/infrastructure/persistence/typeorm/migrations/*.js';
  return path;
}
