// import LazyObserver from './lazy-observer';
import { lazy } from './lazy-observer';

class LazyComponent {
  constructor(props = {}) {
    this.props = Object.assign({}, LazyComponent.defaultProps, props);
    this.state = {
      observed: this.props.observe,
      started: false,
      stopped: false,
      initialized: false,
      active: false,
    };

    this.render = this.render.bind(this);

    if (this.state.observed) {
      lazy(this);
    }
  }

  setState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    window.requestAnimationFrame(this.render);
    // console.log(this.props.name, this.state);
  }

  render() {
    const { active } = this.state;
    if (active) {
      this.props.element.classList.add('active');
    } else {
      this.props.element.classList.remove('active');
    }
  }
}

LazyComponent.defaultProps = {
  name: '',
  start: false,
  observe: true,
  element: null,
};

export default LazyComponent;
