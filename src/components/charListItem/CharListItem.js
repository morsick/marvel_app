import { Component } from "react";
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			char: {},
			loading: true,
			error: false
		}

		this.charId = this.props.charId;
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	updateChar() {
		this.marvelService.getCharacterById(this.charId).then((res) => {
			this.setState(() => {
				return {
					char: res,
					loading: false
				}
			})
		}).catch(this.onError)
	}

	onError = () => {
		this.setState(() => {
			return {
				loading: false,
				error: true
			}
		})
	}

	render() {
		const { char, loading, error } = this.state;
		const erroreMessage = error ? <ErrorMessage />: null;
		const spinner = loading ? <div style={{ 'margin': '45px -15px' }}><Spinner /></div> : null;
		const content = spinner || <View char={char} />;

		if (erroreMessage)
		{
			return (
				erroreMessage
			);
		}

		return (
			<li className="char__item" onClick={() => { this.props.onCharSelected(this.charId) }}>
				{content}
			</li>
		);
	}
}

const View = ({ char }) => {
	const { name, thumbnail } = char;
	let imgStyle = { 'objectFit': 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { 'objectFit': 'unset' };
	}

	return (
		<div>
			<img src={thumbnail} alt="abyss" style={imgStyle} />
			<div className="char__name">{name}</div>
		</div>
	);
}

export default CharListItem;