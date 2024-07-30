# Michael Chen's GitHub Pages

Static files for https://michael0chen.github.io/ served by GitHub Pages.


### To publish to GitHub Pages:
- Edit HTML, CSS, JS,... files.
- Commit to main branch.
- Push to GitHub.
- Wait a minute or two.
- Go: https://michael0chen.github.io/
- Profit!


### To develop locally before publishing:
- Install nginx if necessary - [Mac](https://formulae.brew.sh/formula/nginx).
- Do `npm run start` to start local nginx server. See `nginx.conf` for details.
- Go http://localhost:9999/.
- Create/edit code as static pages. There is no build processing. Current edits are served immediately regardless of branches.
- Refresh page - hard reload if necessary.

* Do `npm run stop` to stop nginx.
* `package.json` is added basically for running npm script commands.
* Log files are create in the `nginx` folder (`nginx_log_access.log` & `nginx_log_error.log`).

### Extra files
Note these files/folders are also served by GitHub Pages, but who cares:
  - README.md
  - package.json
  - .git/
  - nginx/
  - .editorconfig
  - .gitigore
  - (IDE configs)


