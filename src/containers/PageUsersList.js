import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image, List } from 'semantic-ui-react';
import Map from '../components/Map';

class PageUsersList extends Component {
	state = { markers: [] };

	onUserClick = id => {
		let curentUser = this.props.state.filter(user => user.id === id)[0].markers;
		this.setState({ markers: curentUser });
		console.log('curentUser', curentUser);
	};

	render() {
		const usersList = this.props.state;

		return (
			<Grid columns="equal">
				<Grid.Row>
					<Grid.Column width={14}>
						<Map markers={this.state} />
					</Grid.Column>
					<Grid.Column color="black">
						<h3 className="center">Users list:</h3>
						{usersList.length > 0 ? (
							<ul>
								{usersList.map(user => (
									<li key={user.id} onClick={() => this.onUserClick(user.id)}>
										{user.login}
									</li>
								))}
							</ul>
						) : (
							<p className="center">There are no users :(</p>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	state: state
});

export default connect(mapStateToProps)(PageUsersList);
