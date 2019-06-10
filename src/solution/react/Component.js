import ReactDOM from '../react-dom';

class Component {
    constructor(props) {
        this.props = props;
    }

    setState(state) {
        // Do not rerender if setState is called with null or undefined
        if (state == null) {
            return;
        }

        if (typeof state === 'function') {
            this.state = { ...this.state, ...state(this.state) };
        } else {
            this.state = { ...this.state, ...state };
        }

        ReactDOM._reRender();
    }

    render() {
        throw new Error('React.Component may not be used directly. Create your own class which extends this class.');
    }
}

Component.prototype.isReactComponent = {};

export default Component;
