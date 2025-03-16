// =============================================================================
// ABMZ_RandomActors.js
// Version: 1.05
// -----------------------------------------------------------------------------
// Copyright (c) 2025 ヱビ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @plugindesc v1.05 ランダムにアクター名をセットするプラグイン
 * @target MZ
 * @author ヱビ
 * 
 * @help
 * ============================================================================
 * どんなプラグイン？
 * ============================================================================
 * 
 * ランダムのアクター名を名前用アクター名に入力して、
 * イベントにランダムのアクターのセリフをつけられるようにするプラグインです。
 * 
 * ============================================================================
 * 機能
 * ============================================================================
 * 
 * アクターのメモ：
 *   <RPTags:全員,勇気>
 * 
 * 勇気：勇気があるアクターという設定になるタグです。
 * 全員：タグがないときに引っかかるためにおすすめのタグです。
 * 
 * ○プラグインコマンド：
 * アクターの名前を2つセット
 *   指定した名前用アクター2つに、タグを持っているメンバーの中で指定した順番で
 *   2人の名前を入力します。
 *   並び順をランダムだけではなく、ATK、DEF、残りHPなどに設定できます。
 *   2つ変数に入れることも可能です。
 * 
 * Ver 1.00時点で、RPタグプラグインパラメータは空白不可になっています。
 * （作者の力不足により）
 * 全員に<RPTags:全員>というタグをつけて、
 * 指定タグがない場合、全員タグを入れるようにするのがおすすめです。
 * 
 * 使い方１）アクターのメモ欄に<RPTags:全員,勇気,理知>にして、
 * イベントでランダムに勇気のある活躍をする
 * 
 * 使い方２）全員の中でランダムにメンバーを選び、そのアクターが
 * イベントで回復/ダメージを受けるなど
 * 
 * ○プラグインコマンド：
 * タグの無効化、有効化
 * タグを持っているアクターでも、シリアスな場面ではセリフを言えないように
 * タグを無効化することができます。
 * 有効化すると元に戻ります。
 * 有効化してももともとタグを持っていない場合は、タグを持っていることに
 * なりません。
 * 
 * 
 * その他の機能については、プラグインコマンドを参照してください。
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.05
 *   プラグインパラメータのデフォルトに、actor.isBattleMember()を追加しました。
 * Version 1.04
 *   プラグインパラメータのデフォルトをactor.canMove()に変更しました。
 * Version 1.03
 *   プラグインパラメータのデフォルトが3（防御）だったのを10（ランダム）に
 *   変更しました。
 * Version 1.02
 *   ヘルプを一部変更しました。（全員タグなど）
 * Version 1.01
 *   NotRemoveActorEvalsのデフォルトの計算式を変更
 * 
 * Version 1.00
 *   公開
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・MITライセンスです。
 * ・クレジット表記は不要
 * ・営利目的で使用可
 * ・ソースコードのライセンス表示以外は改変可
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @command Actor1_2Set
 * @text アクターの名前を2つセット
 * @desc アクターの名前をタグアクターの名前にします。
 * 
 * @arg NameActorId
 * @text 名前用アクターID1
 * @desc このIDのアクターの名前を変更します。(1人目)
 * @type actor
 * @default 6
 * 
 * @arg NameActorId2
 * @text 名前用アクターID2
 * @desc このIDのアクターの名前を変更します。(2人目)（省略可）
 * @type actor
 * @default 7
 * 
 * @arg RPTags
 * @text RPタグ
 * @desc 条件に合致するRPタグです。（空白不可）
 * コンマで区切ると、どれかが当てはまる場合に条件に合致します。
 * @type text
 * @default 全員
 * 
 * @arg ParamXId
 * @text RPパラメータ
 * @desc 順番を決めるパラメータです。
 * @type select
 * @default 10
 * @option MHP
 * @value 0
 * @option MMP
 * @value 1
 * @option ATK
 * @value 2
 * @option DEF
 * @value 3
 * @option MAT
 * @value 4
 * @option MDF
 * @value 5
 * @option AGI
 * @value 6
 * @option LUK
 * @value 7
 * @option HP
 * @value 8
 * @option MP
 * @value 9
 * @option random
 * @value 10
 * @option index
 * @value 11
 * @option actorId
 * @value 12
 * 
 * 
 * 
 * @arg NotRemoveActorEvals
 * @text アクター判定
 * @desc この条件に合致しなかったアクターを除外します。
 * 例：actor.hp > 0 && actor.atk >= 10 && actor.isBattleMember()
 * @type string
 * @default actor.canMove()
 * 
 * 
 * @arg TargetActorVariableId
 * @text 変更する変数ID1
 * @desc この変数にアクター1のIDを代入します。
 * @type variable
 * @default 0
 * 
 * @arg TargetActorVariableId2
 * @text 変更する変数ID2
 * @desc この変数にアクター2のIDを代入します。
 * @type variable
 * @default 0
 * 
 * 
 * 
 * 
 * 
 * 
 * @command DisableRPTag
 * @text タグの無効化
 * @desc アクターの指定RPタグを無効化します。
 * 装備などにタグがついているときに使用してください。
 * 
 * @arg ActorIdList
 * @text タグを無効化するアクター
 * @desc このIDのアクターにタグを付与します。
 * コンマで区切って複数タグを指定できます。v[1]など変数も可能
 * @type string
 * @default 
 * 
 * @arg RPTag
 * @text 無効化するタグ
 * @desc このタグを無効化します。（デフォルト：勇気）
 * @type text
 * @default 勇気
 * 
 * 
 * 
 * 
 * @command ActivateRPTag
 * @text タグの有効化
 * @desc アクターの指定RPタグを有効化します。
 * アクターのタグを無効化解除するときに使用してください。
 * 
 * @arg ActorIdList
 * @text タグを有効化するアクター
 * @desc このIDのアクターにタグを付与します。
 * コンマで区切って複数タグを指定できます。v[1]など変数も可能
 * @type string
 * @default 
 * 
 * @arg RPTag
 * @text 有効化するタグ
 * @desc このタグを有効化します。（デフォルト：勇気）
 * @type text
 * @default 勇気
 * 
 * 
 * 
 * 
 * @command HasRPTag
 * @text アクターがRPタグを持っているか
 * @desc アクターが指定したRPタグを持っているかスイッチに格納します。
 * 
 * @arg ActorId
 * @text タグを調べるアクター
 * @desc このIDのアクターが持っているかを判定します。
 * @type string
 * @default 
 * 
 * @arg RPTag
 * @text タグ
 * @desc このタグを持っているかを確認します。（デフォルト：勇気）
 * @type text
 * @default 勇気
 * 
 * 
 * @arg HasTagSwitchId
 * @text 結果格納スイッチ
 * @desc アクターがタグを持っている場合、True、
 * タグを持っていなかった場合Falseをこのスイッチに格納します。
 * @type switch
 * @default 1
 * 
 * 
 */ 
 
(function() {
	var parameters = PluginManager.parameters('ABMZ_RandomActors');

//=============================================================================
// PluginManager
//=============================================================================


    const pluginName = "ABMZ_RandomActors";
	
    PluginManager.registerCommand(pluginName, "Actor1_2Set", args => {
		$gameParty.RPTagActorAndVariable(args);
    });
    PluginManager.registerCommand(pluginName, "RandomActorName", args => {
		args.ParamXId = 10;
		args.RPTags = "";
		$gameParty.RPTagActorAndVariable(args);
    });

    PluginManager.registerCommand(pluginName, "DisableRPTag", args => {
		$gameParty.disableRPTagActors(args);
    });
    PluginManager.registerCommand(pluginName, "ActivateRPTag", args => {
		$gameParty.activateRPTagActors(args);
    });
    PluginManager.registerCommand(pluginName, "HasRPTag", args => {
		let v = $gameVariables._data;
		let hasTag = $gameParty.isActorHasRPTags(args.ActorId, args.RPTag)
		$gameSwitches.setValue(args.HasTagSwitchId,hasTag);
    });
//=============================================================================
// パラメータの文字列を数値に変換
//=============================================================================

Game_Actor.prototype.paramNameToParamId = function (paramName) {
	switch (paramName) {
	case "mhp":
		return 0;
	case "mp":
		return 1;
	case "atk":
		return 2;
	case "def":
		return 3;
	case "mat":
		return 4;
	case "mdf":
		return 5;
	case "agi":
		return 6;
	case "luk":
		return 7;
	case "hp": 
		return 8;
	case "mmp":
		return 9;
	case "random":
		return 10;
	case "index":
		return 11;
	case "actorId":
		return 12;
	}
	return -1;
}

//=============================================================================
// RPタグを有効化するなど
//=============================================================================



Game_Actor.prototype.disableRPTag = function (RPTag) {
	if (!this._disableRPTags) {
		this._disableRPTags = [];
	}
	this._disableRPTags[this._disableRPTags.length]=RPTag;
};
Game_Actor.prototype.activateRPTag = function (RPTag) {
	if (!this._disableRPTags) {
		this._disableRPTags = [];
		return;
	}
	if (RPTag == "") return;
	for (let i = 0; i < this._disableRPTags.length; i++) {
		if (this._disableRPTags[i] == RPTag) {
			this._disableRPTags.splice(i, 1);
		}
	}
};

Game_Actor.prototype.hasDisableRPTag = function (RPTag) {
	if (!this._disableRPTags) {
		this._disableRPTags = [];
		return false;
	}
	if (RPTag == "") return false;
	for (let i = 0; i < this._disableRPTags.length; i++) {
		if (this._disableRPTags[i] == RPTag) {
			return true;
		}
	}
	return false;
};
Game_Actor.prototype.getDisableRPTag = function () {
	if (!this._disableRPTags) {
		this._disableRPTags = [];
		return [];
	}
	this._disableRPTags = this._disableRPTags.filter((tag) => {
		if (tag === undefined) return false;
		return true;
	});
	return this._disableRPTags;
};



//=============================================================================
// hasRPTags　アクターのメタタグ<RPTags:勇気>があるか
//=============================================================================

Game_Actor.prototype.hasRPTags = function(RPTagsArr) {
	if (RPTagsArr.length == 0 || RPTagsArr[0] == "") {
		return true;
	}
	
	let RPTagsArrA = this.getAllRPTags();
	for (let i = 0, l = RPTagsArr.length; i < l; i++) {
		for (let j = 0, jl = RPTagsArrA.length; j < jl; j++){
			if (RPTagsArrA[j] == RPTagsArr[i]) return true;
		}
	}
	return false;
};


Game_Actor.prototype.getAllRPTags = function() {
	let rpTags = [];
	rpTags = rpTags.concat(this.getRPTagActor());
	// ここで、無効化タグを除外している
	rpTags = $gameParty.reduceArr1ContainsArr2(rpTags, this.getDisableRPTag());
	return rpTags;
};


Game_Actor.prototype.getRPTagActor = function() {
	let rpTags = this.actor().meta.RPTags;
	if (rpTags == null) {
		return [];
	}
	let rpTagArr = rpTags.split(",");
	return rpTagArr;
};

// arr1：元の配列、arr2：判定する配列
// arr2が含まれていないアクターIDを削除する
Game_Party.prototype.ReducedArr1_NotContainsArr2 = function (arr1, arr2) {
	let arr = [];
	//
	if (arr1.length == 0) return [];
	if (!arr2) return arr1;
	for (let i = arr1.length-1; i >= 0; i--) {
		if (arr1[i] == null) {
			arr1.splice(i, 1);
			continue;
		}
		for (let j = 0; j < arr2.length; j ++ ) {
			if (arr1[i] == arr2[j]) {
				arr.push(arr1[i]);
			}
		}
	}
	return arr;
}

// arr1：元の配列、arr2：削除する配列
// arr2に含まれているアクターIDを削除する
Game_Party.prototype.reduceArr1ContainsArr2 = function (arr1, arr2) {

	if (!arr2) return arr1;
	for (let i = arr1.length-1; i >= 0; i--) {
		if (arr1[i] == null) {
			arr1.splice(i, 1);
			continue;
		}
		for (let j = 0; j < arr2.length; j ++ ) {
			if (arr1[i] == arr2[j]) {
				arr1.splice(i, 1);
			}
		}
	}
	return arr1;

}

//=============================================================================
// RP　PARAM　POWER
//===================

Game_Actor.prototype.RPParamPower = function(ParamXId) {

	if (ParamXId == 8) return this.hp;
	if (ParamXId == 9) return this.mp;
	if (ParamXId == 10) return this._random;
	if (ParamXId == 11) return 1000 - this.index();
	if (ParamXId == 12) return this.actorId();
	if (ParamXId == -1) return -99999;
	return this.param(ParamXId);

}

Game_Actor.prototype.setRandomNumber = function() {
	this._random = Math.random();
}


//=============================================================================
// 
//=============================================================================
// RPTagは空欄も可
Game_Party.prototype.sortByParamXPower = function (memberIds, ParamXId) {

	if (ParamXId == 10) {
		$gameParty.members().forEach (actor => {
			actor.setRandomNumber();
		});
	}
	memberIds = memberIds.sort((a, b) => {
		return $gameActors.actor(b).RPParamPower(ParamXId) 
			- $gameActors.actor(a).RPParamPower(ParamXId);
	});
	return memberIds;
};
Game_Party.prototype.isActorHasRPTags = function (actorIdVal, RPTagsStr) {
	let v = $gameVariables._data;
	let actorId = Number(eval(actorIdVal));
	if (actorId == 0) return false;
	let actor = $gameActors.actor(actorId);
	if (!actor) return false;
	actor.hasRPTags(String(RPTagsStr).split(","));
};

Game_Party.prototype.getRPTagMemberIds = function (RPTagsArr) {
	if (RPTagsArr.length <= 0 || RPTagsArr[0] == "") {
		return this.allMembers().map((member) => {
			return member.actorId();
		});
	};
	let members = this.allMembers().filter((member) =>{ 
		return member.hasRPTags(RPTagsArr);
	});
	let memberIds = members.map((member) =>{
		return member.actorId(); 
	});
	
	return memberIds;
};

Game_Party.prototype.stringToActorIds = function(actorEvalStrings) {
	if ( !actorEvalStrings || actorEvalStrings == "") {
		return [];
	}
	let v = $gameVariables._data;
	let arr = eval("[" + actorEvalStrings + "]");
	return arr;
	
};

Game_Party.prototype.disableRPTagActors = function (args) {
	let RPTag = args.RPTag;
	let actorIdList = args.ActorIdList;
	let actorIdArr = this.stringToActorIds(actorIdList);
	for (let i = 0; i < actorIdArr.length; i++) {
		actor = $gameActors.actor(actorIdArr[i]);
		if (!actor) break;
		actor.disableRPTag(RPTag);
	}
};
Game_Party.prototype.activateRPTagActors = function (args) {
	let RPTag = args.RPTag;
	let actorIdList = args.ActorIdList;
	let actorIdArr = this.stringToActorIds(actorIdList);
	for (let i = 0; i < actorIdArr.length; i++) {
		actor = $gameActors.actor(actorIdArr[i]);
		if (!actor) break;
		actor.activateRPTag(RPTag);
	}
};
Game_Actor.prototype.isActorEvalTrue = function (evalString) {
	let v = $gameVariables._data;
	let actor = this;
	if (evalString == "") return false;
	return eval(evalString);
};
//
// 名前アクター１、２、にRPタグ
Game_Party.prototype.RPTagActorAndVariable = function (args) {
	let v = $gameVariables._data;
	// プラグイン引数
	let NameActorId = Number(args.NameActorId); //セットする名前アクターID
	let NameActorId2 = Number(args.NameActorId2); //セットする名前アクターID2
	let RPTags = String(args.RPTags); // ◎RPタグ
	let NotRemoveActorEvals = args.NotRemoveActorEvals;
	let ParamXId = args.ParamXId;
	let TargetActorVariableId = args.TargetActorVariableId;
	let TargetActorVariableId2 = args.TargetActorVariableId2;


	let memberIds;
	if (RPTags == "") {
		memberIds = this.allMembers();
	} else {
		// アクターEvalsがFalseの時除外する
		let RPTagsArr = RPTags.split(",");
		memberIds = this.getRPTagMemberIds(RPTagsArr);
	}
	memberIds = memberIds.filter((id) => {
		let actor = $gameActors.actor(id);
		if (!actor) return false;
		if (NotRemoveActorEvals == "") return true;
		if (actor.isActorEvalTrue(NotRemoveActorEvals)) return true;
		return false;
	});

 	// 指定した順番に並べ替え
	memberIds = this.sortByParamXPower(memberIds, ParamXId);

 	// 名前アクター１、名前アクター２に、アクター１、アクター２を代入する
	let actor1; let actor2; let nameActor; let nameActor2;
	actor1 = $gameActors.actor(memberIds[0]);
	actor2 = $gameActors.actor(memberIds[1]);
	nameActor = $gameActors.actor(NameActorId);
	nameActor2 = $gameActors.actor(NameActorId2);
	// アクター１がなかった場合、アクター名に空欄、変数に0をセットする
	if (actor1 == null) {
		
		if (nameActor) {
			nameActor.setName("");
		}
		
		if (nameActor2) {
			nameActor2.setName("");
		}
		if (TargetActorVariableId) {
			$gameVariables.setValue(TargetActorVariableId, 0);
		}
		if (TargetActorVariableId2) {
			$gameVariables.setValue(TargetActorVariableId2, 0);
		}
		// 関数を抜ける
		return;
	}
	// 名前用アクターがあった場合、アクター１の名前をセットする
	if (nameActor) {
		nameActor.setName(actor1.name());
	}
	// 変数１があった場合、アクター１のアクターIDをセットする
	if (TargetActorVariableId) {
		$gameVariables.setValue(TargetActorVariableId, 0);
	}
	// アクター２がなかった場合、アクター名２に空欄、変数２に0をセットする
	if (actor2 == null) {
		if (nameActor2) {
			nameActor2.setName("");
		}
		if (TargetActorVariableId2) {
			$gameVariables.setValue(TargetActorVariableId2, 0);
		}
		// 関数を抜ける
		return;
	}
	
	// 名前用アクター２があった場合、アクター２の名前をセットする
	if (nameActor2) {
		nameActor2.setName(actor2.name());
	}
	// 変数２があった場合、アクター２のアクターIDをセットする
	if (TargetActorVariableId2) {
		$gameVariables.setValue(TargetActorVariableId2, actor2.actorId());
	}
}


})();
