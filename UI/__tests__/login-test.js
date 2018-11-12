// import { getTokenFunction } from '../js/login.js'
function getTokenFunction = require('../js/login.js');

test('access token is returned', () => {
    return getTokenFunction().then((data) => {
      expect(data.access_token).not.toBeNull();
    });
  })


 
