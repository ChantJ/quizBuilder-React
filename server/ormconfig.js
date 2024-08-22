module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'quiz',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
