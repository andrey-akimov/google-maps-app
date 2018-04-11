import React, { Component } from 'react';
import { Grid, List, Loader } from 'semantic-ui-react';
import axios from 'axios';
import UsersMap from '../components/UsersMap';

class PageUsersList extends Component {
	state = {
		users: [],
		markers: [],
		loading: false
	};

	clickHandler = id => {
		let curentUser = this.state.users.filter(user => user._id === id)[0].markers;
		this.setState({ markers: curentUser });
	};

	// CDM
	componentDidMount() {
		this.setState({ loading: true });
		axios
			.get('/')
			.then(res => {
				this.setState({
					users: res.data,
					loading: false
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		const usersList = this.state.users;
		return (
			<Grid columns="equal">
				<Grid.Row>
					<Grid.Column width={14}>
						<UsersMap markers={this.state.markers} />
					</Grid.Column>
					<Grid.Column>
						<h3 className="center">Users list:</h3>
						{this.state.loading ? (
							// LOADER
							<Loader
								style={{ marginTop: '5vh' }}
								size="huge"
								active
								inline="centered"
							/>
						) : // USERS LIST
						usersList.length > 0 ? (
							<List selection verticalAlign="middle">
								{usersList.map(user => (
									<List.Item
										key={user._id}
										onClick={() => this.clickHandler(user._id)}
									>
										<List.Content>
											<List.Header>{user.login}</List.Header>
										</List.Content>
									</List.Item>
								))}
							</List>
						) : (
							<p className="center">There are no users :(</p>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default PageUsersList;
