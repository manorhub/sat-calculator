# ☁️ Guía de Despliegue en Cloudflare Pages / Workers

Este proyecto (`Calculadora SAT`) ya está totalmente configurado y optimizado para ser desplegado en **Cloudflare Pages** y **Cloudflare Workers**.

---

## 🛠️ Configuración Incluida en el Proyecto

1. **`wrangler.json`**: Archivo de configuración de Cloudflare Workers / Pages.
2. **`open-next.config.ts`**: Configuración del adaptador oficial **OpenNext para Cloudflare**.
3. **`package.json` Commands**:
   - `npm run build:cf` -> Genera la compilación optimizada para Cloudflare.
   - `npm run preview:cf` -> Probado en un servidor local de Wrangler.
   - `npm run deploy:cf` -> Despliega directamente a Cloudflare desde la terminal.

---

## 🚀 Opción 1: Despliegue Automático mediante GitHub (Recomendado)

### Paso 1: Conectar el Repositorio en Cloudflare Dashboard
1. Inicia sesión en el panel de [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. En el menú lateral, ve a **Workers & Pages** -> **Create Application** -> pestaña **Pages**.
3. Haz clic en **Connect to Git** y selecciona el repositorio: `manorhub/sat-calculator`.

### Paso 2: Configuración del Build
Establece los siguientes parámetros en el formulario:
- **Project Name**: `sat-calculator`
- **Production Branch**: `main`
- **Framework Preset**: `Next.js`
- **Build Command**: `npx opennextjs-cloudflare build` (o `npm run build`)
- **Build Output Directory**: `.open-next/assets` (o `.next` si usas Next.js standard SSR)

### Paso 3: Configurar Compatibility Flags (Muy Importante)
En la sección **Settings** -> **Functions** -> **Compatibility flags** de tu proyecto en Cloudflare Pages, añade:
- `nodejs_compat` (Permite usar APIs de Node.js en Cloudflare Edge runtime).

---

## ⚡ Opción 2: Despliegue Directo desde Terminal (WCLI / Wrangler)

Si prefieres desplegar directamente desde tu máquina local usando la CLI:

```bash
# 1. Iniciar sesión en Cloudflare (solo la primera vez)
npx wrangler login

# 2. Compilar para Cloudflare
npm run build:cf

# 3. Desplegar
npm run deploy:cf
```

---

## 🔐 Variables de Entorno (Environment Variables)

En el panel de Cloudflare Pages (**Settings** -> **Environment variables**), añade las siguientes variables en **Production** y **Preview**:

| Variable | Descripción |
| :--- | :--- |
| `BLOB_READ_WRITE_TOKEN` | Token para almacenamiento persistente del Blog (Vercel Blob Storage) |
| `ADMIN_PASSWORD` | Contraseña para el panel administrativo del Blog (`/admin`) |

---

## 🌐 Configurar Dominio Personalizado (`calculadorasat.org`)

1. En tu proyecto de Cloudflare Pages, ve a **Custom Domains**.
2. Haz clic en **Set up a custom domain**.
3. Añade:
   - `calculadorasat.org`
   - `www.calculadorasat.org`
4. Cloudflare asignará automáticamente los certificados SSL/TLS gratuitos y la aceleración CDN global.
