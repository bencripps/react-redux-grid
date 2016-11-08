import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { gridConfig } from './../../constants/GridConstants';
import { prefix } from './../../util/prefix';
import { debounce, throttle } from './../../util/throttle';
import Row from './TableRow';
import Header from './Header';

const { any, bool, number, object, oneOfType, string } = PropTypes;

export class TableContainer extends Component {

    render() {

        const { CLASS_NAMES } = gridConfig();
        const {
            editorComponent,
            headerProps,
            height,
            rowProps,
            infinite
        } = this.props;

        const { containerScrollTop, containerHeight } = this.state;

        const tableContainerProps = {
            className: prefix(CLASS_NAMES.TABLE_CONTAINER),
            style: {
                height: height
            }
        };

        const tableProps = {
            className: prefix(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_HIDDEN),
            cellSpacing: 0
        };

        return (
            <div { ...tableContainerProps } >
                <table { ...tableProps }>
                    <Header { ...headerProps } />
                    <Row {
                        ...{
                            ...rowProps,
                            containerScrollTop,
                            containerHeight,
                            infinite
                        }
                    } />
                </table>
                { editorComponent }
            </div>
        );
    }

    componentDidMount() {
        const { infinite } = this.props;

        if (infinite) {
            const container = ReactDOM.findDOMNode(this);

            this._scrollListener = throttle(
                this.handleScroll.bind(this),
                this,
                50,
                { leading: false, trailing: true }
            );

            container.addEventListener(
                'scroll',
                this._scrollListener
            );

            this._resizeListener = debounce(this.handleResize.bind(this), 5);

            window.addEventListener('resize', this._resizeListener);

            this.handleResize();
        }
    }
    componentDidUpdate() {
        this.handleResize();
    }

    componentWillUnmount() {
        const container = ReactDOM.findDOMNode(this);

        container.removeEventListener('scroll', this._scrollListener);
        window.removeEventListener('resize', this._resizeListener);
    }

    constructor(props) {
        super(props);

        this.state = {
            containerScrollTop: 0
        };
    }

    static propTypes = {
        editorComponent: any,
        headerProps: object,
        height: oneOfType([
            string,
            number
        ]),
        infinite: bool,
        rowProps: object
    };

    static defaultProps = {
        headerProps: {},
        rowProps: {}
    };

    handleResize = () => {
        const { infinite } = this.props;
        const { containerHeight } = this.state;

        if (infinite) {
            const container = ReactDOM.findDOMNode(this);

            if (containerHeight !== container.clientHeight) {
                this.setState({
                    containerHeight: container.clientHeight
                });
            }
        }
    }

    handleScroll = () => {
        const container = ReactDOM.findDOMNode(this);

        this.setState({
            containerScrollTop: container.scrollTop
        });
    }

}

export default TableContainer;
