export default abstract class AbstractResource {
    private readonly _name: string;
    private readonly _quality: number;

    private _amount: number;

    public constructor(item: string, amount: number, quality: number) {
        this._name = item;
        this._amount = amount;
        this._quality = quality;
    }

    public get name(): string {
        return this._name;
    }

    public get amount(): number {
        return this._amount;
    }

    public get quality(): number {
        return this._quality;
    }

    public add(amount: number): void {
        this._amount += amount;
    }
}
