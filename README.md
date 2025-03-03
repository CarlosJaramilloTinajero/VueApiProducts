## Prueba tecnica API de Productos Front end

Este proyecto de Vue 3 en su configuracion composition API, utiliza las librerias Vue router para el enrutado de la aplicacion, utilizando los Guards para protejer las rutas que requieran de autenticacion, como tambien se uso la libreria Vuex para mantener un estado global de la app con la informacion del usuario autenticado, para el consumo de la API generada con Laravel se uso la libreria Axios, para el manejo de notifiaciones se implemento la libreria Vue Toastify. Este proyecto es responsivo, por lo que se puede ver en dispositivos moviles. Para los estilos de esta aplicacion se utilizo Tailwind.

Para el consumo de la API se genero una clase madre llamada connection, la cual es la encargada de generar las peticiones a la API utilizando Axios, para hacar mas mantenible y escalable el uso de las peticiones, se generaron servicios, donde por cada recurso de la API se creara un archivo de servicios para peticiones a la API.

## Pasos de instalacion

- Ejecutar el comando 'npm install' para instalar las depencias del proyecto
- Ejecutar el comando 'npm run dev' para ejecutar iniciar el servidor
- Configurar la URL base de la ruta de la API, en el archivo src/constants/index.js

