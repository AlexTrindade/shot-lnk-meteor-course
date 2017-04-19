import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }
  onSubmit(e) {
    const url = this.refs.url.value.trim();
    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose()
      } else {
        this.setState({
          error: err.reason
        })
      }
    });
  }
  onChange(e) {
      this.setState({
        url: e.target.value
      })
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input
                type="text"
                ref="url"
                placeholder="URL"
                onChange={this.onChange.bind(this)}
              />
              <button className="button">Add Link</button>
              <button className="button button--secondary" type="button" onClick={() => this.setState({isOpen: false, url: '', error: ''})}>Cancel</button>
          </form>

        </Modal>
      </div>
    );
  }
}
