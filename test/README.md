# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Diagrama de Flujo del Proyecto](#3-diagramas-de-flujo)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

## 1. Preámbulo

El presente proyecto se construyò una herramienta que analiza archivos markdown. Una vez que  el usuario ingrese una ruta de archivo o carèta, se procesa el archivo, se extraen los enlaces y se realiza una verificación para asegurarse de que estén activos. Además, se recopilan estadísticas, como el número total de enlaces, la cantidad de enlaces rotos y la cantidad de enlaces únicos.

La biblioteca en JavaScript proporciona las funciones y utilidades necesarias para leer y analizar archivos Markdown, verificar los enlaces y generar el informe de estadísticas. Esta biblioteca puede ser utilizada por otros desarrolladores para integrarla en sus propios proyectos y realizar análisis similares de archivos Markdown.

## 2. Resumen del proyecto

En este proyecto se ha desarrollado un programa que se ejecutará en la terminal o consola. Para utilizar esta aplicación, se utilizarán comandos específicos que he diseñado y programado en la misma línea de comandos.

Estos comandos nos permitirán acceder a los enlaces presentes en archivos o directorios, obtener el total de enlaces, identificar enlaces únicos y encontrar enlaces rotos.

## 3. Diagramas de Flujo
Se crearon los siguientes diagramas
 Diagrama de Flujo de la API

![Imagen Diagrama API](digrama\digrama.drawio.png)

- Diagrama de Flujo del CLI

![Imagen Diagrama CLI](digrama\digramacli.drawio.png)




## 4. Modo de uso "API"
El proyecto consta de dos partes: una API en JavaScript y una interfaz de línea de comandos (CLI).

1. API de JavaScript
La API es una función llamada mdLinks(filePath, options) que devuelve una promesa. Recibe un parámetro: filePath, que puede ser una ruta absoluta o relativa. Esta función busca en el archivo especificado y devuelve un array de objetos, donde cada objeto representa un enlace encontrado.

Valores de retorno con validate: false:

href: URL encontrada.
text: Texto que aparece dentro del enlace (<a>).
file: Ruta del archivo donde se encontró el enlace.

Valores de retorno con validate: true:


* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

## 6. Modo de uso "Interfaz de Línea de Comando (CLI)"
Debes ingresar la ruta de archivo o directorio de la sigueinte manera:

1.  Si se usa **md-links <path> --validate** el módulo hará una petición HTTP para averiguar si los links funcionan o no. Nos debe dar la href, text, file, status y mensaje OK o FAIL. 
![--validate] o [-v](comandos\validate.png)

2. Si utilizas el comando md-links <path> --stats, recibirás un texto que proporciona estadísticas básicas sobre los links encontrados en el archivo o directorio especificado.
![--stats] o [-s](comandos\stats.png)

3. Si ejecutas el comando md-links <path> --validate --stats, se mostrarán estadísticas que también requieren los resultados de validación de los links.

Estas estadísticas adicionales incluyen:

Total de links: El número total de links encontrados en el archivo o directorio.
Links únicos: El número de links únicos, es decir, aquellos que no se repiten.
Links rotos: El número de links que están rotos o no funcionan correctamente.
Links válidos: El número de links que son válidos y responden correctamente.
![--validate--stats] o [-s-v](comandos\statsvaliate.png)


- [ ] **Git: Instalación y configuración**

- [ ] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [ ] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [ ] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [ ] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [ ] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- [ ] **Consulta o petición (request) y respuesta (response).**

  <details><summary>Links</summary><p>

  * [Generalidades del protocolo HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Overview)
  * [Mensajes HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Messages)
</p></details>

- [ ] **Códigos de status de HTTP**

  <details><summary>Links</summary><p>

  * [Códigos de estado de respuesta HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
  * [The Complete Guide to Status Codes for Meaningful ReST APIs - dev.to](https://dev.to/khaosdoctor/the-complete-guide-to-status-codes-for-meaningful-rest-apis-1-5c5)
</p></details>

## 7. Test Unitarios

Se realizaron 8 test unitarios para cada una de las funciones de la API, como los otros archivos .js del proyecto.
![test](comandos\test.jpg)


## 8. Guía de Instalación

Para instalar esta librería se debe hacer de la siguiente manera: 

- de forma global: **npm install -g md-links**,
- de forma local: **npm install md-links --location=project**,
- para que todas sus dependiencias funcionen correctamente como tercer paso se debe escribir en consola **npm install**,
- para correr los test se debe usar **npm run test** o **npm test**.

## 9. Checklist

### General

* [x] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [x] Un board con el backlog para la implementación de la librería.
* [x] Documentación técnica de la librería.
* [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [x] El módulo exporta una función con la interfaz (API) esperada.
* [x] Implementa soporte para archivo individual
* [x] Implementa soporte para directorios


### CLI

* [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [x] Se ejecuta sin errores / output esperado
* [x] Implementa `--validate`
* [x] Implementa `--stats`

### Pruebas / tests

* [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [x] Pasa tests (y linters) (`npm test`).
