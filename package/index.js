import React from 'react'

class Accordion extends React.Component {
  constructor (props) {
    super(props)

    let {
      duration = 400,
      easing = 'ease-in-out',
      open = false
    } = this.props

    this.transition = `height ${duration}ms ${easing}`

    this.state = {
      height: (open ? 'auto' : 0),
      transition: 'none',
      closed: !open
    }
  }

  componentDidUpdate (prev) {
    let {open: _open} = prev
    let {open} = this.props
    let {rerender} = this.state

    if (open !== _open) {
      this[open ? 'open' : 'close']()
      return
    }

    if (rerender) {
      setTimeout(() => {
        this.setHeight()
      }, 50)
    }
  }

  close () {
    this.setState({
      height: this.inner.offsetHeight,
      transition: this.transition,
      rerender: true
    })
  }

  open () {
    this.setState({
      transition: this.transition,
      closed: false,
      rerender: true
    })
  }

  setHeight () {
    let {open} = this.props
    this.setState({
      height: (open ? this.inner.offsetHeight : 0),
      rerender: false
    })
  }

  handleTransitionEnd () {
    if (this.props.open) {
      this.setState({height: 'auto'})
    } else {
      this.setState({closed: true})
    }
  }

  render () {
    const {
      height,
      closed
    } = this.state

    let styles = {
      height,
      overflow: 'hidden'
    }

    ;[
      'transition',
      'WebkitTransition',
      'msTransition'
    ].map(prop => (styles[prop] = this.transition))

    const children = (closed)
      ? null
      : this.props.children

    return (
      <div>
        <div
          style={styles}
          onTransitionEnd={() => this.handleTransitionEnd()}>
          <div ref={el => (this.inner = el)}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Accordion
