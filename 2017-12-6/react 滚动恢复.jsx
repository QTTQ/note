class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}
export default withRouter(ScrollToTop)

const App = () => (
    <Router>
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </Router>
)

    // or just render it bare anywhere you want, but just one :)
    < ScrollToTop />

class ScrollToTopOnMount extends Component {
    componentDidMount(prevProps) {
        window.scrollTo(0, 0)
    }

    render() {
        return null
    }
}

class LongContent extends Component {
    render() {
        <div>
            <ScrollToTopOnMount />
            <h1>Here is my long content page</h1>
        </div>
    }
}

// somewhere else
<Route path="/long-content" component={LongContent} />

<Router>
    <ScrollRestoration>
        <div>
            <h1>App</h1>

            <RestoredScroll id="bunny">
                <div style={{ height: '200px', overflow: 'auto' }}>
                    I will overflow
        </div>
            </RestoredScroll>
        </div>
    </ScrollRestoration>
</Router>