FROM node:18-alpine

RUN npm install -g firebase-tools@12

# Update available packages
RUN apk update

# Install Java JDK
RUN apk add --no-cache openjdk11

# Set JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/default-jvm

# Create working directory
WORKDIR /app

# Copy your Firebase configuration code into the container
COPY firebase.json .
COPY firestore.rules .

# Expose the Firestore emulator port
EXPOSE 8080 4000 4400 4500 9099 9150

# Start the Firestore emulator
CMD firebase emulators:start --only firestore,auth --project=demo-test