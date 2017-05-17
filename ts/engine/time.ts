// These functions handle changing the clock.
// Right now there is no day counter.
namespace Time {
	function increment() {
		time.minutes++;
		if (time.minutes >= 60) {
			time.minutes -= 60;
			time.hours++;
		}
		if (time.hours >= 24) {
			time.hours -= 24;
			time.days++;
		}
	}

	export function advanceMinutes(minutes: number) {
		//if (timeAware.length > 0) { // If there's a function in timeAware
		//	for (i = 0; i < timeAware.length; i++) {
		//		timeAware[i].advanceTime(minutes);
		//	}
		for (let i = 0; i < minutes; i++) {
			increment();
			player.pregnancyAdvance(); // Advances the Player's pregnancy.
			amily.pregnancyAdvance(); // Advances Amily's pregnancy.
			TamaniScene.tamanipreg.pregnancyAdvance(); //Advances Tamani's pregnancy.
		}
		//pregnancyProgression.updatePregnancy(); // Outputs the results of the Player's pregnancy flags once time passes.
	}

	export function advanceHours(hours: number) {
		Time.advanceMinutes(hours * 60);
	}
}

interface TimeAware {
	advanceTime(minutes: number): void;
}

// Global array for loading in pregnancies and other things that are time sensitive.
const timeAware: TimeAware[] = [];
