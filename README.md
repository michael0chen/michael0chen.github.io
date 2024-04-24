# Michael Chen's GitHub Pages

Static files to be served by GitHub Pages. Just commit & push files to the main branch.

Go: https://michael0chen.github.io/

### To develop locally
- Install nginx if necessary - [Mac](https://formulae.brew.sh/formula/nginx).
- `npm run start` to start local nginx server. See `nginx.conf`.
- Go http://localhost:9999/.
- Code as static pages. No build processing. Current edits are served immediately regardless to branches.
- Refresh page - hard reload if necessary.

* `npm run stop` to stop nginx.
* `package.json` is added basically for running npm script commands.
* `nginx/nginx_log_access.log` & `nginx/nginx_log_error.log` are created.


### Publish to GitHub pages
- Commit to main branch.
- Push to GitHub.
- Wait a minute or two.
- Go: https://michael0chen.github.io/
- Profit!
