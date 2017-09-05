
//创建我的飞机


let myPlane=(function(){
	let plane = {
		//属性
		ele:null,
		fireInterval : 300,//子弹发射时间
		//方法
		init:function(){
			this.ele = document.createElement("div");
			gameEngine.box.appendChild(this.ele);
			this.ele.className = "myplane";
			this.ele.style.left = (gameEngine.box.offsetWidth-this.ele.offsetWidth)/2 + "px";
			this.ele.style.top = gameEngine.box.offsetHeight-this.ele.offsetHeight + "px"
			return this;
		},
		//发射子弹
		fire:function(){
			this.timer = setInterval(()=>{
				//创建子弹对象
				let bullet = new Bullet();
				bullet.init().move();
			},this.fireInterval);
		},
		//拖拽
		move:function(){
			this.ele.onmousedown = function(e){
				e = e || event;
				let disx = e.offsetX;
				let disy = e.offsetY;		
				document.onmousemove = function(e){
					e = e || event;
					let x = e.pageX - disx - gameEngine.box.offsetLeft;
					if(x<0) x = 0;
					if(x>=gameEngine.box.offsetWidth - plane.ele.offsetWidth){
						x = gameEngine.box.offsetWidth - plane.ele.offsetWidth;
					}
					plane.ele.style.left = x + "px";
					plane.ele.style.top = e.pageY - disy + 'px'; 			
				}
				document.onmouseup = ()=>{
					document.onmousemove = document.onmouseup = null;
				}			
			}
		},
		
		//爆炸
		boom:function(callback){
			//停止发射子弹
			clearInterval(this.timer);
			
			//动画
			let dieImgs = ["images2/me_die1.png", "images2/me_die2.png", "images2/me_die3.png", "images2/me_die4.png"]
			let i = 0;
			let dieTimer = setInterval(()=>{
				
				if (i >= dieImgs.length) {
					clearInterval(dieTimer);
					gameEngine.box.removeChild(plane.ele);
					
					callback(); //回调
					
				}
				else {
					plane.ele.style.backgroundImage = "url("+ dieImgs[i++] +")";
				}
				
			}, 100);
		}
	};
	
	var instance;
	return function() {
		if (!instance) {
			instance = plane;			
		}
		return instance;
	}
	
})()
	
	
	
	
	
	
	
	
	
	




