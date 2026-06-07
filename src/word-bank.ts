import Words from './words.json'
import SeedRandom from 'seedrandom'

enum WordType {
	Adjective = 'adjectives',
	Common = 'common',
	Logic = 'logic',
	Noun = 'nouns',
	Preposition = 'prepositions',
	Pronoun = 'pronouns',
	Punctuation = 'punctuation',
	Verb = 'verbs'
}

class WordBank {

	#rng : SeedRandom.PRNG

	constructor(seed: string) {
		this.#rng = SeedRandom(seed)
	}

	chooseWords(wordType : WordType, count : number, replace : boolean) {
		const bank = Words[wordType];

		if (replace) {
			return Array(count).fill('').map(() => {
				const idx = Math.floor(this.#rng() * bank.length);
				return bank[idx] || '';
			})
		}

		const tempBank = Array.from(bank);

		const length = Math.min(count, tempBank.length);
		return Array(length).fill('').map(() => {
			const idx = Math.floor(this.#rng() * tempBank.length);
			return tempBank.splice(idx, 1)[0] || '';
		})
	}
}


export { WordType, WordBank };