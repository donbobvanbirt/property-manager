const config = {
  db: {
    'production': process.env.DB_URL,
    'development': process.env.DB_URL,
    'test': 'mongodb://localhost/property-manager-test'
  }
}

module.exports = config;
