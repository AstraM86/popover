export default class Popover {
  constructor(trigger, options = {}) {
    this.trigger = trigger;
    this.title = options.title || trigger.dataset.title || 'Popover title';
    this.content = options.content || trigger.dataset.content || 'And here\'s some amazing content. It\'s very engaging. Right?';
    this.popover = null;
    this.isShown = false;

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.trigger.addEventListener('click', this.handleTriggerClick);
    document.addEventListener('click', this.handleDocumentClick);
  }

  createPopoverElement() {
    const div = document.createElement('div');
    div.className = 'popover';
    div.innerHTML = `
      <div class="popover-header">${this.title}</div>
      <div class="popover-body">${this.content}</div>
    `;
    return div;
  }

  show() {
    if (this.popover) return;

    this.popover = this.createPopoverElement();
    document.body.appendChild(this.popover);
    this.positionPopover();
    this.isShown = true;
  }

  hide() {
    if (!this.popover) return;
    this.popover.remove();
    this.popover = null;
    this.isShown = false;
  }

  positionPopover() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();

    const top = triggerRect.top - popoverRect.height - 8 + window.scrollY;
    const left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2) + window.scrollX;

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  }

  handleTriggerClick(event) {
    event.stopPropagation();
    if (this.isShown) {
      this.hide();
    } else {
      // Закрыть все другие popovers перед открытием нового (если их несколько)
      document.querySelectorAll('.popover').forEach(pop => pop.remove());
      this.show();
    }
  }

  handleDocumentClick(event) {
    if (!this.isShown) return;
    if (!this.popover.contains(event.target) && !this.trigger.contains(event.target)) {
      this.hide();
    }
  }
}
