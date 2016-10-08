import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import SubscribersTable from '../../components/lists/SubscribersTable';
import { getListSubscribers } from '../../actions/listActions';

function mapStateToProps(state) {
  return {
    subscribers: state.manageListSubscribers.subscribers,
    isGetting: state.manageListSubscribers.isGetting
  };
}

@connect(mapStateToProps, { getListSubscribers })
export default class ManageListSubscribers extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      subscribers: this.props.subscribers,
      isGetting: this.props.isGetting
    };
  }

  static propTypes = {
    subscribers: PropTypes.array.isRequired,
    isGetting: PropTypes.bool.isRequired
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      subscribers: newProps.subscribers,
      isGetting: newProps.isGetting
    });
  }

  componentDidMount() {
    this.props.getListSubscribers(this.props.params.listId);
  }

  render() {
    return (
      <div>
        <div className="content-header">
          <h1>Manage List:
            <small></small>
          </h1>
        </div>

        <section className="content">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">Your lists</h3>
            </div>

            <div className="box-body">
              {!!this.props.subscribers.length && 
                <SubscribersTable subscribers={this.state.subscribers} fields={['email']} />
              }
              {this.props.isGetting && <div className="overlay">
                <FontAwesome name="refresh" spin/>
              </div>}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
