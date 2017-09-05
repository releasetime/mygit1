

class Enemy extends Base{
	constructor(type){
		super();
		this.type = type;
		this.speed = 10;
		this.dieImg = [];
		this.score = 10;
		this.hp = 1;
	}
	
	
	init(){
		this.ele = document.createElement("div");
		gameEngine.box.appendChild(this.ele);
		
		gameEngine.allEnemys.push(this);
		console.log(gameEngine.allEnemys.length)
		switch(this.type){
			case this.Enemy_Type_Large:
			this.ele.className = "enemy-large";
			this.hp = this.EnemyHhp_Large;
			this.speed = this.Enemy_Speed_Large;
			this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"];
			this.score = 3000000; 
			console.log(this.speed)
			break;
			
			
			case this.Enemy_Type_Middle:
			this.ele.className = "enemy-middle";
			this.hp = this.Enemy_Hp_Middle;
			this.speed = this.Enemy_Speed_Middle;
			this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"];
			this.score = 2000000; 
			console.log(this.speed)
			break;
			
			case this.Enemy_Type_Small:
			this.ele.className = "enemy-small";
			this.hp = this.Enemy_Hp_Small;
			this.speed = this.Enemy_Speed_Small;
			this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"];
			this.score = 10000000; 
			console.log(this.speed)
			break;
		}
		this.ele.style.left = parseInt(Math.random()*(gameEngine.box.offsetWidth - this.ele.offsetWidth))+ "px";
		this.ele.style.top = -this.ele.offsetHeight + 'px';
		
		return this;
	}
	
	move(){
		//let that = this;
		this.timer = setInterval(()=>{
			if(this.ele.offsetTop>gameEngine.box.offsetHeight){
				clearInterval(this.timer);
				gameEngine.box.removeChild(this.ele);
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(this),1)
			}
			else{
				this.ele.style.top = this.ele.offsetTop + this.speed + 'px';
			}
			
		},30)
		
	}
	
	hurt(){
		this.hp--;
		if(this.hp==0){
			this.boom();
			gameEngine.totalScore += this.score;
		}
	}
	
	boom(){
		//停止移动
		clearInterval(this.timer);
		
		//动画
		//let that = this;
		let i =0;
		let dieTimer = setInterval(()=>{
			if(i>=this.dieImg.length){
				clearInterval(dieTimer);
				gameEngine.box.removeChild(this.ele);
				gameEngine.allEnemys.splice(gameEngine.allEnemys.indexOf(this),1)	
			}
			else{
				this.ele.style.backgroundImage = "url("+ this.dieImg(i++) +")"
			}
		},100);
		
		
		
	}
	
	
}
Enemy.prototype.Enemy_Type_Large = 3;
Enemy.prototype.Enemy_Type_Middle = 2;
Enemy.prototype.Enemy_Type_Small = 1;

Enemy.prototype.Enemy_Speed_Large = 2;
Enemy.prototype.Enemy_Speed_Middle = 4;
Enemy.prototype.Enemy_Speed_Small = 7;

Enemy.prototype.Enemy_Hp_Large = 8;
Enemy.prototype.Enemy_Hp_Middle = 3;
Enemy.prototype.Enemy_Hp_Small = 1;









