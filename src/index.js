import './style.css';
import Popover from './Popover';

const button = document.getElementById('popoverButton');
if (button) {
  new Popover(button);
}
