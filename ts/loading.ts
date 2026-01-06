/**
 * Loading Manager - Handles initial loading screen
 */

import { ANIMATION_CONFIG } from './config';
import { querySelector } from './utils';

export class LoadingManager {
  private loadingScreen: HTMLElement | null = null;
  private mainContent: HTMLElement | null = null;

  constructor() {
    this.loadingScreen = querySelector<HTMLElement>('#loadingScreen');
    this.mainContent = querySelector<HTMLElement>('#mainContent');
  }

  /**
   * Start loading sequence
   */
  public init(): void {
    if (!this.loadingScreen || !this.mainContent) {
      console.warn('Loading screen or main content not found');
      return;
    }

    // Simulate loading
    setTimeout(() => {
      this.hideLoading();
    }, ANIMATION_CONFIG.loadingDuration);
  }

  /**
   * Hide loading screen and show content
   */
  private hideLoading(): void {
    if (!this.loadingScreen || !this.mainContent) return;

    // Fade out loading screen
    this.loadingScreen.classList.add('hidden');

    // Fade in main content
    setTimeout(() => {
      this.mainContent!.classList.add('visible');

      // Initialize Lucide icons after content is visible
      this.initializeIcons();

      // Remove loading screen from DOM
      setTimeout(() => {
        this.loadingScreen?.remove();
      }, 700);
    }, 300);
  }

  /**
   * Initialize Lucide icons
   */
  private initializeIcons(): void {
    if (typeof (window as any).lucide !== 'undefined') {
      (window as any).lucide.createIcons();
    }
  }
}
