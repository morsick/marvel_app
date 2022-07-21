class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=fb3540f6a77b3f12c9a2a0483d125d4f';

	getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw Error(`Could not fetch ${url}, status ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = () => {
		return this.getResource(`${this._apiBase}characters?limit=9&offset=150&${this._apiKey}`);
	}

	getAllCharacter = (id) => {
		return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
	}
}

export default MarvelService