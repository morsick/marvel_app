import CharListItem from '../charListItem/CharListItem'
import './charList.scss';
import nextId from "react-id-generator";

import { Component } from 'react';

class CharList extends Component {
	constructor(props) {
		super(props);

		this.currentItems = [];

		this.state = {
			itemOnPage: 9
		}
	}

	getCharList = () => {
		const { itemOnPage } = this.state;

		if (this.currentItems.length !== itemOnPage) {
			for (let i = this.currentItems.length; i < itemOnPage; i++) {
				const id = nextId();
				const charId = Math.round(Math.random() * (1011400 - 1011000) + 1011000);
				this.currentItems.push(<CharListItem key={id} charId={charId} onCharSelected={this.props.onCharSelected} />);
			}
		}

		return this.currentItems;
	}

	onLoadMoreCharItemClick = () => {
		this.setState((props) => {
			return ({
				itemOnPage: props.itemOnPage + 9,
			});
		});
	}

	render() {
		return (
			<div className="char__list">
				<ul className="char__grid">
					{this.getCharList()}
				</ul>
				<button className="button button__main button__long" onClick={this.onLoadMoreCharItemClick}>
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;