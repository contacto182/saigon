/**
 * HUD Manager - Handles the tactical HUD display
 */

import { HUD_CONFIG } from './config';
import { querySelector } from './utils';

export class HUDManager {
  private timeElement: HTMLElement | null = null;
  private intervalId: number | null = null;

  constructor() {
    this.timeElement = querySelector<HTMLElement>('#hudTime');
  }

  /**
   * Initialize HUD and start time updates
   */
  public init(): void {
    if (!this.timeElement) {
      console.warn('HUD time element not found');
      return;
    }

    this.updateTime();
    this.startClock();
  }

  /**
   * Start the clock update interval
   */
  private startClock(): void {
    this.intervalId = window.setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  /**
   * Update the displayed time
   */
  private updateTime(): void {
    if (!this.timeElement) return;

    const now = new Date();
    const timeString = this.formatTime(now);
    this.timeElement.textContent = `${timeString} ZULU`;
  }

  /**
   * Format time in 24-hour format
   */
  private formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  /**
   * Stop the clock and cleanup
   */
  public destroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
