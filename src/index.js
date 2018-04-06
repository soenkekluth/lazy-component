import LazyComponent from './lazy-component';

document.addEventListener('DOMContentLoaded', function() {
  const elements = [].slice.call(document.querySelectorAll('.lazy'));

  elements.forEach(element => {
    new LazyComponent({ element: element, name: element.id });
  });
});
