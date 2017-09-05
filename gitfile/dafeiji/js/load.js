
//游戏引擎
//游戏加载
//创建我的飞机
//创建敌机
//控制碰撞检测
//监听键盘

let gameEngine = {
	box:null,//属性
	
	//总的敌机
	allEnemys:[],
	
	//总的子弹
	allBullets:[],
	
	totalScore: 0, //总分数
	
	init:function(){
		this.box = document.getElementById("main");
		return this;
	},
	//开始游戏
	start:function(){
		
		this.loadding(function(){
			myPlane().init().move();
			myPlane().fire();
			gameEngine.createEnemy();
			gameEngine.crash();
			gameEngine.moveBackground();
			gameEngine.listenkeybord();
		});
	},
	
	
	//加载游戏
	loadding:function(callback){
		//logo
		let logo = document.createElement("div");
		gameEngine.box.appendChild(logo);
		logo.className = 'logo';
		
		//load
		let load = document.createElement("div");
		gameEngine.box.appendChild(load);
		load.className = "load";
		
		//动画
		let img = ["images2/loading1.png", "images2/loading2.png", "images2/loading3.png"];
		let i = 0;
		let timer = setInterval(()=>{
			if(i>=5){
				clearInterval(timer);
				gameEngine.box.removeChild(logo);
				gameEngine.box.removeChild(load);
				if(callback) callback();
			}
			else{
				load.style.backgroundImage = "url(" + img[++i%3] + ")"
			}
		},500)
	},
	
	createEnemy:function(){
		setInterval(()=>{
			let flag = Math.random()>0.7 ? true : false;
			if(flag){
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}		
		},3000);
		setInterval(()=>{
			let flag = Math.random()>0.6 ? true : false;
			if(flag){
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				enemy.init().move();
			}		
		},2000);
		setInterval(()=>{
			let flag = Math.random()>0.5 ? true : false;
			if(flag){
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}		
		},1000);	
	},
	
	//碰撞检测
	crash(){
		let timer = setInterval(()=>{
			
			for(let i = 0; i<gameEngine.allEnemys.length;i++){//所有的敌机
				for(let j = 0; j<gameEngine.allBullets.length;j++){//所有的子弹
					if(isCrash(gameEngine.allEnemys[i].ele , gameEngine.allBullets[j].ele)){
						//子弹爆炸并消失
						gameEngine.allBullets[j].boom();
						gameEngine.allBullets.splice(j,1)
						
						//敌机受一点伤害
						gameEngine.allEnemys[i].hurt();
						
						
					}				
				}
				
				if(isCrash(gameEngine.allEnemys[i].ele,myPlane().ele)){
					clearInterval(timer);
					
					myPlane().boom(function(){
						let myName = prompt("请留下你的大名,你当前的分数是"+ gameEngine.totalScore,"");
						
						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name: myName, score: gameEngine.totalScore},
							
							success: function(data){
								console.log("提交成功: " + data);
								//进入排行榜
								location.href = "03_rand.html";
							}
						})
					});
					break;
				}
			}
			
		},30)
		
	},
	
	
	//移动背景图
	moveBackground(){
		let y = 0;
		setInterval(()=>{
			gameEngine.box.style.backgroundPositionY = y++ + "px";
		}, 30);
		
	},
	
	//监听键盘事件
	listenkeybord(){
		let xspeed = 0;
		let yspeed = 0;
		window.onkeydown = function(e){
			e = e || event;
			if(e.keyCode == 37){//左
				xspeed = -10;
			}
			else if(e.keyCode == 38){//上
				yspeed = -10;
			}
			else if(e.keyCode == 39){//右
				xspeed = 10;
			}
			else if(e.keyCode == 40){//下
				yspeed = 10;
			}
		};
		window.onkeyup = function(e){
			e = e || event;
			if(e.keyCode == 37 || e.keyCode == 39){//左右
				xspeed = 0;
			}
			else if(e.keyCode == 38 || e.keyCode == 40){//上下
				yspeed = 0;
			}
		};
		setInterval(()=>{
			let x = myPlane().ele.offsetLeft + xspeed;
			if (x < 0) x = 0;
			if (x > gameEngine.box.offsetWidth-myPlane().ele.offsetWidth) {
				x = gameEngine.box.offsetWidth-myPlane().ele.offsetWidth;
			}
			
			myPlane().ele.style.left = x + "px";
			myPlane().ele.style.top = myPlane().ele.offsetTop + yspeed + "px";
		}, 30);	
		
		
		
	}
	
	
	
	
	
}



