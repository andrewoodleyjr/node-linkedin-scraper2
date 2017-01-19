var jsdom = require('jsdom'),
  Q = require('q');

module.exports = function(originalUrl, callback) {
  var deferred = Q.defer();


  var profileFactory = require('./lib/profile');
  var linkedInURL = originalUrl.replace(/[a-z]*\.linkedin/, 'www.linkedin');

  jsdom.env({
    url: linkedInURL,
    scripts: ['http://code.jquery.com/jquery.js'],
    headers: {
      'Accept': 'text/html',
      //'Accept-Encoding': 'gzip',
      'Accept-Language': 'en-US;q=0.6,en;q=0.4',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36'
    },
    cookie: [
      'JSESSIONID="ajax:4630544544519290264"',
      'RT=s=1484815688991&r=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fshawneis-jones-49209991%3FauthType%3Dname%26authToken%3Ds7IW%26trk%3Dnav_utilities_invites_name',
      'VID=V_2016_11_11_00_644',
      '_chartbeat2=CcGriHD22zqPC-Myl3.1477500941469.1477500941479.1',
      '_ga=GA1.2.1283221988.1474302859',
      '_gat=1',
      '_lipt=0_33y0vTA6CF41z02v4wleFHBrIChVCyKmawvxbIEPA6TXgK_nkS5mXQQlr50OJAR8O4pPKtq_gEyKhXMebsMfFxUS7jkKnQXsJyl2NLUzM1xKTS79riIQQknnfyqHzh_-01HfWHduzodPOr9Nkmiu08yERrflVdUBhp4kzpyaKLvY6SZJniKMQB_kYgQ0y1bt0SqYM2o0I6pMupnWyevzgRxQtohgJPAtDrKU3sWqdSVgthKEsoWWOYDVzmHJksQpn1lQaob-cuLXB-qKFdQ0zkhcmgzfrBet9z1E0Skpxje',
      'bcookie="v=2&0977673b-0159-4fa0-8981-087df9103502"',
      'bscookie="v=1&2016091603000874dee8ea-20cd-4d83-8a94-80c353400fd5AQHDHp3W3kVpcWWC35UO4j6CFrMv-X1Q"',
      'lang="v=2&lang=en-us"',
      'li_at=AQEDARIJ4GAEyYV2AAABWNK-rDYAAAFZt58v7FYASVBoKZ9WLic8Odee9xqbHJ1UiDrzu2HQABDVObJxY2dTIV42Ayt1RhNaENtuJzAPP2wcRsyj8w5GH1LYZJy1SxDJ-2IGqtv_eflx_NIl4PH-9dRD',
      'liap=true',
      'lidc="b=OB52:g=82:u=126:i=1484815618:t=1484864722:s=AQH2Houe07c8q_OhitmhDCdkGuCrV1NN"',
      'oz_props_fetch_size1_302637152=15',
      'sdsc=1%3A1SZM1shxDNbLt36wZwCgPgvN58iw%3D',
      'share_setting=PUBLIC',
      'sl="v=1&7BrIB"',
      'visit="v=1&M"',
      'wutan=nj0VJvdfF7VPXi9NSN5sCyshSRuFqsKlxNg1H1ENZmE=',
    ],
    proxy: process.env.PROXY_HOST,
    tunnel: process.env.PROXY_HOST ? false : undefined,
    done: function(errors, window) {
      if (errors) {
        if (callback) {
          callback(errors);
        } else {
          deferred.reject(errors);
        }
      } else {
        var profile = profileFactory(window);
        profile.publicProfileUrl = originalUrl;

        if (callback) {
          callback(null, profile);
        } else {
          deferred.resolve(profile);
        }
      }
    }
  });

  return deferred.promise;
};

