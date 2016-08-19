(function(win, doc) {
  var timeoutAutoLogin;
  var url = win.CASino.url('login'),
      cookie_regex = /(^|;)\s*tgt=/,
      ready_bound = false;

  function checkCookieExists() {
    var serviceEl = doc.getElementById('service'),
        service = serviceEl ? serviceEl.getAttribute('value') : null;

    if(cookie_regex.test(doc.cookie)) {
      if(service) {
        url += '?service=' + encodeURIComponent(service);
      }
      win.location = url;
    } else {
      timeoutAutoLogin = setTimeout(checkCookieExists, 1000);
    }
  }

  // Auto-login when logged-in in other browser window (9887c4e)
  // @lchanouha fix, 08/2016: whe should'nt be redirected while loggin in
  doc.addEventListener('DOMContentLoaded', function() {
    if(ready_bound) {
      return;
    }
    ready_bound = true;
    var loginFrom = doc.getElementById('login-form')
    if(loginFrom) {
      checkCookieExists();
      loginFrom.addEventListener("submit", function(){
        clearTimeout(timeoutAutoLogin);
      });
    }
  });

})(this, document);
