import React from 'react'

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.store.getState() }
    props.store.subscribe((data) => {
      this.setState({ data })
    });
  }
  render() {
    const Root = this.props.root
    return <Root data={this.state.data} />;
  }
}

export default Wrapper
