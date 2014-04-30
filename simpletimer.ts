/*
 Copyright 2014 Joshua Strobl

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// #region SimpleTimer (Improved window.setInterval() / window.setTimeout()) written in Typescript

class SimpleTimer{
	timerObject : any;
	timerPauseObject : any;

	timerActive : Boolean; // If the timer is active
	timerAction : Function; // Timer's function defined during construction
	timerRunOnce : Boolean; // Define whether to run the Timer once. Defaults to false

	// #region Time Keeping

	timerDuration : number; // The duration / delay of the timer
	remainingTime : number; // The time remaining since the last tick.
	startTime : number; // The start time of the last tick.

	// #endregion

	timerDidPause : Boolean; // True/false boolean if the timer has been paused at some point

	constructor(options : Object){
		if (typeof(options["action"]) == "function"){ // If the function that is executed on timer tick is defined and is in fact a function
			this.timerAction = options["action"]; // Define the timer's timerAction as the function defined

			if (typeof(options["duration"]) == "number"){ // If the timer duration is defined and is a number
				this.timerDuration = options["duration"]; // Define the timer's timerDuration as the milliseconds defined

				if (typeof(options["once"]) == "boolean"){ // If the timer once is defined and is a boolean
					this.timerRunOnce = options["once"]; // Define the timer's timerRunOnce boolean as the once defined
				}
				else{ // If the timer once is NOT defined
					this.timerRunOnce = false; // Default to false
				}

				if ((typeof(options["autostart"]) == "boolean") && (options["autostart"] == true)){ // If autostart is defined and is set to true
					this.generate(); // Generate and automatically start timer
				}
				else{ // If autostart is NOT defined
					this.timerActive = false; // Declare the timer to be inactive so we can properly generate when this.start() is called
				}

				this.timerDidPause = false;

				return undefined; // Return undefined (nothing)
			}
			else{ // If the duration option was NOT defined or was defined but isn't a number
				throw new Error("Timer duration was not defined or is not a number."); // Return a TypeError regarding the duration
			}
		}
		else{ // If the timer action was NOT defined or was defined but isn't a function
			throw new Error("Timer action was not defined or is not a function."); // Return a TypeError regarding the action
		}
	}

	generate(){ // Function that creates / generates a Timer
		this.timerActive = true; // Set the timerActive to true

		if ((this.timerDidPause == true) || (this.timerRunOnce == true)){ // If the timer was paused previously or we are only going to run the timer once
			this.timerPauseObject = window.setTimeout( // Define timerPauseObject as the timeout ID. Use timeout so we can ensure we use the rest of the time before moving to next tick
				function(){
					this.timerAction(); // Call timerAction()
					this.timerDidPause = false; // Set the timerDidPause to false, so we start using setInterval() again
					this.timerPauseObject = null; // Define the timerPauseObject as null

					this.remainingTime = this.timerDuration; // Set the remainingTime to the time specified in the timerDuration
					this.startTime = Date.now(); // Set the startTime of the tick to the current Date / Time

					if (this.timerRunOnce == false){ //  If we are running the timer more than once
						this.generate(); // Regenerate the Timer
					}
					else{ // If the timer is only running ONCE
						this.timerActive = false; // Set the timer active to false now that we have executed the timerAction() function
						this.remainingTime = 0; // Force the remainingTime to zero
						this.timerDidPause = null; // Force the timerDidPause to null
					}

					window.clearTimeout(this.timerPauseObject); // Remove the timerPauseObject
				}.bind(this)
			, this.remainingTime);
		}
		else{ // If the timer was NOT paused previously
			this.timerObject = window.setInterval( // Define timerObject as the ID provided by setInterval(), it'll run every x MS based on timerDuration
				 function(){
					this.startTime = Date.now(); // Start time of the tick is now
					this.remainingTime = this.timerDuration; // Remaining time is the duration of the timer
					this.timerAction(); // Call the timerAction
				 }.bind(this)
			, this.timerDuration);
		}
	}

	start(){ // Function for starting the timer
		if (this.timerActive == false){ // If the timer is not already active
			this.generate(); // Regenerate the timer
			return undefined; // Return undefined (nothing)
		}
		else{ // If the timer is already active
			throw new Error("The timer is already running."); // Return an error
		}
	}

	pause(){ // Function for pausing the timer
		if (this.timerActive == true){ // If the timer is active, pause it
			this.remainingTime = Date.now() - this.startTime; // Set the remaining time equal to the current time is MS minus the start time in MS
			this.timerDidPause = true; // Declare that the timer has paused

			this.stop(); // Stop the timer

			return undefined; // Return undefined (nothing)
		}
		else{ // If the timer is NOT active
			throw new Error("Timer is not running. Can't pause a timer that isn't running in the first place."); // Return an error
		}
	}

	restart(){ // Function that restarts the timer
		this.stop();
		this.start();
	}

	stop(){ // Function that stops the timer
		if ((this.timerActive == true) || (this.timerDidPause == true)){ // If the timer is active or the timer is paused
			this.timerActive = false;

			if (typeof(this.timerPauseObject) == "number"){ // If the timerPauseObject is a number, meaning we are pausing a timer prior to the end of a tick where we have unpaused it
				var tempTimerObject = this.timerPauseObject; // Declare tempTimerObject as the timerPauseObject, which we can properly pass on to window.{}
				window.clearTimeout(tempTimerObject); // Clear the timeout
				this.timerPauseObject = null;
			}
			else{ // If the timerPauseObject is NOT a number, meaning we are using a traditional timer object
				var tempTimerObject = this.timerObject; // Declare tempTimerObject as the timerObject, which we can properly pass on to window.{}
				window.clearInterval(tempTimerObject); // Clear the interval
				this.timerObject = null;
			}

			return undefined; // Return undefined (nothing)
		}
		else{
			throw new Error("Can't stop a timer that doesn't exist.");
		}
	}
}

// #endregion