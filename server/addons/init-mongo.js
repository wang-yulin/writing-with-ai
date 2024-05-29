function seed(dbName, user, password) {
  db = db.getSiblingDB(dbName);
  db.createUser({
    user: user,
    pwd: password,
    roles: [{ role: 'readWrite', db: dbName }],
  });

  db.createCollection('keystores');
  db.createCollection('users');

  // db.api_keys.insert({
  //   key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
  //   permissions: ['GENERAL'],
  //   comments: ['To be used by the xyz vendor'],
  //   version: 1,
  //   status: true,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });

  // db.roles.insertMany([
  //   {
  //     code: 'LEARNER',
  //     status: true,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     code: 'WRITER',
  //     status: true,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     code: 'EDITOR',
  //     status: true,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  //   {
  //     code: 'ADMIN',
  //     status: true,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // ]);

  // db.users.insert({
  //   name: 'Admin',
  //   email: 'admin@xyz.com',
  //   password: '$2a$10$psWmSrmtyZYvtIt/FuJL1OLqsK3iR1fZz5.wUYFuSNkkt.EOX9mLa', // hash of password: changeit
  //   status: true,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
}

seed('writing-db', 'aaron_wang', 'wang500237');
// seed('writing-db', 'blogs-test-db-user', 'changeit');
