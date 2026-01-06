/**
 * Map Manager - Handles map cards rendering and interactions
 */

import { MapData } from './types';
import { MAPS_DATA } from './config';
import { querySelector, createElementFromHTML } from './utils';

export class MapManager {
  private container: HTMLElement | null = null;
  private maps: MapData[] = [];

  constructor() {
    this.container = querySelector<HTMLElement>('#mapsGrid');
    this.maps = MAPS_DATA;
  }

  /**
   * Initialize and render all maps
   */
  public init(): void {
    if (!this.container) {
      console.warn('Maps grid container not found');
      return;
    }

    this.renderMaps();
  }

  /**
   * Render all map cards
   */
  private renderMaps(): void {
    if (!this.container) return;

    this.container.innerHTML = '';

    this.maps.forEach((map) => {
      const card = this.createMapCard(map);
      if (card) {
        this.container!.appendChild(card);
      }
    });
  }

  /**
   * Create a single map card element
   */
  private createMapCard(map: MapData): HTMLElement | null {
    const tagsHTML = map.tags
      .map((tag) => `<span class="map-tag">${tag}</span>`)
      .join('');

    const html = `
      <div class="map-card" data-map-id="${map.id}">
        <img 
          src="${map.image}" 
          alt="${map.name}" 
          class="map-card-image"
          loading="lazy"
        >
        <div class="map-card-overlay"></div>
        <div class="map-card-border"></div>
        
        <div class="map-card-content">
          <div class="map-card-header">
            <div>
              <span class="map-card-label">ZONA DE OPERACIÓN</span>
              <h3 class="map-card-title">${map.name}</h3>
            </div>
            <div class="map-card-stats">
              <span>DIF: ${map.difficulty}</span>
              <span>OPs: ${map.capacity}</span>
            </div>
          </div>
          
          <div class="map-card-details">
            <p class="map-card-description">${map.description}</p>
            <div class="map-card-tags">
              ${tagsHTML}
            </div>
          </div>
        </div>
      </div>
    `;

    return createElementFromHTML<HTMLElement>(html);
  }

  /**
   * Get map by ID
   */
  public getMapById(id: string): MapData | undefined {
    return this.maps.find((map) => map.id === id);
  }

  /**
   * Filter maps by difficulty
   */
  public filterByDifficulty(difficulty: string): MapData[] {
    return this.maps.filter((map) => map.difficulty === difficulty);
  }
}
