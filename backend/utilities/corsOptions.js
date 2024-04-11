const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE']
}

module.exports = { corsOptions }