/**
 * Scroll Manager - Handles smooth scrolling and scroll-triggered animations
 */

import { ANIMATION_CONFIG } from './config';
import { smoothScrollTo, querySelectorAll, throttle } from './utils';

export class ScrollManager {
  private scrollButtons: HTMLElement[] = [];
  private animatedElements: HTMLElement[] = [];
  private observerOptions: IntersectionObserverInit;
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.scrollButtons = querySelectorAll<HTMLElement>('[data-scroll-to]');
    this.animatedElements = querySelectorAll<HTMLElement>('.fade-in, .scale-in, .slide-in');

    this.observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: ANIMATION_CONFIG.intersectionThreshold,
    };
  }

  /**
   * Initialize scroll functionality
   */
  public init(): void {
    this.setupScrollButtons();
    this.setupIntersectionObserver();
    this.setupScrollListener();
  }

  /**
   * Setup smooth scroll buttons
   */
  private setupScrollButtons(): void {
    this.scrollButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-scroll-to');
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          smoothScrollTo(targetElement, {
            behavior: 'smooth',
            offset: ANIMATION_CONFIG.scrollOffset,
          });
        }
      });
    });
  }

  /**
   * Setup intersection observer for scroll animations
   */
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer?.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe all animated elements
    this.animatedElements.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  /**
   * Setup scroll listener for parallax effects
   */
  private setupScrollListener(): void {
    const handleScroll = throttle(() => {
      const scrollY = window.pageYOffset;
      this.updateParallax(scrollY);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Update parallax effect based on scroll position
   */
  private updateParallax(scrollY: number): void {
    const heroImage = document.querySelector<HTMLElement>('.hero-image');
    if (heroImage) {
      const parallaxSpeed = 0.5;
      heroImage.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }
  }

  /**
   * Cleanup observers
   */
  public destroy(): void {
    this.observer?.disconnect();
  }
}
