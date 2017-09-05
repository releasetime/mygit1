
class Bullet extends Base{
	//属性
	constructor(){
		super();
	}
	
	
	//方法
	init(){
		this.ele = document.createElement('div');
		this.ele.className = "bullet";
		gameEngine.box.appendChild(this.ele);
		gameEngine.allBullets.push(this);
	
		this.ele.style.left = myPlane().ele.offsetLeft + myPlane().ele.offsetWidth/2 -2+ "px";
		this.ele.style.top = myPlane().ele.offsetTop - this.ele.offsetHeight +1+ "px"
		return this;	
	}
	
	move(){
		//let that = this;
		this.timer = setInterval(()=>{
			if(this.ele.offsetTop<-18){
				clearInterval(this.timer);
				gameEngine.box.removeChild(this.ele);
				
				let index = gameEngine.allBullets.indexOf(this);
				gameEngine.allBullets.splice(index,1);
				
				return;
			}
			this.ele.style.top = this.ele.offsetTop -6 + "px"
		},30)
		
		
	}
	
	//爆炸
	boom(){
		//停止移动
		clearInterval(this.timer);
		
		this.ele.className = "bullet-die";
		
		//动画
		//let that = this;
		const dieImgs = ["images2/die1.png", "images2/die2.png"];
		let i = 0;
		let dieTimer = setInterval(()=>{
			if (i >= 1){
				clearInterval(dieTimer);
				gameEngine.box.removeChild(this.ele);
			}
			else {
				this.ele.style.backgroundImage = `url(${dieImgs[++i]})`;
			}
		}, 200);
		
	}
	
	
}








