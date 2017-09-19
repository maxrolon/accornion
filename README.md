# Accornion
A React accordion library as small as an acorn (~1kb gzipped)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

### Usage
The open state of each Accordion is handled outside of the accordion itself (via the 'open' prop). See usage below!

```javascript
import Accordion from 'accornion'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  toggle (open) {
    if (open && !this.state.open) {
      this.setState({
        open: true
      })
    } else if (!open && this.state.open) {
      this.setState({
        open: false
      })
    }
  }

  render () {
    return (
      <div>
        <button onClick={e => this.toggle(!this.state.open)}>Accordion Header</button>
        <Accordion 
          open={this.state.open}
          duration=400
          easing='ease-in-out'>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </Accordion>
      </div>
    )
  }
}

```

MIT License
