/**This represents a simple cardinality.
 *
 * It is defined how man incoming relations and how many outgoing relations are allowed*/
export class SimpleCardinality {
    from: {min: string, max: string};
    to: {min: string, max: string};

    constructor(from: {min: string, max: string}, to: {min: string, max: string}) {
        this.from = from;
        this.to = to;
    }

}
