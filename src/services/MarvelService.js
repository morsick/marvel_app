const MAX_DESCRIPTION_LEN = 190;
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

	getCharacterById = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res);
	}

	_transformCharacter = (res) => {
		const {name, description, thumbnail, urls} = res.data.results[0];
		return {
			name: name,
			description: this._transformDescription(description),
			thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
			homepage: urls[0].url,
			wiki: urls[1].url,
		}
	}

	_transformDescription(description) {
		if (description.length > MAX_DESCRIPTION_LEN) {
			description = description.slice(0, MAX_DESCRIPTION_LEN) + '...';
		}
		return description || "Сharacter description is missing.";
	}
}

export default MarvelService