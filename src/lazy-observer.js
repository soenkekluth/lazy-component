var lazyObserver;

class LazyObserver {
  constructor(props = {}) {
    this.props = Object.assign({}, LazyObserver.defaultProps, props);

    this.components = new Map();

    const { root, rootMargin, threshold } = this.props;

    if (
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype
    ) {
      this.observer = new window.IntersectionObserver(this.onIntersection.bind(this), { root, rootMargin, threshold });
    }
  }

  observe(component) {
    if (!this.components.has(component.props.element)) {
      this.observer.observe(component.props.element);
      this.components.set(component.props.element, component);
    }

    // if (this.components.indexOf(component) === -1) {
    //   this.observer.observe(component);
    //   this.components.push(component);
    // }
    return component;
  }

  unobserve(component) {
    if (this.components.has(component.props.element)) {
      this.observer.observe(component.props.element);
      this.components.delete(component.props.element);
    }
    // const index = this.components.indexOf(component);
    // if (index > -1) {
    //   this.observer.unobserve(component);
    //   this.components.splice(index, 1);
    // }
    return component;
  }

  onIntersection(entries, observer) {
    entries.forEach(entry => {
      const component = this.components.get(entry.target);
      if (component.state.active !== entry.isIntersecting) {
        component.setState({ active: entry.isIntersecting });
      }
      if (entry.isIntersecting) {
        // console.log('entry', entry);
        // component.setState({ active: true });
        // console.log('entry.target', entry.target);
        // let lazyImage = entry.target;
        // lazyImage.src = lazyImage.dataset.src;
        // lazyImage.srcset = lazyImage.dataset.srcset;
        // lazyImage.classList.remove('lazy');
        // observer.unobserve(lazyImage);
      }
    });
    if (this.props.callback) {
      this.props.callback.call(this, entries, observer);
    }
  }
}

LazyObserver.defaultProps = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: [0.0, 0.75],
  callback: null,
};

export const lazy = component => {
  if (!lazyObserver) {
    lazyObserver = new LazyObserver();
  }
  return lazyObserver.observe(component);
};

export default LazyObserver;

// isIntersecting = element => element.isIntersecting || element.intersectionRatio > 0;

// document.addEventListener('DOMContentLoaded', function() {
//   var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

//   if (
//     'IntersectionObserver' in window &&
//     'IntersectionObserverEntry' in window &&
//     'intersectionRatio' in window.IntersectionObserverEntry.prototype
//   ) {
//     let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
//       entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//           let lazyImage = entry.target;
//           lazyImage.src = lazyImage.dataset.src;
//           lazyImage.srcset = lazyImage.dataset.srcset;
//           lazyImage.classList.remove('lazy');
//           lazyImageObserver.unobserve(lazyImage);
//         }
//       });
//     });

//     lazyImages.forEach(function(lazyImage) {
//       lazyImageObserver.observe(lazyImage);
//     });
//   }
// });
