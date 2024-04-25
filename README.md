# Michael Chen's GitHub Pages

Static files to be served by GitHub Pages. Just commit & push files to the main branch.

Go: https://michael0chen.github.io/

### To develop locally
- Install nginx if necessary - [Mac](https://formulae.brew.sh/formula/nginx).
- `npm run start` to start local nginx server. See `nginx.conf` for details.
- Go http://localhost:9999/.
- Create/edit code as static pages. There is no build processing. Current edits are served immediately regardless of branches.
- Refresh page - hard reload if necessary.

* `npm run stop` to stop nginx.
* `package.json` is added basically for running npm script commands.
* `nginx/nginx_log_access.log` & `nginx/nginx_log_error.log` are created.


### Publish to GitHub Pages
- Commit to main branch.
- Push to GitHub.
- Wait a minute or two.
- Go: https://michael0chen.github.io/
- Profit!
