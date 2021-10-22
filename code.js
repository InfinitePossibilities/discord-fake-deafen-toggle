/**
 * All this version does is add an easier toggle buytton to the script.
 * The default script requires a Discord restart in order to fix the "fake deafen".
 *
 * Simply toggle "Fake Deafen" by pressing the Right Alt key on your keyboard.
 */

var text = new TextDecoder("utf-8");
var _fakeDeafen = false;
var _keyUpEvent = true;

WebSocket.prototype.original = WebSocket.prototype.send;
WebSocket.prototype.send = function(data) {
	if (_fakeDeafen) {
		if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
			if (text.decode(data).includes("self_deaf")) {
				console.log("found mute/deafen data");
				data = data.replace('"self_mute":false', 'NiceOneDiscord');
				console.log("faked - borkgang.com");
			}
		}
	}
	WebSocket.prototype.original.apply(this, [data]);
}

// ------- //

var _keyUpEventFunc = function(e) {
	var keyLocation = ["Standard", "Left", "Right", "Numpad", "Mobile", "Joystick"][e.location];
	if (e.key == "Alt" && keyLocation == "Right") {
		if(document.querySelectorAll('[aria-label="Deafen"')[0].ariaChecked == "false") {
			document.querySelectorAll('[aria-label="Deafen"')[0].click()
			setTimeout(() => { _fakeDeafen ? _fakeDeafen = false : _fakeDeafen = true;; }, 100);
			setTimeout(() => { document.querySelectorAll('[aria-label="Deafen"')[0].click(); }, 100);
			console.log("Toggled fake deafen: " + _fakeDeafen)
			return;
		}
		
		_fakeDeafen ? _fakeDeafen = false : _fakeDeafen = true;
		document.querySelectorAll('[aria-label="Deafen"')[0].click()
		console.log("Toggled fake deafen: " + _fakeDeafen)
	}
}

document.addEventListener("keyup", function(e) {
	if (_keyUpEvent) {
		_keyUpEventFunc(e);
	}
}, false);
