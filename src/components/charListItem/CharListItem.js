import { Component } from "react";
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/004 Spinner';
import ErrorMessage from '../erroreMessage/ErroreMessage';

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
		const erroreMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = erroreMessage || spinner || <View char={char} />;

		return (
			<div>
				{content}
			</div>
		);
	}
}

const View = ({ char }) => {
	const { name, thumbnail } = char;

	return (
		<li className="char__item">
			<img src={thumbnail} alt="abyss" />
			<div className="char__name">{name}</div>
		</li>
	);
}

export default CharListItem;