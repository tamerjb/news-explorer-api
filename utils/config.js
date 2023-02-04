const {
  JWT_SECRET = 'super_secret_key',
  NODE_ENV,
  MONGO_DB = 'mongodb+srv://tamer:h9nYerrjtak3XmKG@cluster0.lkzib1k.mongodb.net/?retryWrites=true&w=majority',

  PORT = 3000,
} = process.env;

module.exports = {
  JWT_SECRET, MONGO_DB, NODE_ENV, PORT
};
// first review
