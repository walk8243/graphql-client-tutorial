const config = require('config');
const client = require('graphql-client')({
  url: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${config.github.token}`,
  },
});
const fs = require('fs');

client.query(fs.readFileSync('./query/test.query').toString(), {}, (req, res) => {
  if(res.status === 401) {
    throw new Error('Not authorized')
  }
})
.then((body) => {
  console.log(body);
})
.catch((error) => {
  console.error(error);
});
