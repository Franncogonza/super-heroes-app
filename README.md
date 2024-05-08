# SuperHeroesApp
Prueba Técnica Frontend - Mantenimiento de Súper Héroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.
Este proyecto es una aplicación SPA desarrollada con Angular, diseñada para gestionar un mantenimiento de súper héroes.

## Requisitos
- Angular: 16.2.12
- Utiliza Bootstrap.

## Características

La aplicación permite:
- **Registrar un nuevo super héroe.**
- **Consultar todos los súper héroes.**
- **Consultar súper héroes por nombre.** Por ejemplo, buscar `man` devolverá `Spiderman`, `Superman`, `Manolito el fuerte`, etc.
- **Modificar un súper héroe.**
- **Eliminar un súper héroe.**

### Componentes

- **Listado paginado de héroes** con botones para añadir, editar y borrar.
- **Input para filtrar héroes** por nombre.
- **Formulario para añadir nuevos héroes** con validaciones pertinentes.
- **Formulario para editar héroes** con la información pre-cargada.
- **Confirmación de eliminación de héroes.**

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

```bash
git clone URL_DEL_REPOSITORIO
cd directorio_del_proyecto
npm install
ng serve

## Development server
 Navigate to `http://localhost:4200/`

## Test via Karma
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

