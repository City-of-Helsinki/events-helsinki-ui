# Our First stage, that builds the application
FROM helsinkitest/node:12-slim AS react-builder

# Use non-root user
USER appuser

# Install dependencies
COPY --chown=appuser:appuser package.json yarn.lock /app/
RUN yarn

# Copy all files
COPY --chown=appuser:appuser . .

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

# set ssr server port
ARG REACT_APP_SSR_PORT

# Set CMS url
ARG REACT_APP_CMS_URL

# Set LinkedEvents url
ARG REACT_APP_LINKED_EVENTS_URL

# Set Generate sitemap flag 
ARG REACT_APP_GENERATE_SITEMAP

# Set Matomo settings
ARG REACT_APP_MATOMO_URL_BASE
ARG REACT_APP_MATOMO_SITE_ID
ARG REACT_APP_MATOMO_ENABLED

# Build application
RUN yarn build

# Our Second stage, that creates an image for production
FROM helsinkitest/node:12-slim AS react-prod

# Use non-root user
USER appuser

# Copy build folder from stage 1
COPY --chown=appuser:appuser --from=react-builder /app/build /app/build

# Copy package.json and yarn.lock files
COPY --chown=appuser:appuser package.json yarn.lock /app/

# Install production dependencies
RUN yarn install --production

# Expose port
EXPOSE $REACT_APP_SSR_PORT

# Start ssr server
CMD yarn start:server
