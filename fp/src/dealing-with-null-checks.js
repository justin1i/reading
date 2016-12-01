let joeUser = {
  name: 'joe',
  email: 'joe@example.com',
  prefs: {
    languages: {
      primary: 'sp',
      secondary: 'en',
    },
  },
};

let indexURLs = {
  'en': 'http://myside.com/en',
  'sp': 'http://myside.com/sp',
  'jp': 'http://myside.com/jp',
};

const showIndexPage = (url) => {
  console.log(url);
};

// Imperative
/*
const getUrlForUser = (user) => {
  if (user == null) {
    return indexURLs['en'];
  }
  if (user.prefs.languages.primary && user.prefs.languages.primary != 'undefined') {
    if (indexURLs[user.prefs.languages.primary]) {
      return indexURLs[user.prefs.languages.primary];
    } else {
      return indexURLs['en'];
    }
  }
};

showIndexPage(getUrlForUser(joeUser));
*/

// Functional Programming
import { path, curry } from 'ramda';
import { Maybe } from 'ramda-fantasy';

const getUrlForUser = (user) => 
  Maybe(user)
  .map(path(['prefs', 'languages', 'primary']))
  .chain(maybeGetUrl);

const maybeGetUrl = curry(function(allUrls, language) {
  return Maybe(allUrls[language]);
})(indexURLs);

function boot(user, defaultURL) {
  showIndexPage(getUrlForUser(user).getOrElse(defaultURL));
}

boot(joeUser, indexURLs['en']);
