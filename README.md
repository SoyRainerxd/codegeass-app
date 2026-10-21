# Code Geass — App móvil

App fan de **Code Geass: Lelouch of the Rebellion** (2 temporadas) hecha con HTML/CSS/JS + Capacitor.
Autor: **Rainer Cruz** — ITLA, matrícula **2025-0061**.

Vistas: Portada (slider) · Personajes · Momentos (video dentro de la app) · Acerca de · Juega conmigo (*Jaque al Imperio*) · Contrátame.

## Antes de compilar: completa estos datos

1. **Videos de los 3 momentos** — abre `www/js/data.js` y pega un enlace de YouTube en el campo `video` de cada momento.
2. **Fotos de personajes** — copia imágenes a `www/img/` con los nombres `lelouch.jpg`, `suzaku.jpg`, `cc.jpg`, `kallen.jpg`. Si faltan, la app muestra un emblema.

## Compilar el APK automáticamente (GitHub Actions)

1. Crea un repositorio **público** llamado `codegeass-app` en tu GitHub (`SoyRainerxd`).
2. Sube todo el contenido de esta carpeta a la rama `main`.
3. Ve a la pestaña **Actions** → se ejecuta *Build APK* (tarda 3–6 min). También puedes lanzarlo a mano con *Run workflow*.
4. Al terminar, el APK queda en **Releases**: `https://github.com/SoyRainerxd/codegeass-app/releases/latest`

## Probar en iPhone (versión web, solo para pruebas)

1. En tu repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions** (una sola vez).
2. Cada subida a `main` ejecuta *Publicar versión web*.
3. Abre en Safari: `https://soyrainerxd.github.io/codegeass-app/`

## Compilar localmente (opcional)

Requiere Node 22+, JDK 21 y Android Studio / SDK.

```bash
npm install
npx cap add android && npx cap sync android
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```
