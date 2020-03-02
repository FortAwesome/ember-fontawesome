import Controller from '@ember/controller'
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked isSpinning = false;
  @tracked isPulsing = false;
  @tracked magic = 0;

  @action
  toggleSpinning() {
    this.isSpinning = !this.isSpinning;
  }
  @action
  togglePulsing() {
    this.isPulsing = !this.isPulsing;
  }
}
