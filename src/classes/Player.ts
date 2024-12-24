export default class Player {

	private readonly _data: any;

	constructor( data: object ) {
		this._data = data;
	}

	get data(): any {
		return this._data;
	}
}