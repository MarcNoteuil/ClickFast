# Utilise une image de base Nginx légère
FROM nginx:alpine

# Copie les fichiers dans le dossier web de Nginx
COPY . /usr/share/nginx/html

# Expose le port
EXPOSE 80

# Lance Nginx en avant-plan
CMD ["nginx", "-g", "daemon off;"]