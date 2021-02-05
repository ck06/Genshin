abstract class ResourceAbstract {
    private readonly _name: string;
    private readonly _amount: number;
    private readonly _quality: number;

    protected constructor(item: string, amount: number, quality: number) {
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
}
