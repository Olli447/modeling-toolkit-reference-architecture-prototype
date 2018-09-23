/** Internal class that is used as payload for the communication between LoadingScreenService and its callers
 * Consits of a status, a possible progress (not implemented yet) and a message about what the tool is doing right know. */
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

/**Used as the status for the {@link LoadingStatusEvent}
 * - UNINITIALISED: The loading screen hasn't been activated yet
 * - PENDING: The application is about to do some heavy workload. The loading screen will appear
 * - WORKING: The application is doing some heavy workload. The loading screen is still active
 * - DONE: The application is finished with the heavy workload. The loading screen will disappear*/
export enum LoadingStatus {
    UNINITIALISED,
    PENDING,
    WORKING,
    DONE
}
