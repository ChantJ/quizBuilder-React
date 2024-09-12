module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'shantjoulfaian',
  password: '0000',
  database: 'quiz',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
