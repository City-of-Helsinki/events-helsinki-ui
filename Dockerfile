# ===============================================
FROM helsinkitest/node:12-slim as appbase
# ===============================================
# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Yarn
ENV YARN_VERSION 1.22.5
RUN yarn policies set-version $YARN_VERSION

# Use non-root user
USER appuser

# Install dependencies
COPY --chown=appuser:appuser package.json *yarn* /app/
RUN yarn && yarn cache clean --force

# Copy all files
COPY --chown=appuser:appuser . /app/

# =============================
FROM appbase as development
# =============================

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# Bake package.json start command into the image
CMD ["yarn", "start"]

# =============================
FROM appbase as prodbuilder
# =============================

# Use non-root user
USER appuser

# Set public url
ARG PUBLIC_URL

# set sass path to support scss import
ARG SASS_PATH=./src/assets/styles
ENV SASS_PATH $SASS_PATH

# Set Sentry DSN
ARG REACT_APP_SENTRY_DSN

#Set Sentry environment
ARG REACT_APP_SENTRY_ENVIRONMENT

# set graphql server base url
ARG REACT_APP_GRAPHQL_BASE_URL

# Set CMS url
ARG REACT_APP_CMS_URL

# Set image proxy url
ARG REACT_APP_IMAGE_PROXY_URL

# Set LinkedEvents url
ARG REACT_APP_LINKED_EVENTS_URL

# Set Generate sitemap flag 
ARG REACT_APP_GENERATE_SITEMAP

# Set Matomo settings
ARG REACT_APP_MATOMO_URL_BASE
ARG REACT_APP_MATOMO_SITE_ID
ARG REACT_APP_MATOMO_ENABLED

# Set Google Tag Manager settings
ARG REACT_APP_GTM_AUTH
ARG REACT_APP_GTM_ID
ARG REACT_APP_GTM_PREVIEW

# Feature flags
ARG REACT_APP_SHOW_SIMILAR_EVENTS

# Build application
RUN yarn build

# ==========================================
FROM helsinkitest/node:12-slim as production
# ==========================================
# Use non-root user
USER appuser

COPY --chown=appuser:appuser package.prod.json /app/package.json
RUN yarn && yarn cache clean --force

COPY --chown=appuser:appuser --from=prodbuilder /app/build/ /app/build/

# Expose port
EXPOSE 3001

# Start ssr server
CMD yarn start:server

