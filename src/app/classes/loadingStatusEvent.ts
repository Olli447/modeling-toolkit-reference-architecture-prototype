export class LoadingStatusEvent {
    status: LoadingStatus;
    progress: number;
    message: string;

    constructor(status: LoadingStatus, progress: number, message: string) {
        this.status = status;
        this.progress = progress;
        this.message = message;
    }
}

export enum LoadingStatus {
    UNINITIALISED,
    PENDING,
    WORKING,
    DONE
}
