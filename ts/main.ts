/**
 * Main Application Entry Point
 * Area 51 Airsoft - Tactical Operations Website
 */

import { HUDManager } from './hud';
import { MapManager } from './maps';
import { FormValidator } from './form';
import { ScrollManager } from './scroll';
import { LoadingManager } from './loading';
import { onReady } from './utils';

/**
 * Main Application Class
 */
class AirsoftApp {
  private hudManager: HUDManager;
  private mapManager: MapManager;
  private formValidator: FormValidator;
  private scrollManager: ScrollManager;
  private loadingManager: LoadingManager;

  constructor() {
    this.hudManager = new HUDManager();
    this.mapManager = new MapManager();
    this.formValidator = new FormValidator();
    this.scrollManager = new ScrollManager();
    this.loadingManager = new LoadingManager();
  }

  /**
   * Initialize all application modules
   */
  public init(): void {
    console.log('🎯 Initializing Area 51 Airsoft Operations...');

    try {
      // Start loading sequence
      this.loadingManager.init();

      // Initialize HUD
      this.hudManager.init();

      // Render maps
      this.mapManager.init();

      // Setup form validation
      this.formValidator.init();

      // Setup scroll behaviors
      this.scrollManager.init();

      // Setup additional features
      this.setupFeatureCards();
      this.setupProtocolList();

      console.log('✅ All systems operational');
    } catch (error) {
      console.error('❌ Initialization failed:', error);
    }
  }

  /**
   * Setup feature card hover effects
   */
  private setupFeatureCards(): void {
    const featureCards = document.querySelectorAll<HTMLElement>('.feature-card');

    featureCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
      });
    });
  }

  /**
   * Setup protocol list animations
   */
  private setupProtocolList(): void {
    const protocolItems = document.querySelectorAll<HTMLElement>('.protocol-list li');

    protocolItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';

      setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 100);
    });
  }

  /**
   * Cleanup and destroy all managers
   */
  public destroy(): void {
    this.hudManager.destroy();
    this.scrollManager.destroy();
  }
}

/**
 * Initialize application when DOM is ready
 */
onReady(() => {
  const app = new AirsoftApp();
  app.init();

  // Make app instance globally available for debugging
  (window as any).airsoftApp = app;
});
