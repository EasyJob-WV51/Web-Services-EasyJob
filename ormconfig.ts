module.exports = {
  type: 'mysql',
  url: process.env.EASY_JOB,
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
  let path = 'dist/src/**/infrastructure/persistence/typeorm/entities/*.js';
  return path;
}

function getMigrationDirectory() {
  const path = 'dist/src/common/infrastructure/persistence/typeorm/migrations/*.js';
  return path;
}
