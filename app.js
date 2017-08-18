new Vue({
	 el: '#app',
	 data: {
	 	playerHealt: 100,
	 	monsterHealt: 100,
	 	gameIsRunning: false,
	 	turns: []
	 },
	 methods: {
	 	startGame: function(){
	 		this.gameIsRunning = true;
	 		this.monsterHealt = 100;
	 		this.playerHealt = 100;
	 		this.turns = [];
	 	},
	 	attack: function () {
	 		var damage = this.calculateDemage(3, 10)
	 		this.monsterHealt -= damage;
	 		this.turns.unshift({
	 			isPlayer: true,
	 			text: 'the player hits monster for ' + damage
	 		});
	 		if (this.checkWin()) { return }
	 		this.monsterAttacks();	
	 	},
	 	specialAttack: function() {
	 		var damage = this.calculateDemage(10, 20)
	 		this.monsterHealt -= damage;
	 		this.turns.unshift({
	 			isPlayer: true,
	 			text: 'the player hits monster hard for ' + damage
	 		});
	 		if (this.checkWin()) { return }

	 		this.monsterAttacks();	
	 	},
	 	heal: function() {
	 		if (this.playerHealt <= 90) {
	 			this.playerHealt += 10;	
	 		}else {
	 			this.playerHealt = 100;
	 		}
	 		this.turns.unshift({
	 			isPlayer: true,
	 			text: 'the player heal for 10'
	 		});
	 		this.monsterAttacks();
	 	},
	 	giveUp: function() {
	 	 this.gameIsRunning = false;	
	 	},

	 	monsterAttacks: function () {
	 		var damage = this.calculateDemage(5, 12) 
	 		this.playerHealt  -= damage;
	 		this.turns.unshift({
	 			isPlayer: false,
	 			text: 'the monster hits player for ' + damage
	 		});
	 		this.checkWin();
	 	},

	 	calculateDemage: function (min, max) {
	 		return Math.max(Math.floor(Math.random() * max ) + 1, min)
	 	},

	 	checkWin : function () {

			if (this.monsterHealt <= 0) {
				if (confirm('You won! New Game?')) {
					this.startGame();
				}else {
					this.gameIsRunning = false;
				}
				return true;
	 		}
	 		else if (this.playerHealt <= 0) {
				if (confirm('You lost! New Game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
	 		}
	 		 return false;
	 	}
	 }
});