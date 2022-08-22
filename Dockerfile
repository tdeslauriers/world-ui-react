FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*

COPY build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]