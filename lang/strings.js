'use strict';

// Available strings for different languages
module.exports.general = {

	// Русский
	ru: {
		unknowncommand: "Невереная команда, введите guide help",
		helpheader: "Введите \"guide help\" для вывода справки",
		helpbody: [
			["guide, вкл./выкл. модуля", "PRMSG"],
			["guide gui, показать графический интерфейс", "PRMSG"],
			["guide voice, вкл./выкл. голосовые сообщения", "PRMSG"],
			["guide lNotice, вкл./выкл. отправки сообщений в канал чата", "PRMSG"],
			["guide gNotice, вкл./выкл. отправки сообщений в чат группы", "PRMSG"],
			["guide 1~10, регулировка скорости чтения голосовых сообщений", "PRMSG"],
			["guide spawnObject, вкл./выкл. спавна маркировочных объектов", "PRMSG"],
			["guide stream, вкл./выкл. режима стрима (скрытие сообщений и объектов)", "PRMSG"],
			["guide dungeons, список всех поддерживаемых данжей и их id", "PRMSG"],
			["guide verbose id, вкл./выкл. всех сообщений для данжа, где id - идентификатор данжа", "PRMSG"],
			["guide spawnObject id, вкл./выкл. спавна объектов для данжа, где id - идентификатор данжа", "PRMSG"],
			["guide cc, отобразить текущий цвет системного сообщения", "PRMSG"],
			["guide cr, установить цвет сообщения: красный", "CRMSG"],
			["guide c, установить цвет сообщения: оранжевый", "COMSG"],
			["guide cy, установить цвет сообщения: желтый", "CYMSG"],
			["guide cg, установить цвет сообщения: зеленый", "CGMSG"],
			["guide cdb, установить цвет сообщения: темно-синий", "CDBMSG"],
			["guide cb, установить цвет сообщения: синий", "CBMSG"],
			["guide cv, установить цвет сообщения: фиолетовый", "CVMSG"],
			["guide cp, установить цвет сообщения: розовый", "CPMSG"],
			["guide clp, установить цвет сообщения: светло-розовый", "CLPMSG"],
			["guide clb, установить цвет сообщения: светло-синий", "CLBMSG"],
			["guide cbl, установить цвет сообщения: черный", "CBLMSG"],
			["guide cgr, установить цвет сообщения: серый", "CGRMSG"],
			["guide cw, установить цвет сообщения: белый", "CWMSG"],
		],
		//red: "Красный",
		//green: "Зеленый",
		settings: "Настройки",
		spawnObject: "Спавн объектов",
		speaks: "Голосовые сообщения",
		lNotice: "Сообщения в чат",
		gNotice: "Отправка сообщений членам группы",
		stream: "Режим стримера",
		rate: "Скорость речи",
		color: "Выбор цвета",
		dungeons: "Настройки данжей",
		verbose: "Сообщения",
		objects: "Объекты",
		test: "Проверка",
		module: "Модуль TERA-Guide",
		enabled: "Вкл.",
		disabled: "Выкл.",
		voicetest: "[Проверка скорости чтения сообщений]",
		colorchanged: "Цвет текста сообщений изменен",
		ratechanged: "Скорость речи изменена на",
		dgnotfound: "Данж с таким id не найден.",
		dgnotspecified: "Не указан id данжа.",
		enterdg: "Вы вошли в данж",
		fordungeon: "для данжа",
	},

};