export class SimpleCardinality {
    from: {min: string, max: string};
    to: {min: string, max: string};

    constructor(from: {min: string, max: string}, to: {min: string, max: string}) {
        this.from = from;
        this.to = to;
    }

}
