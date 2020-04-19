import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserEdit from './UserEdit'
import Homepage from "./homepage.jsx";
import MyRequests from './myRequests.jsx';



export default class Routes extends Component {
    _isMounted = false;
    state = {
        filterMyRequests: []
    }
    getMyRequests = (data) => {
        this.setState({ filterMyRequests: data })
    }
    componentDidMount() {

        this._isMounted = true;
    
        this.eventSource= new EventSource('https://34.71.199.201:8081/api/deleted/posts');
        this.eventSource.onmessage = e =>
          this.deletePost(JSON.parse(e.data), e);
      }
      deletePost(data, e) {
        console.log('In delete post')
        let post = this.state.filterMyRequests
        let post_id = data['_id']
        post = post.filter(item => item['_id']['$oid'] !== post_id)
        console.log(post)
    
        this.setState({ filterMyRequests: post});
    }

    componentWillUnmount() {
        this._isMounted = false;
    
        if (this.eventSource)
          this.eventSource.close();
    }
    
    render() {
        return (
            <Router>
                <Switch>

                    <Route exact path="/" render={props =>
                        (<Homepage {...props} filterReq={this.getMyRequests} />)
                    } />/>

                <Route exact path="/myRequests" render={props =>
                        (<MyRequests {...props} filterRes={this.state.filterMyRequests} />)
                    } />
                    <Route path='/profile/edit' component={UserEdit} />
                </Switch>
            </Router>
        )
    }
}
