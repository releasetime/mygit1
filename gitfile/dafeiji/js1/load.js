"use strict";var gameEngine={box:null,allEnemys:[],allBullets:[],totalScore:0,init:function(){return this.box=document.getElementById("main"),this},start:function(){this.loadding(function(){myPlane().init().move(),myPlane().fire(),gameEngine.createEnemy(),gameEngine.crash(),gameEngine.moveBackground(),gameEngine.listenkeybord()})},loadding:function(e){var n=document.createElement("div");gameEngine.box.appendChild(n),n.className="logo";var a=document.createElement("div");gameEngine.box.appendChild(a),a.className="load";var t=["images2/loading1.png","images2/loading2.png","images2/loading3.png"],o=0,l=setInterval(function(){o>=5?(clearInterval(l),gameEngine.box.removeChild(n),gameEngine.box.removeChild(a),e&&e()):a.style.backgroundImage="url("+t[++o%3]+")"},500)},createEnemy:function(){setInterval(function(){Math.random()>.7&&new Enemy(Enemy.prototype.Enemy_Type_Large).init().move()},3e3),setInterval(function(){Math.random()>.6&&new Enemy(Enemy.prototype.Enemy_Type_Middle).init().move()},2e3),setInterval(function(){Math.random()>.5&&new Enemy(Enemy.prototype.Enemy_Type_Small).init().move()},1e3)},crash:function(){var e=setInterval(function(){for(var n=0;n<gameEngine.allEnemys.length;n++){for(var a=0;a<gameEngine.allBullets.length;a++)isCrash(gameEngine.allEnemys[n].ele,gameEngine.allBullets[a].ele)&&(gameEngine.allBullets[a].boom(),gameEngine.allBullets.splice(a,1),gameEngine.allEnemys[n].hurt());if(isCrash(gameEngine.allEnemys[n].ele,myPlane().ele)){clearInterval(e),myPlane().boom(function(){var e=prompt("请留下你的大名,你当前的分数是"+gameEngine.totalScore,"");ajax({type:"post",url:"http://60.205.181.47/myPHPCode4/uploadScore.php",data:{name:e,score:gameEngine.totalScore},success:function(e){console.log("提交成功: "+e),location.href="03_rand.html"}})});break}}},30)},moveBackground:function(){var e=0;setInterval(function(){gameEngine.box.style.backgroundPositionY=e+++"px"},30)},listenkeybord:function(){var e=0,n=0;window.onkeydown=function(a){37==(a=a||event).keyCode?e=-10:38==a.keyCode?n=-10:39==a.keyCode?e=10:40==a.keyCode&&(n=10)},window.onkeyup=function(a){37==(a=a||event).keyCode||39==a.keyCode?e=0:38!=a.keyCode&&40!=a.keyCode||(n=0)},setInterval(function(){var a=myPlane().ele.offsetLeft+e;a<0&&(a=0),a>gameEngine.box.offsetWidth-myPlane().ele.offsetWidth&&(a=gameEngine.box.offsetWidth-myPlane().ele.offsetWidth),myPlane().ele.style.left=a+"px",myPlane().ele.style.top=myPlane().ele.offsetTop+n+"px"},30)}};