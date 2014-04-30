declare class SimpleTimer {
    public timerObject: any;
    public timerPauseObject: any;
    public timerActive: Boolean;
    public timerAction: Function;
    public timerRunOnce: Boolean;
    public timerDuration: number;
    public remainingTime: number;
    public startTime: number;
    public timerDidPause: Boolean;
    constructor(options: Object);
    public generate(): void;
    public start(): any;
    public pause(): any;
    public restart(): void;
    public stop(): any;
}
