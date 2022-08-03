import React from 'react';
import PropTypes from 'prop-types'
import CharListItem from '../charListItem/CharListItem'
import './charList.scss';
import nextId from "react-id-generator";

import { Component } from 'react';

class CharList extends Component {
	constructor(props) {
		super(props);

		this.currentItems = [];
		this.currentItemsRef = [];

		this.state = {
			itemOnPage: 3
		}
	}

	selectCharItemBy = (id) => {
		this.currentItemsRef.forEach((ref) => {
			const state = ref.current.getCharId() === id ? true : false;
			ref.current.updateSelectState(state);
		});
	}

	getCharList = () => {
		const { itemOnPage } = this.state;

		if (this.currentItems.length !== itemOnPage) {
			for (let i = this.currentItems.length; i < itemOnPage; i++) {
				const charRef = React.createRef();
				const id = nextId();
				const charId = Math.round(Math.random() * (1011400 - 1011000) + 1011000);
				this.currentItems.push(<CharListItem ref={charRef} key={id} charId={charId} onCharSelected={this.props.onCharSelected} />);
				this.currentItemsRef.push(charRef);
			}
		}

		return this.currentItems;
	}

	onLoadMoreCharItemClick = () => {
		this.setState((props) => {
			return ({
				itemOnPage: props.itemOnPage + 3,
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

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}

export default CharList;