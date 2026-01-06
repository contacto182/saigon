# Area 51 Airsoft - Tactical Operations Website

![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![License](https://img.shields.io/badge/license-MIT-yellow.svg)

## 🎯 Descripción

Sitio web táctico completamente optimizado para **Area 51 Airsoft**, con diseño militar/MILSIM inmersivo. Desarrollado con HTML5, CSS3 puro y TypeScript para máximo rendimiento y mantenibilidad.

## ✨ Características

### 🔧 Arquitectura Optimizada
- **Separación de responsabilidades**: HTML, CSS y TypeScript en archivos separados
- **Tipado fuerte**: TypeScript con strict mode para mayor seguridad
- **Arquitectura modular**: Clases y módulos reutilizables
- **Utilities avanzadas**: Debounce, throttle, smooth scroll

### 🎨 Diseño y UX
- **Diseño responsive**: Mobile-first con breakpoints optimizados
- **Animaciones fluidas**: Intersection Observer para animaciones on-scroll
- **Efectos tácticos**: Scanlines, HUD frame, parallax
- **Tema militar**: Paleta de colores verde militar y negro táctico

### 🚀 Performance
- **Lazy loading**: Imágenes cargadas bajo demanda
- **CSS Variables**: Theming centralizado y rápido
- **Optimización**: Código minificado y tree-shaking
- **SEO**: Meta tags optimizados y estructura semántica

### 📋 Funcionalidades
- ⏰ HUD táctico con reloj en tiempo real
- 🗺️ Sistema de mapas dinámicos generados desde TypeScript
- ✅ Validación de formularios en tiempo real
- 📜 Smooth scroll con offset configurable
- 🎭 Pantalla de carga con animación
- 🔍 Intersection Observer para reveal animations

## 📁 Estructura del Proyecto

```
airsoft/
├── index.html              # HTML principal optimizado
├── css/
│   └── styles.css          # Estilos modulares con variables CSS
├── ts/
│   ├── main.ts            # Entry point de la aplicación
│   ├── config.ts          # Configuración y constantes
│   ├── types.ts           # Definiciones de tipos TypeScript
│   ├── utils.ts           # Funciones utilitarias
│   ├── hud.ts             # Gestor del HUD táctico
│   ├── maps.ts            # Gestor de mapas
│   ├── form.ts            # Validador de formularios
│   ├── scroll.ts          # Gestor de scroll y animaciones
│   └── loading.ts         # Gestor de pantalla de carga
├── assets/                 # Recursos estáticos
├── tsconfig.json          # Configuración TypeScript
├── package.json           # Dependencias del proyecto
└── README.md              # Documentación

```

## 🛠️ Tecnologías

- **HTML5**: Semántico y accesible
- **CSS3**: Variables, Grid, Flexbox, Animaciones
- **TypeScript 5.3**: Tipado estricto y módulos ES2020
- **Lucide Icons**: Iconos SVG optimizados
- **Vite** (opcional): Build tool para desarrollo

## 🚀 Instalación y Uso

### Opción 1: Uso Directo (Sin compilación)

1. Abre `index.html` directamente en el navegador
2. **Nota**: Necesitarás un servidor local para que los módulos ES funcionen correctamente

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con VS Code
# Instala "Live Server" extension y haz click derecho > Open with Live Server
```

### Opción 2: Con TypeScript Compilation

1. **Instalar dependencias**:
```bash
npm install
```

2. **Compilar TypeScript**:
```bash
npm run build
```

3. **Modo desarrollo** (con Vite):
```bash
npm run dev
```

4. **Verificar tipos**:
```bash
npm run type-check
```

## 📝 Configuración

### Modificar Mapas

Edita el archivo `ts/config.ts`:

```typescript
export const MAPS_DATA: MapData[] = [
  {
    id: 'nuevo-mapa',
    name: 'Nuevo Mapa',
    image: 'url-de-la-imagen',
    difficulty: 'Medium',
    capacity: '10-30',
    tags: ['TAG1', 'TAG2'],
    description: 'Descripción del mapa',
  },
  // ... más mapas
];
```

### Modificar Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
  --color-primary: #3A4F3A;  /* Verde Militar */
  --color-accent: #B11226;    /* Rojo Táctico */
  /* ... más colores */
}
```

### Configurar Validación de Formularios

Edita `ts/config.ts`:

```typescript
export const VALIDATION_RULES = {
  operators: {
    min: 1,
    max: 100,
    // ...
  },
  // ...
};
```

## 🎨 Personalización

### Añadir Nuevas Secciones

1. Añade el HTML en `index.html`
2. Añade los estilos en `css/styles.css`
3. Si requiere lógica, crea un nuevo módulo en `ts/`

### Crear Nuevo Módulo TypeScript

```typescript
// ts/nuevo-modulo.ts
export class NuevoModulo {
  constructor() {
    // Inicialización
  }

  public init(): void {
    // Lógica de inicialización
  }
}
```

Luego impórtalo en `main.ts`:

```typescript
import { NuevoModulo } from './nuevo-modulo';

class AirsoftApp {
  private nuevoModulo: NuevoModulo;

  constructor() {
    this.nuevoModulo = new NuevoModulo();
  }
}
```

## 🔍 Características Técnicas Avanzadas

### Intersection Observer
Animaciones activadas cuando los elementos entran en el viewport:

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
```

### Throttle y Debounce
Optimización de performance para eventos frecuentes:

```typescript
const handleScroll = throttle(() => {
  // Lógica de scroll
}, 16); // ~60fps
```

### Validación en Tiempo Real
Sistema de validación modular con feedback instantáneo:

```typescript
input.addEventListener('blur', () => {
  this.validateField(input.name, input.value);
});
```

## 🐛 Debugging

La instancia de la aplicación está disponible globalmente:

```javascript
// En la consola del navegador
window.airsoftApp
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Mobile (iOS Safari, Chrome Android)

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 👥 Autores

- **Area 51 Airsoft Team** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Diseño inspirado en interfaces tácticas militares
- Iconos por [Lucide](https://lucide.dev/)
- Imágenes por [Unsplash](https://unsplash.com/)

---

**© 2026 Area 51 Airsoft - Sin Retroceder** 🎯
