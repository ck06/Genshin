class QualityConverter {
    private qualityToString: Record<number, string> = {
        1: 'grey',
        2: 'green',
        3: 'blue',
        4: 'purple',
        5: 'gold',
    };

    public getStringForQuality(quality: number): string {
        return this.qualityToString[quality];
    }
}
