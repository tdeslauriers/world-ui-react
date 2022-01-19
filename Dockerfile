FROM nginx

COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
# COPY nginx/ssl-params.conf /etc/nginx/snippets/ssl-params.conf