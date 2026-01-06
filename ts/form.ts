/**
 * Form Validator - Handles form validation and submission
 */

import { FormData, ValidationResult, FormField } from './types';
import { VALIDATION_RULES } from './config';
import { querySelector, querySelectorAll, parseDate, getMinDate } from './utils';

export class FormValidator {
  private form: HTMLFormElement | null = null;
  private errors: Map<FormField, string> = new Map();

  constructor() {
    this.form = querySelector<HTMLFormElement>('#reservationForm');
  }

  /**
   * Initialize form validation
   */
  public init(): void {
    if (!this.form) {
      console.warn('Reservation form not found');
      return;
    }

    this.setupEventListeners();
    this.setMinDate();
  }

  /**
   * Set minimum date for date input
   */
  private setMinDate(): void {
    const dateInput = this.form?.querySelector<HTMLInputElement>('input[name="date"]');
    if (dateInput) {
      dateInput.min = getMinDate();
    }
  }

  /**
   * Setup form event listeners
   */
  private setupEventListeners(): void {
    if (!this.form) return;

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time validation
    const inputs = querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input, textarea',
      this.form
    );

    inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        this.validateField(input.name as FormField, input.value);
      });

      input.addEventListener('input', () => {
        this.clearError(input.name as FormField);
      });
    });
  }

  /**
   * Handle form submission
   */
  private handleSubmit(): void {
    const formData = this.getFormData();
    const validation = this.validateForm(formData);

    if (validation.isValid) {
      this.submitForm(formData);
    } else {
      this.displayErrors(validation.errors);
    }
  }

  /**
   * Get form data
   */
  private getFormData(): FormData {
    const operators = this.form?.querySelector<HTMLInputElement>('input[name="operators"]');
    const date = this.form?.querySelector<HTMLInputElement>('input[name="date"]');
    const message = this.form?.querySelector<HTMLTextAreaElement>('textarea[name="message"]');

    return {
      operators: parseInt(operators?.value || '0', 10),
      date: date?.value || '',
      message: message?.value || '',
    };
  }

  /**
   * Validate entire form
   */
  private validateForm(data: FormData): ValidationResult {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validate operators
    const operatorsError = this.validateOperators(data.operators);
    if (operatorsError) {
      errors.operators = operatorsError;
      isValid = false;
    }

    // Validate date
    const dateError = this.validateDate(data.date);
    if (dateError) {
      errors.date = dateError;
      isValid = false;
    }

    // Validate message
    const messageError = this.validateMessage(data.message);
    if (messageError) {
      errors.message = messageError;
      isValid = false;
    }

    return { isValid, errors };
  }

  /**
   * Validate single field
   */
  private validateField(field: FormField, value: string): void {
    let error: string | null = null;

    switch (field) {
      case 'operators':
        error = this.validateOperators(parseInt(value, 10));
        break;
      case 'date':
        error = this.validateDate(value);
        break;
      case 'message':
        error = this.validateMessage(value);
        break;
    }

    if (error) {
      this.errors.set(field, error);
      this.showError(field, error);
    } else {
      this.errors.delete(field);
      this.clearError(field);
    }
  }

  /**
   * Validate operators count
   */
  private validateOperators(value: number): string | null {
    const rules = VALIDATION_RULES.operators;

    if (!value || isNaN(value)) {
      return rules.message;
    }

    if (value < rules.min || value > rules.max) {
      return rules.message;
    }

    return null;
  }

  /**
   * Validate date
   */
  private validateDate(value: string): string | null {
    const rules = VALIDATION_RULES.date;

    if (!value) {
      return rules.message;
    }

    const date = parseDate(value);
    if (!date) {
      return 'Fecha inválida';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return 'La fecha debe ser hoy o posterior';
    }

    return null;
  }

  /**
   * Validate message
   */
  private validateMessage(value: string): string | null {
    const rules = VALIDATION_RULES.message;

    if (!value || value.trim().length === 0) {
      return rules.message;
    }

    if (value.length < rules.minLength || value.length > rules.maxLength) {
      return rules.message;
    }

    return null;
  }

  /**
   * Display all errors
   */
  private displayErrors(errors: Record<string, string>): void {
    Object.entries(errors).forEach(([field, message]) => {
      this.showError(field as FormField, message);
    });
  }

  /**
   * Show error for specific field
   */
  private showError(field: FormField, message: string): void {
    const errorElement = querySelector<HTMLElement>(`[data-error="${field}"]`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
  }

  /**
   * Clear error for specific field
   */
  private clearError(field: FormField): void {
    const errorElement = querySelector<HTMLElement>(`[data-error="${field}"]`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
  }

  /**
   * Submit form data
   */
  private submitForm(data: FormData): void {
    console.log('Form submitted:', data);

    // Show success message
    alert(`✅ MISIÓN REGISTRADA\n\nOperadores: ${data.operators}\nFecha: ${data.date}\n\nRecibirás confirmación en menos de 2 horas.`);

    // Reset form
    this.form?.reset();
    this.errors.clear();

    // Clear all error messages
    const errorElements = querySelectorAll<HTMLElement>('[data-error]');
    errorElements.forEach((el) => {
      el.textContent = '';
      el.classList.remove('visible');
    });
  }
}
