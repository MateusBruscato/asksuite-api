FROM node:18.13.0

RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN groupadd -r app && useradd -rm -g app -G audio,video app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 9090

RUN chown -R app:app /usr/src/app

RUN chmod -R 777 /usr/src/app

USER app