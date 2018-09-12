export class SimpleCardinality {
    from: {min: number, max: number};
    to: {min: number, max: number};

    constructor(from: {min: number, max: number}, to: {min: number, max: number}) {
        this.from = from;
        this.to = to;
    }

}
