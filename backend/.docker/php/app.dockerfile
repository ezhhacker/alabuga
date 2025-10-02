FROM ghcr.io/shyim/wolfi-php/base:latest

RUN apk add --update-cache \
    php-8.2 \
    php-8.2-fpm \
    php-8.2-pdo \
    php-8.2-pdo_sqlite\
    php-8.2-gd \
    php-8.2-xml \
    php-8.2-dom \
    php-8.2-phar \
    php-8.2-mbstring \
    php-8.2-curl \
    php-8.2-exif \
    php-8.2-intl \
    php-8.2-zip \
    php-8.2-soap \
    php-8.2-openssl \
    php-8.2-bcmath \
    php-8.2-xmlwriter \
    php-8.2-fileinfo \
    php-8.2-xmlreader \
    php-8.2-xdebug \
    php-8.2-iconv \
    php-8.2-simplexml \
    php-8.2-sodium

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


ARG user
ARG uid
ARG group
ENV LC_ALL=C.UTF-8

WORKDIR /var/www/html

COPY . .

RUN addgroup -S ${user} && adduser -S -G ${group},root --uid ${uid} --ingroup ${user}  ${user}

USER ${user}

EXPOSE 9000
EXPOSE 5173

CMD [ "php-fpm" ]
