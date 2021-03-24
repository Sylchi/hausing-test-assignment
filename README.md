# Servicedesk

Application to create and manage support tickets

## Development

Just run the provided `docker-compose-dev.yml` file to have the dev server running with hot reloading enabled.
By default the api is running on port 5000 and vite is running on port 4200.
## Testing

Testing is done with cypress. If you are linux user you need to install dependencies. For arch based system use the command `sudo pacman -S gtk2 gtk3 libnotify gconf nss xscreensaver alsa-lib libxtst xorg-xauth xorg-server-xvfb` to install them. For other systems please consult the official documentation that is found here https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements. You need to have the development environment running. Then after installing dependencies at the root of the project run `yarn test` or `npm run test`

## Deployment

Frontend -> Run `Vite build` and upload the resulting dist to your favourite web server. Needs to be supplied with `VITE_API_URL` environment variable. `PORT` variable optional and by default is set to 4200.

Backend -> Needs to be supplied with at least `DATABASE_URL` environment variable. `PORT` variable optional and by default is set to 3000.

Database -> Currently its using and supports postgresql. Can be changed quite easily.
## Roadmap

- Authentication
- Pagination
- Better test coverage