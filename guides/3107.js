// Corrupted RK-9 Kennel
//
// made by michengs / HSDN / ITunk

const OPCODES = {
	"S_DUNGEON_EVENT_GAGE": {
		366226: 39917,
		367078: 47028,
		367081: 39359,
		376012: 47078
	}
};

function addOpcodeAndDefinition(mod, name, version = null, definition = null) {
	if (OPCODES[name] !== undefined && OPCODES[name][mod.dispatch.protocolVersion] !== undefined) {
		mod.dispatch.addOpcode(name, OPCODES[name][mod.dispatch.protocolVersion]);
	}
	if (version !== null && definition !== null) {
		mod.dispatch.addDefinition(name, version, definition);
	}
}

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	addOpcodeAndDefinition(dispatch._mod, "S_DUNGEON_EVENT_GAGE", 2, [
		["name", "refString"],
		["message", "refString"],
		["unk", "int32"],
		["type", "int32"],
		["value", "int32"],
		["name", "string"],
		["message", "string"]
	]);

	let boss_seventy = false;
	let msg_a = "unk";
	let msg_b = "unk";
	let mech_reverse = false;
	let mech_notice = false;
	let s_attacks_notice = true;

	const LEFT = 0;
	const RIGHT = 1;
	const UNKNOWN = -1;


	const mech_messages = {
		"out": { message: "Out", message_RU: "От него" },
		"in": { message: "In", message_RU: "К нему" },
		"wave": { message: "Wave", message_RU: "Волна" },
		"unk": { message: "?", message_RU: "?" }
	};

	function code_announce_mech_event(code) {
		// Standard
		if (code == 1) {
			mech_reverse = false;
			print_mech(true, true);

			if (mech_notice) {
				print_mech(false, false);
			}
		}

		// Reverse
		if (code == 0) {
			mech_reverse = true;
			print_mech(true, true);

			if (mech_notice) {
				print_mech(false, false);
			}
		}
	}

	function action_announce_mech_event(action) {
		msg_a = action;
		print_mech(true, false);
	}

	function action_mech_event(action) {
		msg_b = action;
		print_mech(false, false);
		msg_a = msg_b;
		msg_b = "unk";

		dispatch.setTimeout(() => {
			print_mech(true, false);
		}, 7000);

		mech_notice = true;
		dispatch.setTimeout(() => mech_notice = false, 3000);
	}

	function print_mech(next, code) {
		let message = "",
			message_RU = "",
			sub_type = "message";

		if (next) {
			message += "Next: ";
			message_RU += "Далее: ";
			sub_type = "notification";
		}

		if (mech_reverse) {
			message += `${mech_messages[msg_b].message} + ${mech_messages[msg_a].message}`;
			message_RU += `${mech_messages[msg_b].message_RU} + ${mech_messages[msg_a].message_RU}`;
		} else {
			message += `${mech_messages[msg_a].message} + ${mech_messages[msg_b].message}`;
			message_RU += `${mech_messages[msg_a].message_RU} + ${mech_messages[msg_b].message_RU}`;
		}

		if (code) {
			message += `, Code: ${mech_reverse ? "0" : "1"}`;
			message_RU += `, Код: ${mech_reverse ? "0" : "1"}`;
		}

		handlers.text({
			sub_type: sub_type,
			message: message,
			message_RU: message_RU
		});
	}

	function s_attacks_event(side) {
		const delay = boss_seventy ? 2000 : 0;
		let duration = boss_seventy ? 800 : 900;

		if (side == "left") {
			handlers.text({ sub_type: "message", delay: delay, message: "Right Safe", message_RU: "Справа сейф" });
		}

		if (side == "right") {
			handlers.text({ sub_type: "message", delay: delay, message: "Left Safe", message_RU: "Слева сейф" });
		}

		if (s_attacks_notice && boss_seventy) { // <70%
			if (mech_reverse) {
				handlers.text({ sub_type: "message", message: "Triple-S | Out", message_RU: "Трипл-эска | От него" });
				handlers.text({ sub_type: "notification", delay: 4500, message: "Out", message_RU: "От него" });
			} else {
				handlers.text({ sub_type: "message", message: "Triple-S | In", message_RU: "Трипл-эска | К нему" });
				handlers.text({ sub_type: "notification", delay: 4500, message: "In", message_RU: "К нему" });
			}

			handlers.spawn({ func: "circle", args: [false, 445, 0, 0, 10, 300, 5000, 2000] });
			duration = 2000;

			s_attacks_notice = false;
			dispatch.setTimeout(() => s_attacks_notice = true, 10000);
		}

		if (side == "left") { // right safe
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 160, 300, 0, duration, true, null] },
				{ type: "spawn", func: "marker", args: [false, 340, 300, 0, duration, true, null] },
				{ type: "spawn", func: "point", args: [202, 170, 200, 0, duration] },
				{ type: "spawn", func: "point", args: [202, 350, 200, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 170, 210, 180, 290, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 120, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 130, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 140, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 150, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 160, 210, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 300, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 310, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 320, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 330, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 340, 210, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 350, 210, 0, 290, 0, duration] }
			]);
		}

		if (side == "right") {// left safe
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 20, 300, 0, duration, true, null] },
				{ type: "spawn", func: "marker", args: [false, 200, 300, 0, duration, true, null] },
				{ type: "spawn", func: "point", args: [202, 10, 200, 0, duration] },
				{ type: "spawn", func: "point", args: [202, 190, 200, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 10, 210, 0, 290, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 20, 210, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 30, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 40, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 50, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 60, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 240, 250, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 230, 240, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 220, 230, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 210, 220, 0, duration] },
				{ type: "spawn", func: "point", args: [912, 200, 210, 0, duration] },
				{ type: "spawn", func: "vector", args: [912, 190, 210, 180, 290, 0, duration] }
			]);
		}
	}

	let is_reverse = false;
	let glowID
	function wave_attacks_event() {
		const duration = 4500;

		const mech_message = {
			0: [ // left safe
				{ type: "spawn", func: "vector", args: [912, 360, 400, 180, 800, 0, duration] },
				{ type: "spawn", func: "marker", args: [false, 300, 100, 0, duration, true, null] },
				{ type: "spawn", func: "marker", args: [false, 230, 100, 0, duration, true, null] },
			],
			1: [ // right safe
				{ type: "spawn", func: "vector", args: [912, 360, 400, 180, 800, 0, duration] },
				{ type: "spawn", func: "marker", args: [false, 60, 100, 0, duration, true, null] },
				{ type: "spawn", func: "marker", args: [false, 130, 100, 0, duration, true, null] },
			]
		};

		let index = -1;
		let side = glowID;
		if (side === LEFT) {
			index = is_reverse ? 1 : 0;
		} else if (side === RIGHT) {
			index = is_reverse ? 0 : 1;
		}

		if (index === -1) return;

		handlers.event(mech_message[index]);

		glowID = UNKNOWN;

	}



	let pizza_spawn_counter = 0;
	let pizza_event_active = false;
	let pizza_active_guide = false;
	function laser_pizza_event() {
		if (!pizza_active_guide) return;

		if (pizza_spawn_counter >= 8) {
			handlers.event([{
				type: "spawn", func: "marker", args: [false, 0, (25 * 6), 0, 2000, false, null]
			},])
			return
		}

		pizza_spawn_counter++;
		handlers.event([
			// vertical
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, (25 * 10), 0, 4500] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, (25 * 10), 0, 4500] },
			// horizontal
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, (25 * 10), 0, 4500] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, (25 * 10), 0, 4500] }
		]);
	}


	dispatch.hook("S_DUNGEON_EVENT_GAGE", 2, event => {
		if (event.name === "ScanProgress") {
			if (event.value === 85) {
				handlers.text({ sub_type: "message", message: "Drain Soon", message_RU: "Скоро дренаж" });
			}
		}
	});

	return {
		"nd-3107-3000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],
		"ns-3107-3003": [
			{ type: "func", func: laser_pizza_event, check_func: () => pizza_event_active }
		],
		"h-3107-3000-99": [{ type: "func", func: () => boss_seventy = false }],
		"h-3107-3000-70": [
			{ type: "text", sub_type: "notification", message: "70%", message_RU: "70%" },
			{ type: "func", func: () => boss_seventy = true }
		],

		// Action announce
		"dm-0-0-31071418": [{ type: "func", func: action_announce_mech_event, args: ["out"] }],
		"dm-0-0-31071428": [{ type: "func", func: action_announce_mech_event, args: ["out"] }],
		"dm-0-0-31072104": [{ type: "func", func: action_announce_mech_event, args: ["in"] }],
		"dm-0-0-31072166": [{ type: "func", func: action_announce_mech_event, args: ["in"] }],
		"dm-0-0-31073233": [{ type: "func", func: action_announce_mech_event, args: ["wave"] }],
		"dm-0-0-31073235": [{ type: "func", func: action_announce_mech_event, args: ["wave"] }],

		// Code announce
		"dm-0-0-31074334": [{ type: "func", func: code_announce_mech_event, args: [1] }],
		"dm-0-0-31074359": [{ type: "func", func: code_announce_mech_event, args: [1] }],
		"dm-0-0-31074642": [{ type: "func", func: code_announce_mech_event, args: [1] }],
		"dm-0-0-31074104": [{ type: "func", func: code_announce_mech_event, args: [1] }],
		"dm-0-0-31074398": [{ type: "func", func: code_announce_mech_event, args: [1] }],
		"dm-0-0-31075430": [{ type: "func", func: code_announce_mech_event, args: [0] }],
		"dm-0-0-31075984": [{ type: "func", func: code_announce_mech_event, args: [0] }],
		"dm-0-0-31075986": [{ type: "func", func: code_announce_mech_event, args: [0] }],
		"dm-0-0-31075064": [{ type: "func", func: code_announce_mech_event, args: [0] }],
		"dm-0-0-31075464": [{ type: "func", func: code_announce_mech_event, args: [0] }],

		// Action
		"qb-3107-3000-310702": [{ type: "func", func: action_mech_event, args: ["out"] }],
		"qb-3107-3000-310703": [{ type: "func", func: action_mech_event, args: ["in"] }],
		"qb-3107-3000-310704": [{ type: "func", func: action_mech_event, args: ["wave"] }],

		// S-attacks right
		"s-3107-3000-2114-0": [{ type: "func", func: s_attacks_event, args: ["right"] }],
		"s-3107-3000-2114-1": "s-3107-3000-2114-0",
		"s-3107-3000-2114-2": "s-3107-3000-2114-0",
		"s-3107-3000-2114-3": "s-3107-3000-2114-0",
		"s-3107-3000-1331-0": "s-3107-3000-2114-0",
		"s-3107-3000-1331-1": "s-3107-3000-2114-0",
		"s-3107-3000-1331-2": "s-3107-3000-2114-0",
		"s-3107-3000-1331-3": "s-3107-3000-2114-0",
		"s-3107-3000-1112-1": "s-3107-3000-2114-0",
		"s-3107-3000-1107-0": "s-3107-3000-2114-0",
		"s-3107-3000-1107-2": "s-3107-3000-2114-0",
		//
		"s-3107-3000-1119-0": "s-3107-3000-2114-0",
		"s-3107-3000-1119-1": "s-3107-3000-2114-0",
		"s-3107-3000-1119-2": "s-3107-3000-2114-0",
		"s-3107-3000-1119-3": "s-3107-3000-2114-0",
		"s-3107-3000-1323-0": "s-3107-3000-2114-0",
		"s-3107-3000-1323-1": "s-3107-3000-2114-0",
		"s-3107-3000-1323-2": "s-3107-3000-2114-0",
		"s-3107-3000-1323-3": "s-3107-3000-2114-0",
		"s-3107-3000-1127-1": "s-3107-3000-2114-0",
		"s-3107-3000-2118-0": "s-3107-3000-2114-0",
		"s-3107-3000-2118-2": "s-3107-3000-2114-0",

		// S-attacks left
		"s-3107-3000-1320-0": [{ type: "func", func: s_attacks_event, args: ["left"] }],
		"s-3107-3000-1320-1": "s-3107-3000-1320-0",
		"s-3107-3000-1320-2": "s-3107-3000-1320-0",
		"s-3107-3000-1320-3": "s-3107-3000-1320-0",
		"s-3107-3000-1329-0": "s-3107-3000-1320-0",
		"s-3107-3000-1329-1": "s-3107-3000-1320-0",
		"s-3107-3000-1329-2": "s-3107-3000-1320-0",
		"s-3107-3000-1329-3": "s-3107-3000-1320-0",
		"s-3107-3000-1107-1": "s-3107-3000-1320-0",
		"s-3107-3000-1112-0": "s-3107-3000-1320-0",
		"s-3107-3000-1112-2": "s-3107-3000-1320-0",
		//
		"s-3107-3000-1307-0": "s-3107-3000-1320-0",
		"s-3107-3000-1307-1": "s-3107-3000-1320-0",
		"s-3107-3000-1307-2": "s-3107-3000-1320-0",
		"s-3107-3000-1307-3": "s-3107-3000-1320-0",
		"s-3107-3000-2116-0": "s-3107-3000-1320-0",
		"s-3107-3000-2116-1": "s-3107-3000-1320-0",
		"s-3107-3000-2116-2": "s-3107-3000-1320-0",
		"s-3107-3000-2116-3": "s-3107-3000-1320-0",
		"s-3107-3000-2118-1": "s-3107-3000-1320-0",
		"s-3107-3000-1127-0": "s-3107-3000-1320-0",
		"s-3107-3000-1127-2": "s-3107-3000-1320-0",

		// Basic attacks
		"s-3107-3000-1110-0": [{ type: "text", sub_type: "message", message: "Front", message_RU: "Удар вперед" }],
		"s-3107-3000-4000-0": "s-3107-3000-1110-0",
		"s-3107-3000-1310-0": [{ type: "text", sub_type: "message", message: "Front | Back", message_RU: "Удар вперед | Удар назад" }],
		"s-3107-3000-1321-0": "s-3107-3000-1310-0",
		"s-3107-3000-1115-0": [{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад" }],
		"s-3107-3000-1109-0": "s-3107-3000-1115-0",

		"s-3107-3000-1129-0": [
			{ type: "text", sub_type: "message", message: "Combo | Back Wave", message_RU: "Комба | Конус назад" },
			{ type: "spawn", func: "vector", args: [553, 180, 40, 120, 1200, 2000, 3000] },
			{ type: "spawn", func: "vector", args: [553, 180, 40, 240, 1200, 2000, 3000] },
			{ type: "func", func: () => is_reverse = mech_reverse }, // capture `mech_reverse` state as it might change by the time wave_attacks_event gets called
			{ type: "func", delay: 1000, func: wave_attacks_event }
		],
		"s-3107-3000-1305-0": "s-3107-3000-1129-0",
		"s-3107-3000-2102-0": [{ type: "text", class_position: "tank", sub_type: "message", message: "Dodge", message_RU: "Эвейд" }],
		"s-3107-3000-2223-0": "s-3107-3000-2102-0",
		"s-3107-3000-2125-0": [{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 300, 0, 6000] }], // 310702 31070020 31070021 -> 305
		"s-3107-3000-1313-0": [{ type: "text", sub_type: "message", message: "Shield!", message_RU: "Щит!" }],
		"s-3107-3000-2115-0": "s-3107-3000-1313-0",
		"s-3107-3001-1308-0": [
			{ type: "text", sub_type: "message", message: "Bait!", message_RU: "Байт!" },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 90, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 180, 300, 0, 2000] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 270, 300, 0, 2000] }
		],
		"ab-3107-3000-310700020": [{ type: "text", sub_type: "notification", message: "Lasers Soon", message_RU: "Готовность к бомбам" }],

		// Waves mech
		"ab-3107-3000-310703401": [{ type: "func", func: () => glowID = LEFT }],
		"ab-3107-3000-310703403": "ab-3107-3000-310703401",
		"ab-3107-3000-310703405": "ab-3107-3000-310703401",
		"ab-3107-3000-310703407": "ab-3107-3000-310703401",
		"ab-3107-3000-310703408": "ab-3107-3000-310703401",
		"ab-3107-3000-310703402": [{ type: "func", func: () => glowID = RIGHT }],
		"ab-3107-3000-310703404": "ab-3107-3000-310703402",
		"ab-3107-3000-310703406": "ab-3107-3000-310703402",
		"ab-3107-3000-310703409": "ab-3107-3000-310703402",
		"ab-3107-3000-310703410": "ab-3107-3000-310703402",
		// Radar mech
		"qb-3107-3000-31075430": [{ type: "text", sub_type: "message", message: "!!! Radar !!!", message_RU: "!!! Радар !!!" }],
		"s-3107-3000-1118-0": [
			{ type: "text", sub_type: "message", message: "OUT", message_RU: "ОТ НЕГО" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 250, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 200, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 14, 150, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 18, 100, 0, 3000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 50, 50, 0, 3000] }
		],
		"s-3107-3000-2107-0": [
			{ type: "text", sub_type: "message", message: "IN", message_RU: "К НЕМУ" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 10, 300, 0, 3000] }
		],
		"s-3107-3000-1222-0": [
			{ type: "func", func: () => pizza_event_active = true },
			{ type: "text", sub_type: "message", message: "LASERS", message_RU: "ЛАЗЕРЫ" },
			{ type: "func", delay: 3000, func: () => pizza_event_active = false },
			{ type: "func", delay: 3000, func: () => pizza_spawn_counter = 0 },
		],
		"s-3107-3000-1306-0": "s-3107-3000-1222-0",
		"s-3107-3000-1223-0": "s-3107-3000-1222-0",
		"laser-helper": [ // activate with `!guide event t laser-helper`
			{
				type: "func", func: () => {
					pizza_active_guide = !pizza_active_guide
					let msg_state = pizza_active_guide ? "enabled" : "disabled";
					dispatch._mod.command.message(`lasers markers have been ${msg_state}`);
				}
			},
		]
	};
};
