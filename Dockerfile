FROM node:carbon

# Specify env variables here
ENV NODE_ENV=production
ENV API_URL=https://knit-test-api.tk
ENV HOST 0.0.0.0

# Create homepage-nuxtjs directory
RUN mkdir -p /var/www/homepage-nuxtjs

# Mark directory as a working one
WORKDIR /var/www/homepage-nuxtjs

# Expose the port of the application
EXPOSE 3000

# Copy the package informations
COPY package.json yarn.lock .env.example ./

# Install dependencies
RUN npm install -g yarn
RUN yarn install --production

# Copy source files
COPY . .

# Build the project
RUN npm run build
