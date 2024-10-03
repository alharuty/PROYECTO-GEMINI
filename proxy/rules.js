module.exports = {
  '/node-0': {
    target: 'https://api.github.com',
    secure: true,
    headers: {
      'Host': 'api.github.com',
      'Cookie': ''
    },
    pathRewrite: function (path) {
      return path.replace(/^\/node-0/, '');
    }
  },
  '/node-1': {
    target: 'https://registry.npmjs.org',
    secure: true,
    headers: {
      'Host': 'registry.npmjs.org',
      'Cookie': ''
    },
    pathRewrite: function (path) {
      return path.replace(/^\/node-1/, '');
    }
  }
};
