/* Scene-specific art pass. Loaded after script.js so the canvas renderer can be
   tuned without touching the gameplay state machine. */
const fredBaseArchitecture=drawSceneArchitecture;
const fredBaseObject=drawObject;

drawSceneArchitecture=function(s){
  if(s!==2)return fredBaseArchitecture(s);
  ctx.save();
  ctx.fillStyle='#25241f';ctx.fillRect(35,105,890,325);
  // Back wall and a faded shop header.
  ctx.fillStyle='#34332c';ctx.fillRect(35,105,890,34);
  ctx.fillStyle='#4e4432';ctx.fillRect(372,120,210,22);
  ctx.fillStyle='#8a7650';ctx.fillRect(387,125,178,3);
  // Left wall of shelves: bottles, tins and empty gaps sell the abandoned shop.
  ctx.fillStyle='#151715';ctx.fillRect(58,145,310,270);
  for(let row=0;row<3;row++){
    const y=188+row*68;
    ctx.fillStyle='#1c1d19';ctx.fillRect(76,y,250,8);
    for(let x=96;x<315;x+=48){
      ctx.fillStyle=row===1?'#4d5a55':'#726044';
      ctx.fillRect(x,y-28,26,28);
      ctx.fillStyle='#a79161';ctx.fillRect(x+4,y-24,18,3);
    }
  }
  // A recognisable grocer's counter: broad wooden top, front planks and a
  // small register make this read as a shop rather than a memorial display.
  ctx.fillStyle='#2b2119';ctx.fillRect(382,310,214,105);
  ctx.fillStyle='#8d6138';ctx.fillRect(370,300,238,16);ctx.fillStyle='#c09255';ctx.fillRect(375,303,228,4);
  ctx.fillStyle='#513722';ctx.fillRect(391,322,196,84);
  ctx.fillStyle='#6f4b2b';for(let x=398;x<585;x+=31){ctx.fillRect(x,326,4,77);ctx.fillStyle='#3a291c';ctx.fillRect(x+6,350,20,2);ctx.fillStyle='#6f4b2b'}
  ctx.fillStyle='#d2af65';ctx.fillRect(396,333,45,12);ctx.fillStyle='#43301f';ctx.font='bold 7px Courier New';ctx.fillText('GROCER',400,342);
  // Cash register, receipt roll and a tiny price display sit on the counter.
  ctx.fillStyle='#1a1d1b';ctx.fillRect(530,270,48,34);ctx.fillStyle='#4a5248';ctx.fillRect(536,275,36,11);ctx.fillStyle='#a7a276';ctx.fillRect(540,278,17,4);ctx.fillStyle='#766044';for(let k=0;k<4;k++)ctx.fillRect(537+k*8,291,5,4);ctx.fillStyle='#d4c59b';ctx.fillRect(552,264,10,8);ctx.fillStyle='#33271c';ctx.fillRect(525,303,58,5);
  // Right display wall where the cracked mirror hangs.
  ctx.fillStyle='#151715';ctx.fillRect(595,145,295,270);
  ctx.fillStyle='#5e4e38';ctx.fillRect(660,185,152,8);
  ctx.fillStyle='#33382f';for(let x=677;x<800;x+=34)ctx.fillRect(x,215,18,45);
  ctx.restore();
};

drawWoodDoor=function(x){
  ctx.save();ctx.translate(x,0);
  // A surviving doorway is cut into the right-hand ruin. The broken wall
  // continues above the lintel so the door reads as part of the building.
  ctx.fillStyle='#343630';ctx.fillRect(-78,142,156,288);
  ctx.fillStyle='#4a453b';ctx.fillRect(-72,150,144,12);
  ctx.fillStyle='#252824';ctx.fillRect(-78,128,53,18);ctx.fillRect(19,120,59,26);
  ctx.fillStyle='#5a5143';ctx.fillRect(-69,166,18,80);ctx.fillRect(51,160,18,86);
  ctx.fillStyle='#292b27';ctx.fillRect(-47,238,94,192);
  ctx.fillStyle='#604936';ctx.fillRect(-34,274,68,156);
  ctx.fillStyle='#74573d';for(let y=282;y<426;y+=23)ctx.fillRect(-31,y,62,3);
  ctx.strokeStyle='#36291f';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-28,288);ctx.lineTo(28,340);ctx.moveTo(28,288);ctx.lineTo(-28,340);ctx.stroke();
  ctx.fillStyle='#9b754d';ctx.fillRect(18,363,7,5);ctx.fillStyle='#1d1915';ctx.fillRect(-43,261,86,10);
  // A few irregular bricks break the silhouette into the surrounding ruin.
  ctx.fillStyle='#62584a';ctx.fillRect(-76,190,22,12);ctx.fillRect(54,208,23,10);ctx.fillRect(-78,224,17,9);ctx.fillRect(61,245,17,13);
  ctx.restore();
};

drawStreetSmoke=function(){
  // Restore the clean ruin image after the old rgba(29,31,29,.08) wash;
  // smoke and street lights are then composited on top as intended.
  const streetArt=art.ruinsDoor&&art.ruinsDoor.complete&&art.ruinsDoor.naturalWidth?art.ruinsDoor:art.ruins;
  if(game.scene===1&&streetArt.complete&&streetArt.naturalWidth){ctx.globalCompositeOperation='source-over';ctx.drawImage(streetArt,0,0,1672,941,0,0,960,540)}
  // Low foreground masonry adds the heavy, close-to-camera rubble seen in
  // the reference streets without hiding the original evacuation sign.
  if(game.scene===1){
    ctx.save();ctx.globalAlpha=.82;
    ctx.fillStyle='#252825';ctx.fillRect(0,421,960,9);
    for(let i=0;i<26;i++){
      const x=(i*71)%980-12,h=6+(i*13)%17,w=12+(i*9)%28;
      ctx.fillStyle=i%3===0?'#4e5147':i%3===1?'#353a35':'#202522';
      ctx.fillRect(x,421-h,w,h);
      if(i%5===0){ctx.fillStyle='#776b53';ctx.fillRect(x+3,421-h-3,Math.max(4,w-8),3)}
    }
    ctx.strokeStyle='#6d624e';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(90,416);ctx.lineTo(76,355);ctx.lineTo(113,330);ctx.moveTo(865,420);ctx.lineTo(878,368);ctx.lineTo(856,345);ctx.stroke();ctx.restore();
  }
  const t=Date.now()/1000;ctx.save();ctx.globalCompositeOperation='multiply';
  for(let i=0;i<16;i++){
    const rise=i*28,drift=Math.sin(t*.48+i*.67)*22+Math.sin(t*.19+i)*8;
    const y=360-rise+Math.sin(t*.72+i*.8)*4,rx=19+i*3.5,ry=17+i*1.8;
    ctx.fillStyle=`rgba(30,35,33,${.045+i*.0035})`;
    ctx.beginPath();ctx.ellipse(510+drift,y,rx,ry,Math.sin(t*.3+i)*.12,0,7);ctx.fill();
  }
  ctx.globalCompositeOperation='source-over';ctx.restore();
};

function drawMirrorReflection(kind){
  // The glass is a narrow, damaged vertical panel. The elder is drawn from
  // the same old-Fred model used in the ending, while the child reflection
  // reuses the playable pixel sheet for a precise visual echo.
  const shopMirror=game.scene===2&&art.grocery&&art.grocery.complete&&art.grocery.naturalWidth;
  ctx.save();ctx.beginPath();ctx.rect(shopMirror?-43:-36,shopMirror?154:224,shopMirror?86:72,shopMirror?252:100);ctx.clip();
  const tremor=Math.sin(Date.now()/185)*.7;
  if(kind===1){
    ctx.globalAlpha=.86;ctx.filter='grayscale(.55) sepia(.38) contrast(1.18)';ctx.translate(tremor,0);ctx.translate(0,shopMirror?376:300);ctx.scale(shopMirror?-.88:-.56,shopMirror?.88:.56);drawElderFred(0,0,'stand');
    ctx.filter='none';
    // A warmer edge light separates the older silhouette from the dark glass.
    ctx.globalAlpha=.16;ctx.fillStyle='#d6c39a';ctx.fillRect(shopMirror?-25:-18,shopMirror?166:232,3,shopMirror?190:61);
  }else if(art.fred.complete&&art.fred.naturalWidth){
    const frame={x:65,y:262,w:198,h:445},h=shopMirror?162:94,w=frame.w/frame.h*h;
    ctx.globalAlpha=.62;ctx.filter='grayscale(.85) contrast(1.08)';ctx.translate(tremor,2);ctx.scale(-1,1);ctx.drawImage(art.fred,frame.x,frame.y,frame.w,frame.h,-w/2,shopMirror?238:228,w,h);ctx.filter='none';
  }
  // Broken glass catches both reflections instead of floating over the frame.
  ctx.globalAlpha=kind===1?.2:.14;ctx.fillStyle='#d8cfb0';for(let y=shopMirror?168:238;y<(shopMirror?398:319);y+=17)ctx.fillRect(shopMirror?-38:-31,y,shopMirror?76:62,1);
  ctx.restore();
}

function drawClinicPaper(x,index){
  const p=clinicPaperSpots[index];if(!p)return;
  if(game.clinicPapers&&game.clinicPapers[index])return;
  ctx.save();ctx.translate(x,p.y);ctx.rotate(p.r);
  // Small, dusty torn slips: visible only on a closer look, not as bright UI cards.
  ctx.globalAlpha=.56;
  ctx.fillStyle='rgba(0,0,0,.42)';ctx.fillRect(-p.w/2+2,-p.h/2+3,p.w,p.h);
  ctx.fillStyle=index===1?'#867f69':'#928a72';ctx.beginPath();ctx.moveTo(-p.w/2,-p.h/2+2);ctx.lineTo(p.w/2-2,-p.h/2);ctx.lineTo(p.w/2,p.h/2-3);ctx.lineTo(p.w*.12,p.h/2);ctx.lineTo(-p.w/2+2,p.h/2-2);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(50,48,40,.62)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(64,61,50,.45)';ctx.fillRect(-p.w*.28,-p.h*.15,p.w*.44,1);ctx.fillRect(-p.w*.22,p.h*.11,p.w*.54,1);
  ctx.fillStyle='rgba(190,177,142,.24)';ctx.fillRect(p.w*.16,-p.h*.37,3,3);ctx.fillRect(-p.w*.35,p.h*.22,2,2);
  ctx.strokeStyle='rgba(207,190,151,.22)';ctx.beginPath();ctx.moveTo(p.w*.1,-p.h*.46);ctx.lineTo(p.w*.28,p.h*.28);ctx.stroke();
  ctx.restore();
}

drawObject=function(x,t){
  if(game.scene===2&&t==='bread'){
    ctx.save();ctx.translate(x,0);
    // A shallow wicker basket keeps the loaf clearly separate from the
    // register and counter front, with bright crust highlights and scores.
    ctx.fillStyle='rgba(9,10,8,.45)';ctx.beginPath();ctx.ellipse(0,318,43,7,0,0,7);ctx.fill();
    ctx.fillStyle='#6f4b2d';ctx.fillRect(-39,299,78,16);ctx.fillStyle='#9b7043';ctx.fillRect(-35,303,70,13);
    ctx.strokeStyle='#4a321f';ctx.lineWidth=2;for(let bx=-27;bx<=27;bx+=13){ctx.beginPath();ctx.moveTo(bx,301);ctx.lineTo(bx+4,315);ctx.stroke()}
    if(!(game.event&1)){
      ctx.fillStyle='#80501f';ctx.beginPath();ctx.ellipse(-1,293,31,15,0,0,7);ctx.fill();
      ctx.fillStyle='#c47b2e';ctx.beginPath();ctx.ellipse(-1,289,29,14,0,0,7);ctx.fill();
      ctx.fillStyle='#e0a44a';ctx.beginPath();ctx.ellipse(-5,285,20,8,-.12,0,7);ctx.fill();
      ctx.strokeStyle='#704019';ctx.lineWidth=3;for(let sx=-14;sx<=12;sx+=13){ctx.beginPath();ctx.moveTo(sx,282);ctx.lineTo(sx+6,292);ctx.stroke()}
      ctx.fillStyle='#e5c17a';ctx.fillRect(31,282,18,12);ctx.fillStyle='#443022';ctx.font='bold 7px Courier New';ctx.fillText('1',37,291);
    }else{
      ctx.fillStyle='#d5aa5a';ctx.fillRect(-12,303,4,3);ctx.fillRect(4,306,3,2);ctx.fillRect(18,302,3,3);
    }
    ctx.restore();return;
  }
  if(game.scene===3&&(t==='clinicPaperA'||t==='clinicPaperB'||t==='clinicPaperC')){
    drawClinicPaper(x,t==='clinicPaperA'?0:t==='clinicPaperB'?1:2);return;
  }
  if(game.scene===3&&(t==='bed'||t==='clinicTable'||t==='list'||t==='lamp')){
    // The painted clinic already contains the bed frames and bedside table.
    // Keep only the interactive paper and lamp effects as foreground layers.
    if(art.clinic&&art.clinic.complete&&art.clinic.naturalWidth&&(t==='bed'||t==='clinicTable'))return;
    ctx.save();ctx.translate(x,0);
    if(t==='bed'){
      ctx.fillStyle='#2a302f';ctx.fillRect(-66,356,132,15);ctx.fillStyle='#8c8b7a';ctx.fillRect(-59,337,118,25);ctx.fillStyle='#bbb7a0';ctx.fillRect(-54,331,108,17);
      if(game.clinicBedIndent!==0){ctx.fillStyle='#777867';ctx.beginPath();ctx.ellipse(4,339,29,7,-.08,0,7);ctx.fill()}
      ctx.fillStyle='#4d554f';ctx.fillRect(-59,362,7,68);ctx.fillRect(52,362,7,68);ctx.fillStyle='#7b7868';ctx.fillRect(-68,428,22,5);ctx.fillRect(46,428,22,5);
    }else if(t==='clinicTable'){
      ctx.fillStyle='#302d27';ctx.fillRect(-42,350,84,9);ctx.fillRect(-35,359,7,70);ctx.fillRect(28,359,7,70);ctx.fillStyle='#5f5542';ctx.fillRect(-38,343,76,9);ctx.fillStyle='#171916';ctx.fillRect(12,327,16,15);ctx.fillStyle='#a8a18a';ctx.fillRect(-25,329,30,8);
    }else if(t==='list'){
      // A creased chart lies naturally on the bedside table, rather than
      // reading as a bright rectangular UI marker.
      ctx.rotate(-.07);ctx.fillStyle='rgba(0,0,0,.36)';ctx.fillRect(-19,314,39,27);
      ctx.fillStyle='#a49a80';ctx.beginPath();ctx.moveTo(-22,310);ctx.lineTo(18,312);ctx.lineTo(22,337);ctx.lineTo(5,340);ctx.lineTo(-21,336);ctx.closePath();ctx.fill();
      ctx.strokeStyle='#5b5748';ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='#676354';for(let y=317;y<335;y+=5)ctx.fillRect(-14,y,26+(y%2)*3,1);
      ctx.fillStyle='rgba(213,198,160,.42)';ctx.fillRect(9,313,5,20);ctx.fillStyle='rgba(70,66,55,.35)';ctx.fillRect(-12,320,17,1);
    }else if(t==='lamp'){
      const light=clinicLampLevel();ctx.strokeStyle='#3b403c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,65);ctx.lineTo(0,144);ctx.stroke();ctx.fillStyle='#353732';ctx.fillRect(-6,141,12,20);ctx.fillStyle=light>.05?`rgba(255,239,193,${.35+light*.65})`:'#3e4039';ctx.beginPath();ctx.moveTo(-19,161);ctx.lineTo(19,161);ctx.lineTo(11,178);ctx.lineTo(-11,178);ctx.closePath();ctx.fill();
    }
    ctx.restore();return;
  }
  if(t!=='mirror')return fredBaseObject(x,t);
  if(game.scene===2&&art.grocery&&art.grocery.complete&&art.grocery.naturalWidth){
    // The painted shop background supplies the tall frame; only the living
    // reflection and a faint glass glint are layered over it during use.
    ctx.save();ctx.translate(x,0);
    if(game.mirrorState===1)drawMirrorReflection(1);else if(game.mirrorState===2)drawMirrorReflection(2);
    if(game.mirrorState>0){ctx.strokeStyle='#d7c89c44';ctx.lineWidth=2;ctx.strokeRect(-44,154,88,252)}
    ctx.restore();return;
  }
  ctx.save();ctx.translate(x,0);ctx.fillStyle='#25231e';ctx.fillRect(-48,212,96,126);ctx.strokeStyle='#8a7654';ctx.lineWidth=5;ctx.strokeRect(-43,218,86,112);ctx.strokeStyle='#b3a177';ctx.lineWidth=2;ctx.strokeRect(-37,224,74,100);
  if(game.mirrorState===1)drawMirrorReflection(1);else if(game.mirrorState===2)drawMirrorReflection(2);
  if(game.mirrorState>0){ctx.strokeStyle='#bdb18c88';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-18,238);ctx.lineTo(5,273);ctx.lineTo(-3,301);ctx.moveTo(19,246);ctx.lineTo(-7,283);ctx.stroke()}
  ctx.restore();
};

// Mirror interaction: Fred turns first, the elder appears for a brief,
// readable beat, then the glass settles back to the child's reflection.
mirrorSequence=function(){
  if(game.mirrorBusy)return;
  game.mirrorBusy=true;game.locked=true;game.mirrorTurn=0;game.mirrorStartDir=game.dir||1;game.mirrorState=0;
  const turn=setInterval(()=>{
    game.mirrorTurn=Math.min(1,game.mirrorTurn+.12);
    if(game.mirrorTurn>=1){
      clearInterval(turn);game.mirrorState=1;game.flash=3;
      setTimeout(()=>{
        game.mirrorState=2;
        setTimeout(()=>{
          // End the reveal exactly where Fred began. Clear any held movement
          // key so the interaction cannot spill into an automatic walk.
          game.mirrorState=0;game.mirrorBusy=false;game.mirrorTurn=0;
          game.reactionMove=false;game.reactionPose='idle';game.reactionFx='';
          game.keys={};
          say('Fred','Was that real, or was it only another illusion?',()=>{
            game.keys={};
            game.locked=false;
          });
        },2500);
      },650);
    }
  },30);
};

function drawElderFred(x,y,mode='stand'){
  const seated=mode==='seated';
  ctx.save();ctx.translate(Math.round(x),Math.round(y));
  if(seated){const restSway=Math.sin(Date.now()/720)*.018;ctx.translate(0,Math.sin(Date.now()/1200)*.7);ctx.rotate(-.11+restSway)}
  const hair='#d0c8ad',hairHi='#e3dbc0',skin='#bda888',skinHi='#d0bb96',coat='#3d4842',coatHi='#596157',scarf='#806a53',scarfHi='#a28a66',trouser='#2c3431',shoe='#252925',sole='#171b19',metal='#8a795c';
  if(!seated){
    // Head, hair and the small details that make the same character read as
    // Fred decades later: swept white hair, glasses and a lined cheek.
    ctx.fillStyle=skin;ctx.fillRect(-14,-91,27,25);ctx.fillRect(-18,-79,5,9);
    ctx.fillStyle=hair;ctx.fillRect(-17,-98,31,10);ctx.fillRect(-21,-92,9,15);ctx.fillRect(8,-94,10,12);ctx.fillStyle=hairHi;ctx.fillRect(-11,-101,14,4);ctx.fillRect(5,-98,10,3);
    ctx.fillStyle='#4a4a40';ctx.fillRect(-13,-79,10,2);ctx.fillRect(1,-79,10,2);ctx.fillRect(-2,-79,4,2);ctx.fillStyle='#6c5949';ctx.fillRect(7,-72,5,2);ctx.fillRect(-2,-69,7,2);
    // Neck, scarf and long weathered coat.
    ctx.fillStyle=skinHi;ctx.fillRect(-7,-67,13,8);ctx.fillStyle=scarf;ctx.fillRect(-20,-64,36,13);ctx.fillStyle=scarfHi;ctx.fillRect(-13,-61,26,3);ctx.fillStyle=coat;ctx.fillRect(-23,-53,46,54);ctx.fillStyle=coatHi;ctx.fillRect(-18,-48,7,43);ctx.fillRect(11,-46,6,41);ctx.fillStyle='#2d3632';ctx.fillRect(-2,-50,4,48);ctx.fillStyle='#9b8965';for(let yy=-38;yy<0;yy+=12)ctx.fillRect(-2,yy,4,3);
    // Arms hang at slightly different heights, giving the old model weight.
    ctx.fillStyle=coat;ctx.fillRect(-30,-48,9,38);ctx.fillRect(21,-46,9,42);ctx.fillStyle=coatHi;ctx.fillRect(-31,-33,5,14);ctx.fillRect(26,-28,5,15);ctx.fillStyle=skin;ctx.fillRect(-30,-12,10,8);ctx.fillRect(22,-8,10,8);
    // Trousers, shoes and a slim cane.
    ctx.fillStyle=trouser;ctx.fillRect(-16,1,14,37);ctx.fillRect(3,1,14,37);ctx.fillStyle=shoe;ctx.fillRect(-19,35,20,9);ctx.fillRect(1,35,21,9);ctx.fillStyle=sole;ctx.fillRect(-20,43,22,3);ctx.fillRect(0,43,24,3);ctx.fillStyle=metal;ctx.fillRect(28,-2,3,48);ctx.strokeStyle=metal;ctx.lineWidth=3;ctx.beginPath();ctx.arc(29,-5,6,Math.PI,0);ctx.stroke();
  }else{
    // Reclined rocking-chair pose: Fred's head rests against the back, his
    // coat runs across the cushion, and his bent legs extend toward the foot
    // runner. The extra overlap makes the pose read as lying down, not sitting
    // on an invisible ladder.
    ctx.fillStyle=skin;ctx.fillRect(-31,-65,26,22);ctx.fillRect(-7,-57,7,8);
    ctx.fillStyle=hair;ctx.fillRect(-34,-73,31,10);ctx.fillRect(-37,-68,9,13);ctx.fillRect(-8,-70,10,11);ctx.fillStyle=hairHi;ctx.fillRect(-28,-76,16,4);
    ctx.fillStyle='#4a4a40';ctx.fillRect(-27,-51,9,2);ctx.fillRect(-15,-51,9,2);ctx.fillRect(-17,-52,3,2);ctx.fillStyle='#6c5949';ctx.fillRect(-9,-45,6,2);
    ctx.fillStyle=skinHi;ctx.fillRect(-5,-48,12,7);ctx.fillStyle=scarf;ctx.fillRect(-9,-43,31,11);ctx.fillStyle=scarfHi;ctx.fillRect(-3,-40,23,3);
    ctx.fillStyle=coat;ctx.beginPath();ctx.moveTo(7,-37);ctx.lineTo(43,-27);ctx.lineTo(35,1);ctx.lineTo(-11,-14);ctx.lineTo(-7,-31);ctx.closePath();ctx.fill();
    ctx.fillStyle=coatHi;ctx.fillRect(4,-30,7,27);ctx.fillRect(28,-22,6,22);ctx.fillStyle='#2d3632';ctx.fillRect(18,-31,4,30);ctx.fillStyle='#9b8965';ctx.fillRect(17,-21,5,3);ctx.fillRect(14,-8,5,3);
    ctx.fillStyle=coat;ctx.fillRect(2,-30,9,25);ctx.fillRect(32,-20,9,20);ctx.fillStyle=skin;ctx.fillRect(-2,-8,10,7);ctx.fillRect(38,-3,10,7);
    // One knee is raised while the other leg rests along the rocker.
    ctx.fillStyle=trouser;ctx.beginPath();ctx.moveTo(5,-10);ctx.lineTo(24,-4);ctx.lineTo(17,16);ctx.lineTo(-2,10);ctx.closePath();ctx.fill();ctx.fillRect(18,5,27,12);
    ctx.fillStyle=shoe;ctx.fillRect(-5,9,24,9);ctx.fillRect(42,13,22,9);ctx.fillStyle=sole;ctx.fillRect(-7,17,27,3);ctx.fillRect(41,21,25,3);
  }
  ctx.restore();
}

function drawRockingChair(x,y){
  ctx.save();ctx.translate(x,y);const sway=Math.sin(Date.now()/720)*.018;ctx.rotate(sway);ctx.lineJoin='round';
  // A grounded shadow helps the chair read as furniture instead of a floating ladder.
  ctx.fillStyle='rgba(0,0,0,.32)';ctx.beginPath();ctx.ellipse(0,40,58,6,0,0,7);ctx.fill();
  // Solid, slightly worn back panel with a visible wooden frame.
  ctx.fillStyle='#2b211c';ctx.beginPath();ctx.moveTo(-35,-108);ctx.lineTo(35,-108);ctx.lineTo(39,-12);ctx.lineTo(-38,-12);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#6f5439';ctx.lineWidth=5;ctx.stroke();
  ctx.fillStyle='#523b2a';ctx.fillRect(-27,-93,54,70);
  ctx.fillStyle='#795b3b';ctx.fillRect(-23,-87,4,57);ctx.fillRect(19,-87,4,57);
  // Armrests and short supports make the silhouette unmistakably chair-like.
  ctx.strokeStyle='#76583b';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-39,-30);ctx.lineTo(-52,-21);ctx.lineTo(-30,-14);ctx.moveTo(39,-30);ctx.lineTo(52,-21);ctx.lineTo(30,-14);ctx.stroke();
  // Padded seat.
  ctx.fillStyle='#33251d';ctx.beginPath();ctx.moveTo(-34,-13);ctx.lineTo(32,-13);ctx.lineTo(38,3);ctx.lineTo(-28,5);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#9a7650';ctx.lineWidth=3;ctx.stroke();
  // Angled front legs and curved rockers anchor the end-state animation.
  ctx.strokeStyle='#503927';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-26,1);ctx.lineTo(-34,35);ctx.moveTo(27,1);ctx.lineTo(34,35);ctx.stroke();
  ctx.strokeStyle='#30231c';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-50,31);ctx.quadraticCurveTo(0,51,50,31);ctx.stroke();
  ctx.strokeStyle='#8a6745';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-48,30);ctx.quadraticCurveTo(0,46,48,30);ctx.stroke();ctx.restore();
}
function drawElderRockerModel(x,baseline){
  if(!art.elderRocker.complete||!art.elderRocker.naturalWidth)return false;
  const h=214,w=h*(art.elderRocker.naturalWidth/art.elderRocker.naturalHeight);
  const t=Date.now()/1250,breath=Math.sin(t)*.65,rock=Math.sin(t)*.006;
  ctx.save();ctx.imageSmoothingEnabled=false;ctx.globalAlpha=.98;
  // Pivot at the rocker base: a small, slow arc reads as breathing and
  // rocking, while keeping the feet grounded on the same floor line.
  ctx.translate(x,baseline+breath);ctx.rotate(rock);
  ctx.drawImage(art.elderRocker,Math.round(-w/2),Math.round(-h),Math.round(w),h);
  ctx.restore();return true;
}

const fredBaseRoom=drawRoom;
drawRoom=function(){
  if(art.finalRoom.complete&&art.finalRoom.naturalWidth){
    ctx.drawImage(art.finalRoom,0,0,art.finalRoom.naturalWidth,art.finalRoom.naturalHeight,0,0,960,540);
    // A barely perceptible window-light pulse keeps the quiet ending alive.
    const pulse=.035+Math.sin(Date.now()/1450)*.012;
    ctx.fillStyle=`rgba(216,187,128,${pulse})`;ctx.fillRect(245,70,365,300);
    const vignette=ctx.createRadialGradient(480,290,130,480,290,620);vignette.addColorStop(0,'rgba(8,9,10,0)');vignette.addColorStop(1,'rgba(8,9,10,.34)');ctx.fillStyle=vignette;ctx.fillRect(0,0,960,540);
  }else if(art.square.complete&&art.square.naturalWidth){
    ctx.drawImage(art.square,0,0,1672,940,0,0,960,540);
    ctx.fillStyle='rgba(12,16,18,.16)';ctx.fillRect(0,0,960,540);
  }else{
    ctx.fillStyle='#b9ac92';ctx.fillRect(120,80,300,220);ctx.fillStyle='#7c766b';ctx.fillRect(130,90,280,200);ctx.fillStyle='#ddd1b6';ctx.fillRect(140,100,260,180);
    ctx.fillStyle='#554d40';ctx.fillRect(620,345,110,85);ctx.fillStyle='#34322e';ctx.fillRect(710,330,70,100);
    ctx.fillStyle='#725f42';ctx.fillRect(520,375,80,10);ctx.fillRect(530,385,8,45);ctx.fillStyle='#292823';ctx.fillRect(542,340,45,32);ctx.fillStyle='#68816d';ctx.fillRect(830,160,55,34);ctx.fillStyle='#d3c49d33';ctx.fillRect(120,300,420,130);
  }
  // The final memory places elderly Fred beside the window, with a restrained
  // breathing/rocking sway that avoids the rigid cut-out look.
  const sway=Math.sin(Date.now()/1250)*.7;
  if(!drawElderRockerModel(480+sway,430)){drawRockingChair(480+sway,382);drawElderFred(480+sway,382,'seated')}
};

const fredBaseClinicArchitecture=drawSceneArchitecture;
drawSceneArchitecture=function(s){
  if(s!==3)return fredBaseClinicArchitecture(s);
  const lit=clinicLampLevel();
  ctx.save();
  ctx.fillStyle='#0b1011';ctx.fillRect(0,76,960,354);
  ctx.fillStyle='#1a2020';ctx.fillRect(24,102,912,328);
  // Minimal loading fallback only. Keep the room readable while the painted
  // clinic image loads, without the repeated rectangular color blocks that
  // previously flashed across the beds and floor.
  ctx.fillStyle='rgba(41,45,43,.18)';ctx.fillRect(24,350,912,80);
  // The scene starts almost unlit; the lamp state adds an unstable warm-white pool.
  if(lit>0){ctx.save();ctx.globalCompositeOperation='screen';const glow=ctx.createRadialGradient(460,165,4,460,165,300);glow.addColorStop(0,`rgba(245,232,187,${lit*.26})`);glow.addColorStop(1,'rgba(245,232,187,0)');ctx.fillStyle=glow;ctx.fillRect(130,-20,660,430);ctx.fillStyle=`rgba(247,234,194,${lit*.72})`;ctx.fillRect(448,150,24,10);ctx.restore()}
  ctx.restore();
};

let clinicStateScene=-1;
setInterval(()=>{
  if(game.scene!==3){clinicStateScene=-1;return}
  if(clinicStateScene!==3){clinicStateScene=3;game.clinicLight=0;game.clinicBedIndent=1}
  if(game.event===1&&game.clinicLight!==1){game.clinicLight=1;setTimeout(()=>{game.clinicBedIndent=0},680)}
},80);

// Opening beat: Fred approaches the radio through the clear aisle on its
// right. This keeps his feet out of the sofa-side table and its chairs.
setInterval(()=>{
  if(!game.introWalk)return;
  const now=Date.now();if(now-lastFootstepAt>230){footstepTone();lastFootstepAt=now}
  const radioApproachX=450;
  game.x=Math.max(radioApproachX,game.x-2.7);game.dir=-1;
  if(game.x<=radioApproachX){game.introWalk=false;setTimeout(()=>say('Fred','The radio still has power.',()=>startPuzzle()),260)}
},30);

setInterval(()=>{
  if(!game.reactionMove)return;
  const target=game.reactionMoveTarget||220;
  game.dir=game.x>target?-1:1;
  game.x+=game.x>target?-4.2:4.2;
  if(Math.abs(game.x-target)<5){game.x=target;game.reactionMove=false}
},30);

// Keep the crouch pose on a short eased track so entering and leaving cover
// never snaps between the standing and crouched silhouettes.
setInterval(()=>{
  if(!game.started)return;
  const target=game.reactionPose==='crouch'?1:0;
  game.crouchBlend=(game.crouchBlend||0)+(target-(game.crouchBlend||0))*.18;
  if(Math.abs(target-game.crouchBlend)<.008)game.crouchBlend=target;
},30);

// A locked dialogue, puzzle or cutscene always renders Fred on the same idle
// frame, even if the player taps a movement key during the pause.
const fredBasePerson=drawPixelPerson;
function drawCrouchPerson(x,y,old=false){
  if(old||!art.fred.complete||!art.fred.naturalWidth){fredBasePerson(x,y,old);return}
  const p=Math.max(0,Math.min(1,game.crouchBlend||0)),ease=p*p*(3-2*p);
  const stand={x:65,y:262,w:198,h:445},crouch={x:1014,y:385,w:230,h:322};
  ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(game.dir||1,1);
  // Use one silhouette at a time. The eased scale keeps the boots planted,
  // while avoiding a translucent duplicate Fred during the hand-off.
  if(ease<.52){const settle=ease/.52,standH=112-30*settle,standW=stand.w/stand.h*standH;ctx.drawImage(art.fred,stand.x,stand.y,stand.w,stand.h,-standW/2,-standH,standW,standH)}
  else{const settle=(ease-.52)/.48,crouchH=72+4*settle,crouchW=66+3*settle;ctx.drawImage(art.fred,crouch.x,crouch.y,crouch.w,crouch.h,-crouchW/2,-crouchH,crouchW,crouchH)}
  ctx.restore();
}
function drawMirrorTurnPerson(x,y,old=false){
  if(old||!art.fred.complete||!art.fred.naturalWidth){fredBasePerson(x,y,old);return}
  const p=Math.max(0,Math.min(1,game.mirrorTurn||0)),frame={x:65,y:262,w:198,h:445},h=112,w=frame.w/frame.h*h;
  const facing=p<.5?(game.mirrorStartDir||game.dir||1):1;
  ctx.save();ctx.translate(Math.round(x-34*p),Math.round(y));ctx.scale(facing,1);ctx.rotate((1-p)*.045);ctx.scale(.78+.22*p,1);
  ctx.drawImage(art.fred,frame.x,frame.y,frame.w,frame.h,-w/2,-h,w,h);ctx.restore();
}
drawPixelPerson=function(x,y,old=false){
  if(old){drawElderFred(x,y,game.scene===7?'seated':'stand');return}
  if(!old&&game.scene===2&&game.mirrorBusy){drawMirrorTurnPerson(x,y,old);return}
  if(!old&&game.scene===0&&(game.reactionPose==='crouch'||(game.crouchBlend||0)>.01)){drawCrouchPerson(x,y,old);return}
  if(!old&&game.locked&&!game.introWalk&&!game.reactionMove){
    const held={left:game.keys.ArrowLeft,right:game.keys.ArrowRight,a:game.keys.a,d:game.keys.d};
    game.keys.ArrowLeft=false;game.keys.ArrowRight=false;game.keys.a=false;game.keys.d=false;
    fredBasePerson(x,y,old);
    game.keys.ArrowLeft=held.left;game.keys.ArrowRight=held.right;game.keys.a=held.a;game.keys.d=held.d;
    return;
  }
  if(!old&&(game.reactionPose==='run'||game.introWalk||game.reactionMove)){
    const held={left:game.keys.ArrowLeft,right:game.keys.ArrowRight};game.keys.ArrowLeft=game.reactionMove&&game.dir<0;game.keys.ArrowRight=!game.reactionMove||game.dir>0;fredBasePerson(x,y,old);game.keys.ArrowLeft=held.left;game.keys.ArrowRight=held.right;
  }else fredBasePerson(x,y,old);
};

function drawReactionFX(){
  if(!game.started||game.scene!==0||!game.reactionFx)return;
  ctx.save();
  if(game.reactionFx==='dark'){
    const edge=ctx.createRadialGradient(480,270,80,480,270,540);edge.addColorStop(0,'rgba(0,0,0,0)');edge.addColorStop(1,'rgba(0,0,0,.68)');ctx.fillStyle=edge;ctx.fillRect(0,0,960,540);
    ctx.fillStyle=`rgba(185,44,36,${.35+Math.sin(Date.now()/170)*.16})`;ctx.fillRect(505,374,5,5);
  }else if(game.reactionFx==='static'){
    // Keep the muffled, airless feeling without drawing scanlines across the
    // room; those lines read as an unrelated UI artifact during the crouch.
    ctx.fillStyle='rgba(4,5,5,.22)';ctx.fillRect(0,0,960,540);
  }
  if(game.reactionPose==='crouch'){
    // The crouch silhouette is drawn from the character sheet; only add a
    // small settling puff so the knees feel connected to the dusty floor.
    const p=Math.max(0,Math.min(1,game.crouchBlend||0)),alpha=.16*p;
    ctx.fillStyle=`rgba(177,158,119,${alpha})`;ctx.beginPath();ctx.ellipse(game.x-16,426,12+7*p,3,0,0,7);ctx.ellipse(game.x+14,426,10+6*p,2.5,0,0,7);ctx.fill();
  }else if(game.reactionPose==='cover'){
    ctx.fillStyle='#80765f';ctx.fillRect(game.x-12,374,7,20);ctx.fillRect(game.x+5,374,7,20);ctx.fillStyle='#111311';ctx.fillRect(game.x-16,390,32,22);
  }
  ctx.restore();
}
function reactionFxLoop(){drawReactionFX();requestAnimationFrame(reactionFxLoop)}
requestAnimationFrame(reactionFxLoop);

const fredSchoolBaseArchitecture=drawSceneArchitecture;
drawSceneArchitecture=function(s){
  if(s!==4)return fredSchoolBaseArchitecture(s);
  ctx.save();
  ctx.fillStyle='#111819';ctx.fillRect(0,78,960,352);
  ctx.fillStyle='#202827';ctx.fillRect(24,102,912,328);
  // Tall windows, a blank blackboard and rows of abandoned desks.
  ctx.fillStyle='#0b1111';ctx.fillRect(70,124,210,130);ctx.fillRect(306,124,160,130);
  ctx.strokeStyle='#6b6656';ctx.lineWidth=4;ctx.strokeRect(70,124,210,130);ctx.strokeRect(306,124,160,130);
  ctx.fillStyle='#253331';ctx.fillRect(72,126,206,126);ctx.fillStyle='#303c3b';ctx.fillRect(308,126,156,126);
  ctx.fillStyle='#111614';ctx.fillRect(560,110,300,178);ctx.strokeStyle='#5b5544';ctx.lineWidth=5;ctx.strokeRect(560,110,300,178);
  drawBlackboardWriting();
  ctx.fillStyle='#2d312c';for(let y=330;y<425;y+=45)for(let x=70;x<850;x+=170){ctx.fillRect(x,y,110,8);ctx.fillRect(x+12,y+8,7,34)}
  for(let i=0;i<schoolPhotoSpots.length;i++)drawSchoolPhotoFragment(i);
  // A partly recovered photograph is already waiting on the desk. Each
  // loose fragment reveals one more missing panel of this same picture.
  drawSchoolAssembledPhoto();
  ctx.restore();
};

function drawSchoolPhotoFragment(index){
  const p=schoolPhotoSpots[index];if(!p||game.photoComplete||game.photoPieces&&game.photoPieces[index])return;
  // Each scrap sits like an old photograph caught among exercise papers and
  // desk dust, rather than reading as a bright collectible card.
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.globalAlpha=.62;
  ctx.fillStyle='rgba(0,0,0,.4)';ctx.fillRect(-p.w/2+2,-p.h/2+3,p.w,p.h);
  ctx.fillStyle=index%2?'#817b68':'#8f896f';ctx.beginPath();ctx.moveTo(-p.w/2,-p.h/2+2);ctx.lineTo(p.w/2-2,-p.h/2);ctx.lineTo(p.w/2,p.h/2-2);ctx.lineTo(-p.w*.12,p.h/2);ctx.lineTo(-p.w/2+1,p.h*.2);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(48,48,41,.66)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle=index%3?'rgba(91,103,95,.62)':'rgba(113,113,92,.58)';ctx.fillRect(-p.w*.32,-p.h*.25,p.w*.6,p.h*.5);
  ctx.fillStyle='rgba(203,191,151,.4)';ctx.fillRect(-p.w*.13,-p.h*.18,3,5);ctx.fillRect(p.w*.08,-p.h*.13,3,6);ctx.fillStyle='rgba(52,55,48,.45)';ctx.fillRect(-p.w*.27,p.h*.2,p.w*.5,1);
  ctx.restore();
}
function drawSchoolAssembledPhoto(){
  // The six scraps become a faded family snapshot: a meadow, wildflowers,
  // tent and children playing, translated into the game's muted pixel palette.
  // The recovered print lies flat on the front desk, like the existing paper:
  // landscape proportions, a small cast shadow, and a slight paper rotation.
  // The front-left desk in the painted classroom sits around this canvas
  // position.  Keep the recovered print compact so it rests on the desk
  // instead of floating between desks or covering the character lane.
  if(game.photoComplete&&!game.photoLiftAt)game.photoLiftAt=performance.now();
  const lift=Math.max(0,Math.min(1,game.photoComplete?(performance.now()-game.photoLiftAt)/780:0)),ease=lift*lift*(3-2*lift);
  const px=172+(480-172)*ease,py=334+(266-334)*ease,rotation=-.06*(1-ease),scale=.78+(.36*ease);
  ctx.save();ctx.translate(px,py);ctx.rotate(rotation);ctx.scale(scale,scale);
  ctx.fillStyle='rgba(0,0,0,.42)';ctx.fillRect(-55,-31,110,66);
  ctx.fillStyle='#171a18';ctx.fillRect(-54,-34,108,66);ctx.strokeStyle='#9f916e';ctx.lineWidth=3;ctx.strokeRect(-51,-31,102,60);
  // Crop every recovered pixel to the paper area.  The old child silhouette
  // and flower pixels could extend past the border and read as a broken UI
  // frame rather than a photograph lying on the desk.
  ctx.save();ctx.beginPath();ctx.rect(-47,-27,94,54);ctx.clip();
  ctx.fillStyle='#aeb3a4';ctx.fillRect(-47,-27,94,54);ctx.fillStyle='#c7c4a5';ctx.fillRect(-47,-1,94,28);ctx.fillStyle='#87906f';ctx.fillRect(-47,9,94,18);
  // cloud bands and a pale sun
  ctx.fillStyle='#d8d2b5';ctx.fillRect(-37,-19,29,3);ctx.fillRect(-27,-23,35,3);ctx.fillStyle='#c3b98f';ctx.fillRect(29,-20,8,7);
  // small tent at the edge of the field
  ctx.fillStyle='#735f4d';ctx.beginPath();ctx.moveTo(-43,20);ctx.lineTo(-25,-8);ctx.lineTo(-8,20);ctx.closePath();ctx.fill();ctx.fillStyle='#433d36';ctx.fillRect(-28,11,6,9);ctx.fillStyle='#b0966d';ctx.fillRect(-42,21,37,3);
  // distant adult, facing away
  ctx.fillStyle='#3f4540';ctx.fillRect(9,-9,11,11);ctx.fillStyle='#53554a';ctx.fillRect(6,3,19,22);ctx.fillStyle='#6d6855';ctx.fillRect(7,24,7,7);ctx.fillRect(18,24,7,7);ctx.fillStyle='#2f342f';ctx.fillRect(5,-13,20,4);
  // Fred in the foreground, caught mid-step
  ctx.fillStyle='#5b5141';ctx.fillRect(-10,2,12,11);ctx.fillStyle='#59645b';ctx.fillRect(-14,13,21,22);ctx.fillStyle='#6f8d91';ctx.fillRect(-13,34,8,10);ctx.fillRect(-2,34,8,10);ctx.fillStyle='#9a805d';ctx.fillRect(-15,44,11,3);ctx.fillRect(0,44,12,3);ctx.fillStyle='#353d36';ctx.fillRect(-12,-2,16,5);
  // Two children reaching toward him, echoing the reference photograph.
  ctx.fillStyle='#c0ad88';ctx.fillRect(30,3,11,11);ctx.fillStyle='#b4a58b';ctx.fillRect(27,14,17,20);ctx.fillStyle='#b49557';ctx.fillRect(28,15,15,5);ctx.fillStyle='#303731';ctx.fillRect(29,34,6,12);ctx.fillRect(39,34,6,12);
  ctx.fillStyle='#46453d';ctx.fillRect(38,-11,8,11);ctx.fillStyle='#686758';ctx.fillRect(35,0,15,18);ctx.fillStyle='#77765f';ctx.fillRect(35,18,6,15);ctx.fillRect(45,18,6,15);
  // flower pixels and grass blades unify the snapshot with the scene palette
  ctx.fillStyle='#b09368';for(let x=-42;x<48;x+=12){ctx.fillRect(x,24+(x%3)*2,2,7);ctx.fillRect(x+4,21+(x%4),2,4)}
  ctx.fillStyle='#d4bd8a';ctx.fillRect(-37,20,3,3);ctx.fillRect(23,23,3,3);ctx.fillRect(40,18,3,3);
  ctx.fillStyle='#c7b17e';ctx.fillRect(-41,27,82,2);
  // The middle strip was already on the desk. The six clicked scraps fill
  // the surrounding panels, so the memory becomes visibly clearer one piece
  // at a time instead of appearing all at once at the end.
  const fixedPanels=new Set([1,4,7]);
  const fragmentPanels=[0,2,3,5,6,8],found=game.photoPieces||[];
  for(let panel=0;panel<9;panel++){
    const fragment=fragmentPanels.indexOf(panel);
    if(fixedPanels.has(panel)||(fragment>=0&&found[fragment]))continue;
    const col=panel%3,row=Math.floor(panel/3),px=-47+col*(94/3),py=-27+row*(54/3),pw=94/3,ph=54/3;
    ctx.fillStyle='#282b27';ctx.fillRect(px+1,py+1,pw-2,ph-2);
    ctx.fillStyle='#4e4d40';ctx.fillRect(px+2,py+3,pw-4,2);ctx.fillRect(px+4,py+ph-5,pw-8,1);
    ctx.strokeStyle='#171917';ctx.lineWidth=1;ctx.strokeRect(px+.5,py+.5,pw-1,ph-1);
  }
  ctx.restore();
  // Reassert the worn print border above the clipped picture contents.
  ctx.strokeStyle='#9f916e';ctx.lineWidth=3;ctx.strokeRect(-51,-31,102,60);
  ctx.restore();
}
function drawBlackboardWriting(){
  // Keep every word inside the painted classroom blackboard, as worn chalk.
  const x=714,answer=game.blackboardAnswer===null?'':questions[8][1][game.blackboardAnswer];
  ctx.save();ctx.fillStyle='rgba(218,213,184,.66)';ctx.font='bold 10px Courier New';ctx.fillText('AFTER THE WAR ENDS,',x,104);ctx.fillText('PEOPLE WILL…',x+13,121);
  ctx.fillStyle='rgba(211,205,176,.18)';ctx.fillRect(x+8,133,155,1);ctx.fillRect(x+26,151,109,1);
  if(answer){ctx.fillStyle='rgba(230,222,190,.78)';ctx.font='bold 9px Courier New';ctx.fillText('— '+answer,x,157);ctx.strokeStyle='rgba(217,208,177,.4)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,165);ctx.lineTo(914,165);ctx.stroke()}
  ctx.restore();
}

const fredSchoolBaseObject=drawObject;
drawObject=function(x,t){
  if(game.scene===4&&art.school&&art.school.complete&&art.school.naturalWidth&&(t==='desk'||t==='board'))return;
  if(game.scene===4&&t==='photo'){
    ctx.save();ctx.translate(x,0);ctx.rotate(-.08);
    ctx.fillStyle='#373a32';ctx.fillRect(-24,320,48,45);ctx.strokeStyle='#a99c78';ctx.lineWidth=2;ctx.strokeRect(-24,320,48,45);
    ctx.fillStyle='#788176';ctx.fillRect(-19,325,38,31);ctx.fillStyle='#d2c29b';ctx.fillRect(-13,333,7,11);ctx.fillRect(-3,329,5,15);ctx.fillRect(5,335,10,4);ctx.fillStyle='#3a413c';ctx.fillRect(-18,350,36,3);
    ctx.restore();return;
  }
  fredSchoolBaseObject(x,t);
};

/* -------------------------------------------------------------------------
   War-ruin detail pass
   The reference photos are used as shape language only: broken masonry,
   surviving arches, improvised timber and piles of salvage. These details
   stay deliberately pixel-sized so the hand-painted backgrounds and Fred's
   sprite still belong to the same world.
-------------------------------------------------------------------------- */
function drawBrickCourse(x,y,w,count,light='#4d5048',dark='#252a27'){
  const bw=w/count;
  ctx.fillStyle=dark;ctx.fillRect(x,y,w,7);
  ctx.fillStyle=light;
  for(let i=0;i<count;i++){
    const inset=(i%3===0?1:0);ctx.fillRect(x+i*bw+inset,y+1,bw-3,4);
  }
}
function drawRubbleBand(y,seed=0){
  ctx.save();
  ctx.fillStyle='#171b1a';ctx.fillRect(0,y,960,430-y);
  for(let i=0;i<48;i++){
    const x=(i*83+seed*31)%980-10,h=5+(i*17)%19,w=7+(i*11)%24;
    ctx.fillStyle=i%3===0?'#5b574b':i%3===1?'#3d4039':'#292d29';
    ctx.fillRect(x,y-h,w,h);
    if(i%4===0){ctx.fillStyle='#73674f';ctx.fillRect(x+2,y-h-4,Math.max(3,w-7),3)}
  }
  ctx.restore();
}
function drawBrokenWindow(x,y,w,h){
  ctx.save();ctx.fillStyle='#101516';ctx.fillRect(x,y,w,h);
  ctx.strokeStyle='#706b5b';ctx.lineWidth=4;ctx.strokeRect(x,y,w,h);
  ctx.strokeStyle='#303735';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+w*.48,y);ctx.lineTo(x+w*.48,y+h);ctx.moveTo(x,y+h*.56);ctx.lineTo(x+w,y+h*.56);ctx.stroke();
  ctx.strokeStyle='#b2aa8c88';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+w*.56,y+4);ctx.lineTo(x+w*.35,y+h*.44);ctx.lineTo(x+w*.7,y+h*.9);ctx.moveTo(x+w*.1,y+h*.2);ctx.lineTo(x+w*.38,y+h*.54);ctx.stroke();
  ctx.restore();
}
function drawHomeWarDetails(){
  ctx.save();
  ctx.fillStyle='#342b22';ctx.fillRect(0,116,960,314);
  ctx.fillStyle='#6a5943';ctx.fillRect(0,132,960,5);
  // A half-collapsed apartment wall and the window Fred can inspect.
  drawBrickCourse(12,168,260,7,'#665744','#3e352b');
  drawBrickCourse(12,205,260,7,'#5b4e3e','#332c24');
  drawBrokenWindow(708,176,126,126);
  ctx.fillStyle='#6e5941';ctx.fillRect(692,307,16,123);ctx.fillRect(842,307,18,123);
  ctx.strokeStyle='#1c1916';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(704,130);ctx.lineTo(657,284);ctx.moveTo(856,124);ctx.lineTo(891,280);ctx.stroke();
  ctx.strokeStyle='#7b694e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(445,123);ctx.lineTo(414,238);ctx.lineTo(466,323);ctx.moveTo(530,120);ctx.lineTo(548,220);ctx.lineTo(517,322);ctx.stroke();
  drawRubbleBand(409,4);
  ctx.restore();
}
function drawShelterWarDetails(){
  ctx.save();
  ctx.fillStyle='#101719';ctx.fillRect(0,80,960,350);
  // Repeating basement arches suggest a church crypt / civilian shelter.
  ctx.fillStyle='#26302e';ctx.fillRect(28,104,904,326);
  for(let x=44;x<920;x+=146){
    ctx.fillStyle='#3d4741';ctx.fillRect(x,116,17,314);ctx.fillRect(x+112,116,17,314);
    ctx.fillStyle='#1a211f';ctx.beginPath();ctx.arc(x+64,196,48,Math.PI,0);ctx.fill();ctx.fillRect(x+16,196,96,234);
    ctx.strokeStyle='#666452';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x+64,196,47,Math.PI,0);ctx.stroke();
  }
  // Improvised supports and damp pipes.
  ctx.strokeStyle='#735b43';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(112,92);ctx.lineTo(170,430);ctx.moveTo(802,92);ctx.lineTo(746,430);ctx.stroke();
  ctx.strokeStyle='#59645c';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(242,80);ctx.lineTo(242,188);ctx.lineTo(310,188);ctx.lineTo(310,430);ctx.moveTo(684,80);ctx.lineTo(684,142);ctx.lineTo(620,142);ctx.lineTo(620,430);ctx.stroke();
  ctx.fillStyle='#9a8060';ctx.fillRect(233,186,18,5);ctx.fillRect(301,186,18,5);ctx.fillRect(675,140,18,5);
  drawBrickCourse(32,112,886,18,'#4d544b','#242b28');
  drawRubbleBand(412,11);
  // A narrow shaft of cold light gives the tunnel a believable source.
  const g=ctx.createLinearGradient(480,75,480,275);g.addColorStop(0,'rgba(197,205,183,.16)');g.addColorStop(1,'rgba(197,205,183,0)');ctx.fillStyle=g;ctx.fillRect(448,75,64,210);
  ctx.restore();
}
function drawSquareWarDetails(){
  ctx.save();
  ctx.fillStyle='#151b1b';ctx.fillRect(0,80,960,350);
  // Side façades frame a damaged civic tower, echoing the Warsaw skyline.
  ctx.fillStyle='#303735';ctx.fillRect(0,155,250,275);ctx.fillRect(710,144,250,286);
  for(let row=0;row<3;row++)for(let col=0;col<3;col++){
    drawBrokenWindow(28+col*72,190+row*67,45,39);
    drawBrokenWindow(738+col*72,178+row*68,45,39);
  }
  ctx.fillStyle='#4a4a40';ctx.fillRect(364,96,232,334);
  ctx.fillStyle='#656151';ctx.beginPath();ctx.moveTo(350,96);ctx.lineTo(480,22);ctx.lineTo(610,96);ctx.closePath();ctx.fill();
  ctx.fillStyle='#262c29';ctx.beginPath();ctx.moveTo(392,94);ctx.lineTo(480,45);ctx.lineTo(568,94);ctx.closePath();ctx.fill();
  // Clock tower with a missing face segment and a bent finial.
  ctx.fillStyle='#1b2321';ctx.fillRect(425,102,110,123);ctx.beginPath();ctx.arc(480,153,56,0,7);ctx.fill();
  ctx.strokeStyle='#9b8968';ctx.lineWidth=4;ctx.beginPath();ctx.arc(480,153,47,0,7);ctx.stroke();
  ctx.strokeStyle='#514b3e';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(480,153);ctx.lineTo(480,119);ctx.moveTo(480,153);ctx.lineTo(511,174);ctx.stroke();
  ctx.strokeStyle='#8c7a5d';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(480,95);ctx.lineTo(473,74);ctx.lineTo(487,60);ctx.stroke();
  drawBrickCourse(375,235,210,6,'#5f5d4e','#363a35');
  ctx.fillStyle='#212522';ctx.fillRect(392,280,176,150);drawBrokenWindow(412,293,52,61);drawBrokenWindow(496,293,52,61);
  ctx.strokeStyle='#6f6551';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(362,264);ctx.lineTo(344,420);ctx.moveTo(598,262);ctx.lineTo(618,420);ctx.stroke();
  // A fallen civic sign and broken paving keep the gate from reading as a UI panel.
  ctx.fillStyle='#4d594b';ctx.save();ctx.translate(775,316);ctx.rotate(-.08);ctx.fillRect(-72,-13,144,27);ctx.fillStyle='#b7ad8a';ctx.font='bold 10px Courier New';ctx.fillText('EVACUATION',-50,4);ctx.restore();
  drawRubbleBand(412,23);
  ctx.restore();
}
const fredWarArchitectureBase=drawSceneArchitecture;
drawSceneArchitecture=function(s){
  fredWarArchitectureBase(s);
  if(s===0)drawHomeWarDetails();
  else if(s===5)drawShelterWarDetails();
  else if(s===6)drawSquareWarDetails();
};

function drawWarObjectDetails(x,t){
  ctx.save();ctx.translate(x,0);
  if(t==='radio'){
    ctx.strokeStyle='#8a7654';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(26,350);ctx.lineTo(41,327);ctx.lineTo(54,331);ctx.stroke();
    ctx.fillStyle='#b54a36';ctx.globalAlpha=.55+Math.sin(Date.now()/260)*.25;ctx.fillRect(19,386,4,4);ctx.globalAlpha=1;
    ctx.fillStyle='#6b604d';ctx.fillRect(-42,399,86,5);ctx.fillStyle='#252721';ctx.fillRect(-35,404,9,4);ctx.fillRect(24,404,9,4);
  }else if(t==='bed'){
    ctx.fillStyle='#4c514a';ctx.fillRect(-58,354,116,4);ctx.fillStyle='#9f8967';ctx.fillRect(-62,430,9,5);ctx.fillRect(52,430,9,5);
    ctx.strokeStyle='#51483b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-38,339);ctx.lineTo(-23,350);ctx.moveTo(24,335);ctx.lineTo(42,348);ctx.stroke();
  }else if(t==='bread'){
    ctx.fillStyle='#3e3328';ctx.fillRect(-24,409,48,4);ctx.fillStyle='#b09a6b';ctx.fillRect(-14,411,4,3);ctx.fillRect(8,412,3,2);
  }else if(t==='shelf'){
    ctx.fillStyle='#766344';ctx.fillRect(-59,286,5,135);ctx.fillRect(54,286,5,135);ctx.fillStyle='#302c25';ctx.fillRect(-57,420,114,5);
  }else if(t==='board'){
    ctx.strokeStyle='#7a6b52';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-67,264);ctx.lineTo(-52,260);ctx.moveTo(50,326);ctx.lineTo(63,331);ctx.stroke();
    ctx.fillStyle='#a9a383';ctx.fillRect(-38,346,76,3);
  }else if(t==='luggage'){
    ctx.strokeStyle='#867354';ctx.lineWidth=2;ctx.strokeRect(-29,389,58,43);ctx.fillStyle='#555046';ctx.fillRect(-6,383,12,7);ctx.fillStyle='#9a875f';ctx.fillRect(-23,397,7,3);
  }else if(t==='clock'){
    ctx.fillStyle='#565447';ctx.fillRect(-27,227,7,203);ctx.fillRect(20,227,7,203);ctx.strokeStyle='#9a8968';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-23,230);ctx.lineTo(-31,252);ctx.moveTo(23,230);ctx.lineTo(31,249);ctx.stroke();
  }else if(t==='tunnel'){
    ctx.strokeStyle='#5f5b4c';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,395,62,Math.PI,0);ctx.stroke();ctx.fillStyle='#77694f';ctx.fillRect(-74,426,148,5);
  }
  ctx.restore();
}
const fredWarObjectBase=drawObject;
drawObject=function(x,t){fredWarObjectBase(x,t);drawWarObjectDetails(x,t)};

// The generated opening backdrop already contains the child table, damaged
// radio and broken windows. Do not paint the old placeholder primitives on
// top of them once the high-detail interior has loaded.
const fredHomeObjectBase=drawObject;
drawObject=function(x,t){
  if(game.scene===0&&art.home&&art.home.complete&&art.home.naturalWidth&&(t==='table'||t==='radio'||t==='window'))return;
  fredHomeObjectBase(x,t);
};

// Replace the original tonal fly-over with a heavy, distant engine rumble.
// A sub oscillator supplies weight while filtered noise gives the sound its
// broad, oppressive air movement as the He 111 passes overhead.
planePassTone=function(){try{
  audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();audioContext.resume?.();
  const now=audioContext.currentTime,dur=1.9,master=audioContext.createGain(),sub=audioContext.createOscillator(),body=audioContext.createOscillator(),subGain=audioContext.createGain(),bodyGain=audioContext.createGain(),subFilter=audioContext.createBiquadFilter(),bodyFilter=audioContext.createBiquadFilter();
  master.gain.setValueAtTime(.0001,now);master.gain.exponentialRampToValueAtTime(.075,now+.34);master.gain.exponentialRampToValueAtTime(.0001,now+dur);master.connect(audioContext.destination);
  sub.type='sine';sub.frequency.setValueAtTime(32,now);sub.frequency.exponentialRampToValueAtTime(43,now+.72);sub.frequency.exponentialRampToValueAtTime(27,now+dur);subGain.gain.value=.72;sub.connect(subGain).connect(master);
  body.type='sawtooth';body.frequency.setValueAtTime(49,now);body.frequency.exponentialRampToValueAtTime(72,now+.7);body.frequency.exponentialRampToValueAtTime(34,now+dur);bodyFilter.type='lowpass';bodyFilter.frequency.setValueAtTime(145,now);bodyFilter.frequency.exponentialRampToValueAtTime(230,now+.72);bodyFilter.frequency.exponentialRampToValueAtTime(110,now+dur);bodyFilter.Q.value=.7;bodyGain.gain.value=.22;body.connect(bodyFilter).connect(bodyGain).connect(master);
  const buffer=audioContext.createBuffer(1,Math.floor(audioContext.sampleRate*dur),audioContext.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++){const fade=1-i/data.length,slow=.7+.3*Math.sin(i/9000);data[i]=(Math.random()*2-1)*fade*slow}const noise=audioContext.createBufferSource(),noiseFilter=audioContext.createBiquadFilter(),noiseGain=audioContext.createGain();noise.buffer=buffer;noiseFilter.type='lowpass';noiseFilter.frequency.setValueAtTime(170,now);noiseFilter.frequency.exponentialRampToValueAtTime(320,now+.7);noiseFilter.frequency.exponentialRampToValueAtTime(120,now+dur);noiseGain.gain.setValueAtTime(.0001,now);noiseGain.gain.exponentialRampToValueAtTime(.18,now+.42);noiseGain.gain.exponentialRampToValueAtTime(.0001,now+dur);noise.connect(noiseFilter).connect(noiseGain).connect(master);
  sub.start(now);body.start(now);noise.start(now);sub.stop(now+dur);body.stop(now+dur);noise.stop(now+dur);
}catch(e){}};

function finishSecondSceneReaction(){
  game.reactionMove=false;game.reactionPose='idle';game.reactionFx='';game.keys={};
  game.scene1ContinueHint=true;game.locked=false;
}
function secondSceneAftermath(choice){
  // The consequence is read before Fred moves, so the player can connect the
  // destruction with the response they selected rather than missing it during
  // a running animation.
  game.locked=true;game.reactionMove=false;game.reactionPose='idle';game.reactionFx='';game.keys={};
  say('','After the bombing, flames filled the house. The voices faded and never returned.',()=>{
    game.keys={};secondSceneChoiceReaction(choice);
  });
}
function secondSceneChoiceReaction(n){
  game.reactionFx='';
  if(n===0){
    // Fred follows the passing shadow, then regains control of the street.
    game.locked=true;game.reactionPose='run';game.reactionMove=true;game.reactionMoveTarget=770;game.dir=1;game.shake=13;game.flash=8;
    const wait=setInterval(()=>{if(!game.reactionMove){clearInterval(wait);game.locked=true;say('Fred','The shadow passes over me. I let it pass.',()=>finishSecondSceneReaction())}},30);
  }else if(n===1){
    // He backs into the doorway and folds his arms over his head.
    game.locked=true;game.reactionPose='cover';game.reactionFx='dark';game.reactionMove=true;game.reactionMoveTarget=640;game.dir=-1;
    const wait=setInterval(()=>{if(!game.reactionMove){clearInterval(wait);game.locked=true;say('Fred','The world narrows to the doorway. I wait for the engines to fade.',()=>finishSecondSceneReaction())}},30);
  }else{
    // Eyes shut: this response carries Fred directly through the ruins and
    // into the next scene, without asking the player to repeat the movement.
    game.locked=true;game.reactionPose='run';game.reactionMove=true;game.reactionMoveTarget=895;game.reactionFx='';game.dir=1;ui.prompt.classList.add('hidden');
    const wait=setInterval(()=>{if(!game.reactionMove){clearInterval(wait);game.reactionPose='idle';game.keys={};nextScene()}},30);
  }
}

// The second-scene wrapper keeps every existing interaction intact while
// giving its final aircraft question a distinct, visible consequence.
const fredBaseSceneEventOverride=sceneEvent;
sceneEvent=function(){
  if(game.scene===0){
    game.interact=null;ui.prompt.classList.add('hidden');
    if(game.x>735&&game.event===1)offerInteraction('Listen to the call from the ruins',()=>{ask(1,n=>{game.event=2;if(n===2){game.reactionType='callCover';game.reactionPose='crouch';game.reactionFx='static';game.locked=true;game.shake=3;setTimeout(()=>{game.reactionPose='idle';game.reactionType='';game.reactionFx='';game.locked=false},900)}else game.locked=false})});
    else if(game.x>735&&game.event===2)offerInteraction('Leave through the broken window',()=>{game.event=3;say('Fred','I step through the broken window.',()=>nextScene())});
    else if(game.x>850){if(sceneComplete(0))nextScene();else blockedExit()}
    return;
  }
  // Act 6 (the shelter) ends after the radio maze.  The shelter route no
  // longer uses the legacy chase boss, so its completion flag must also own
  // the right-edge exit.  Previously the base handler only knew how to open
  // the tunnel while event===1; once the maze set event=2 it cleared the
  // prompt every frame and never called nextScene().
  if(game.scene===5){
    game.interact=null;ui.prompt.classList.add('hidden');
    if(game.event>=2){
      if(game.x>850){nextScene();}
      else{ui.prompt.textContent='KEEP MOVING RIGHT · THE EXIT IS AHEAD';ui.prompt.classList.remove('hidden')}
    }else{
      fredBaseSceneEventOverride();
    }
    return;
  }
  if(game.scene!==1)return fredBaseSceneEventOverride();
  game.interact=null;ui.prompt.classList.add('hidden');
  if(Math.abs(game.x-640)<75&&game.event===0)offerInteraction('Follow the sound beside the door',()=>{
    game.event=1;
    say('Fred','I think I heard someone. I follow the sound and stop beside a door.',()=>{
      ask(2,()=>say('','Then, without warning, aircraft droned overhead.',()=>{
        ask(3,n=>secondSceneAftermath(n));
      }));
    });
  });
  else if(game.x>850){if(sceneComplete(1)){game.scene1ContinueHint=false;game.reactionMove=false;game.reactionPose='idle';nextScene()}else blockedExit()}
  else if(game.scene1ContinueHint){ui.prompt.textContent='KEEP MOVING →';ui.prompt.classList.remove('hidden')}
};
const fredBaseSceneComplete=sceneComplete;
sceneComplete=function(s){return s===0?game.event>=3:fredBaseSceneComplete(s)};

// Option three of the first question now reads as a small piece of blocking:
// Fred reaches the table, settles his weight, then speaks from a complete
// crouched silhouette instead of switching pose while still crossing the room.
const fredBaseFirstChoiceReaction=firstChoiceReaction;
firstChoiceReaction=function(n,done){
  if(n!==2){fredBaseFirstChoiceReaction(n,done);return}
  // Keep player input locked for the entire cover animation. The reaction
  // loop moves Fred independently, so he can still reach the table smoothly
  // without the held arrow key fighting the scripted route.
  game.locked=true;game.keys={};game.reactionFx='static';game.reactionPose='run';game.reactionMove=true;game.reactionMoveTarget=220;game.dir=-1;game.shake=2;
  const wait=setInterval(()=>{if(!game.reactionMove){clearInterval(wait);game.locked=true;game.keys={};game.reactionPose='crouch';setTimeout(()=>{say('Fred','I cannot hear anything…',()=>{game.reactionPose='idle';game.reactionFx='';game.keys={};done&&done()})},300)}},30);
};

/* -------------------------------------------------------------------------
   Boss battle replacement from the teammate build.
   It is intentionally isolated from the existing scene renderer: the normal
   story, puzzles and scene transitions remain unchanged, while the final
   encounter gets the three-stage fog / chair / acceptance structure.
-------------------------------------------------------------------------- */
let B=null;
function newBoss(){
  // A longer first phase gives the fight a real escalation while the bar
  // still maps cleanly to a fixed number of readable player actions.
  const maxHp=240+game.mist*24,hitsNeeded=Math.max(12,14+Math.floor(game.mist/2));
  return {p:1,t:0,stageTimer:0,maxHp,hp:maxHp,hitsNeeded,hitCount:0,nextAttackAt:0,clarityAt:0,clarityMistAnchor:game.mist,dmgPerHit:maxHp/hitsNeeded,fx:550,fr:90,fi:1,fb:[],attacks:[],attackTimer:0,damageCooldown:0,msg:'',msgt:0,hitFlash:0,shake:0,chairX:480,chairGlow:0,sit:false,elderReveal:false,defeated:false,es:0,et:0,col:0,sceneFade:0,white:0};
}
function bossClarityInterval(){return Math.max(3000,10000-game.mist*1000)}
function bossClarityPulse(){
  if(!B||B.p!==1||B.defeated||game.locked)return;
  const now=performance.now();
  if(!B.clarityAt){B.clarityAt=now+10000;B.clarityMistAnchor=game.mist;return}
  if(game.mist>B.clarityMistAnchor){B.clarityAt=Math.max(now,B.clarityAt-(game.mist-B.clarityMistAnchor)*1000);B.clarityMistAnchor=game.mist}
  if(now<B.clarityAt)return;
  game.clarity=Math.max(0,game.clarity-1);game.flash=12;game.shake=8;updateHUD();B.msg='The fog erodes your clarity.';B.msgt=75;
  if(game.clarity<=0){game.clarity=3;game.mist=Math.max(0,game.mist-5);B.hp=B.maxHp;B.hitCount=0;B.attacks=[];B.attackTimer=0;B.nextAttackAt=now+500;B.msg='Your clarity breaks. The fog gathers again.';B.msgt=105;updateHUD()}
  B.clarityMistAnchor=game.mist;B.clarityAt=now+bossClarityInterval();
}
function beginMemoryRoute(){
  if(!B)return;
  const pool=[0,1,2,3,4,5].sort(()=>Math.random()-.5);
  B.p=5;B.route=pool.slice(0,2);B.routeIndex=0;B.routeFlash=18;B.pursuerX=-135;
  B.attacks=[];B.attackTimer=0;B.damageCooldown=0;B.nextAttackAt=0;
  B.msg='THE FOG ATTACKS · REACH THE CHAIR';B.msgt=180;B.chairX=820;game.x=55;game.dir=1;game.locked=false;game.keys={};
  ui.prompt.textContent='DODGE THE ATTACKS · KEEP MOVING RIGHT';ui.prompt.classList.remove('hidden');
}
function enterMemoryChairPhase(){
  if(!B)return;
  // The secret route used to leave Fred at x=700 while the chair was at x=820.
  // That put him outside the interaction radius and made the easter-egg ending
  // appear to stop after the second memory backdrop.
  B.p=3;B.fi=.02;B.fr=20;B.chairX=760;B.chairGlow=1;B.sit=false;B.attacks=[];B.attackTimer=0;
  game.x=170;game.dir=1;game.locked=false;game.keys={};game.interact=null;
  ui.prompt.textContent='WALK RIGHT TO THE CHAIR';ui.prompt.classList.remove('hidden');
  B.msg='The memories fall away. The chair waits in the light.';B.msgt=180;
}
function drawMemoryRouteBackdrop(){
  const images=[art.home,art.ruinsDoor,art.grocery,art.clinic,art.school,art.shelter],image=images[B.route?.[B.routeIndex]??0];
  if(image&&image.complete&&image.naturalWidth)ctx.drawImage(image,0,0,1672,941,0,0,960,540);else{ctx.fillStyle='#151b20';ctx.fillRect(0,0,960,540)}
  ctx.fillStyle='rgba(4,6,8,.38)';ctx.fillRect(0,0,960,540);
  const edge=ctx.createRadialGradient(480,280,80,480,280,560);edge.addColorStop(0,'rgba(0,0,0,0)');edge.addColorStop(1,'rgba(0,0,0,.48)');ctx.fillStyle=edge;ctx.fillRect(0,0,960,540);
  if(B.routeFlash>0){ctx.fillStyle=`rgba(226,213,178,${B.routeFlash/90})`;ctx.fillRect(0,0,960,540);B.routeFlash--}
}
function drawMemoryPursuer(){
  if(!B||B.p!==5)return;
  const bx=B.pursuerX??(game.x-170),by=338,pulse=.92+Math.sin(B.t/9)*.08;
  ctx.save();ctx.globalAlpha=.78;
  // Keep the fog behind Fred: the trailing edge never crosses his lane.
  ctx.fillStyle='#08090b';ctx.beginPath();ctx.ellipse(bx,by,58*pulse,76*pulse,0,0,7);ctx.fill();
  ctx.fillStyle='rgba(34,20,28,.9)';ctx.beginPath();ctx.ellipse(bx+18,by-9,31*pulse,47*pulse,0,0,7);ctx.fill();
  ctx.fillStyle='rgba(132,40,37,.5)';ctx.beginPath();ctx.arc(bx+20,by-12,7+Math.sin(B.t/7)*2,0,7);ctx.fill();
  ctx.strokeStyle='rgba(12,10,13,.85)';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(bx-34,by+38);ctx.quadraticCurveTo(bx-82,by+68,bx-105,by+42);ctx.moveTo(bx+18,by+42);ctx.quadraticCurveTo(bx+58,by+72,bx+84,by+43);ctx.stroke();
  ctx.globalAlpha=.2;ctx.fillStyle='#1b2020';for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(bx-75+i*34,by+58+(i%2)*8,24,9,0,0,7);ctx.fill()}
  ctx.restore();
}
function startBoss(){
  B=newBoss();game.boss='final';game.bossT=0;game.locked=true;game.x=120;game.shake=14;game.flash=18;
  for(let i=0;i<6;i++)B.fb.push({x:Math.random()*960,y:80+Math.random()*300,t:Math.random()*200,life:0,type:i%3});
  say('BLACK FOG','…You came back at last.',()=>{game.locked=false;B.t=0;B.msg='Press 1 to push back the fog.';B.msgt=180});
}
function memoryBossDamage(){
  if(!B||(B.p!==5&&B.p!==3)||B.damageCooldown>0||game.locked)return;
  B.damageCooldown=34;game.clarity=Math.max(0,game.clarity-1);game.flash=20;game.shake=18;B.msg='The fog tears at your clarity.';B.msgt=70;updateHUD();
  if(game.clarity<=0){
    game.clarity=3;game.mist=Math.max(0,game.mist-5);B.attacks=[];B.attackTimer=0;game.keys={};
    if(B.p===5){B.pursuerX=-135;game.x=55;B.msg='Your clarity breaks. The memory begins again.';ui.prompt.textContent='DODGE THE ATTACKS · KEEP MOVING RIGHT'}
    else{game.x=Math.max(55,B.chairX-180);B.msg='The fog drives you back from the chair.';ui.prompt.textContent='DODGE THE ATTACKS · REACH THE CHAIR'}
    B.msgt=110;ui.prompt.classList.remove('hidden');updateHUD();
  }else{
    game.locked=true;
    setTimeout(()=>{if(B&&(B.p===5||B.p===3)&&!B.sit)game.locked=false},280);
  }
}
function bossAttack(){
  if(!B||B.p!==1||game.locked)return;
  const now=performance.now();
  if(now<B.nextAttackAt)return;
  B.nextAttackAt=now+200;
  B.hp=Math.max(0,B.hp-B.dmgPerHit);B.hitCount++;B.hitFlash=15;B.shake=12;game.shake=8;game.flash=4;
  if(B.hp<=0){
    B.hp=0;B.msg='The fog breaks apart.';B.msgt=120;B.fi=Math.max(.3,B.fi-.3);B.fr=Math.max(30,B.fr-15);
    if(!B.defeated){
      B.defeated=true;game.locked=true;game.keys={};
      setTimeout(()=>{
        if(!B||B.p!==1||!B.defeated)return;
        // The acceptance space arrives at Fred instead of asking for one
        // more walk across an already-finished arena.
        B.p=3;B.stageTimer=0;B.fi=.05;B.fr=15;B.chairX=760;B.chairGlow=1;game.x=170;game.dir=1;game.keys={};
        say('','The black fog breaks apart. A chair stands in the clearing.',()=>{
          if(!B||B.p!==3)return;
          B.msg='Walk toward the chair on the right.';B.msgt=180;ui.prompt.textContent='WALK RIGHT TO THE CHAIR';ui.prompt.classList.remove('hidden');game.locked=false;
        });
      },480);
    }
  }
  else{B.msg=`The fog recoils. ${Math.ceil(B.hp)} / ${B.maxHp}`;B.msgt=60}
}
function bossSpawnAttack(){
  if(!B||(B.p!==1&&B.p!==5&&B.p!==3)||B.defeated)return;
  // Snapshot Fred's lane, then give him time to step out of it.
  const memory=B.p!==1;
  const target=memory?game.x-75+((B.attackTimer/24)%3-1)*34:game.x;
  B.attacks.push({x:Math.max(65,Math.min(895,target)),t:0,hit:false,memory});
  B.msg=memory?'The fog strikes through the memory. Move.':'The fog marks the floor. Move.';B.msgt=55;
}
function bossDamageFred(){
  if(!B||B.damageCooldown>0||game.locked)return;
  B.damageCooldown=34;game.clarity=Math.max(0,game.clarity-1);game.flash=20;game.shake=18;updateHUD();
  if(game.clarity<=0){
    game.clarity=3;game.mist=Math.max(0,game.mist-5);B.hp=B.maxHp;B.hitCount=0;B.attacks=[];B.attackTimer=0;B.nextAttackAt=performance.now()+500;game.x=120;game.keys={};updateHUD();
    say('BLACK FOG','Your clarity has broken. The fog gathers again.',()=>{if(B&&B.p===1)game.locked=false});
  }else{
    game.locked=true;B.msg='The fog tears at your clarity.';B.msgt=70;
    setTimeout(()=>{if(B&&B.p===1&&!B.defeated)game.locked=false},280);
  }
}
function updateBossAttacks(){
  if(!B)return;
  if(B.damageCooldown>0)B.damageCooldown--;
  for(let i=B.attacks.length-1;i>=0;i--){
    const a=B.attacks[i];a.t++;
    // Frames 1-18 are the warning ring; the impact lasts briefly after it.
    if(a.t>=19&&a.t<=31&&!a.hit&&Math.abs(game.x-a.x)<30){
      a.hit=true;
      if(B.p===5||B.p===3)memoryBossDamage();else bossDamageFred();
      // A full Clarity break clears every active shadow at once.
      if(B.attacks.length===0)break;
    }
    if(a.t>34)B.attacks.splice(i,1);
  }
}
function bossStageAdvance(){
  if(!B)return;
  if(B.p===1){B.p=2;B.stageTimer=0;say('','The black fog thins. A chair waits in the light.',()=>{game.locked=false})}
  else if(B.p===2){B.p=3;B.stageTimer=0;B.chairX=760;game.x=170;game.dir=1;say('Fred','I slow down. The chair is waiting for me.',()=>{ui.prompt.textContent='WALK RIGHT TO THE CHAIR';ui.prompt.classList.remove('hidden');game.locked=false})}
}
function bossSitDown(){
  // The chair is visible from passage phase onward. It must be usable as
  // soon as Fred reaches it; previously it was drawn in phase 2 but only
  // accepted input during phase 3, which made E appear to do nothing.
  if(!B||(B.p!==2&&B.p!==3)||B.sit||Math.abs(game.x-B.chairX)>100)return;
  B.sit=true;B.p=4;B.es=0;B.et=0;B.col=0;B.sceneFade=0;B.white=0;B.elderReveal=false;game.locked=true;game.keys={};ui.prompt.classList.add('hidden');
  // Music is the first response to the chair interaction. Only after this
  // line is dismissed does the room begin warming and reveal the elder.
  say('','A small music-box melody begins to rise from the silence.',()=>{
    if(!B||B.p!==4)return;
    B.sceneFade=.001;
    game.locked=false;
  });
}
function bossEndingStep(){
  if(!B||B.p!==4||game.locked)return;
  B.et++;
  // Keep the reflective beats, but avoid making the player wait through a
  // long empty fade before the final elderly-Fred image arrives.
  if(B.es===0){B.col=Math.min(1,B.col+.012);if(!B.elderReveal&&B.col>.16){B.elderReveal=true;B.msg='The room returns. Fred is still here.';B.msgt=90}if(B.et>70){B.es=1;B.et=0;say('','The war sounds move farther away.',()=>{game.locked=false})}}
  // Bring the final two reflective prompts forward, then let the original
  // brightening/fade animation carry the remaining duration.
  else if(B.es===1){B.col=Math.min(1,B.col+.018);B.fi=Math.max(0,B.fi-.014);if(B.et>65){B.es=2;B.et=0;say('','A small music-box melody returns.',()=>{game.locked=false})}}
  else if(B.es===2){B.white=Math.min(.4,B.white+.009);B.chairGlow=Math.min(1,B.chairGlow+.015);if(B.et>70){B.es=3;B.et=0;say('','Birdsong. Wind. Children laughing far away.',()=>{game.locked=false})}}
  else if(B.es===3){B.white=Math.min(1,B.white+.018);if(B.et>80){B.es=4;B.et=0}}
  else if(B.es===4){B.white=Math.min(1,B.white+.027);if(B.et>150){game.boss=false;B=null;window._bossRetries=0;finish()}}
}
function updateBoss(){
  if(!B||game.boss!=='final')return;B.t++;B.stageTimer++;if(B.msgt>0)B.msgt--;if(B.hitFlash>0)B.hitFlash--;if(B.shake>0)B.shake*=.85;
  B.fb.forEach(f=>{f.t++;f.life=Math.sin(f.t/50)*.5+.5});
  if(B.p===5){
    const desiredTrail=game.x-170;B.pursuerX+=(desiredTrail-B.pursuerX)*.035;B.pursuerX=Math.min(B.pursuerX,game.x-112);
    updateBossAttacks();
    if(!game.locked){B.attackTimer++;if(B.attackTimer>=92){B.attackTimer=0;bossSpawnAttack()}}
    if(!game.locked&&game.x>=895){
      if(B.routeIndex<B.route.length-1){B.routeIndex++;B.routeFlash=18;game.x=55;B.pursuerX=-135;B.msg='The fog follows. A different memory slips past.';B.msgt=120;}
      else{enterMemoryChairPhase()}
    }
  }
  else if(B.p===1){
    updateBossAttacks();
    bossClarityPulse();
    if(!game.locked&&!B.defeated){B.attackTimer++;if(B.attackTimer>=84){B.attackTimer=0;bossSpawnAttack()}}
    if(B.fx<game.x)B.fx+=1.3;else B.fx-=1.3;B.fr=85+Math.sin(B.t/18)*12;B.fi=1;if(B.hp<=0)B.fi=Math.max(.3,B.fi-.01);if(B.stageTimer%240===0&&B.stageTimer>60){B.msg='Keep moving toward the light.';B.msgt=120}
  }
  else if(B.p===2){B.fi=Math.max(0,B.fi-.008);B.fr=Math.max(15,B.fr-.3);B.chairGlow=Math.min(.5,B.chairGlow+.02);const dist=Math.abs(game.x-B.chairX);B.msg=dist<100?'Press E to sit down.':'The chair waits in the light. Walk to it.';B.msgt=5}
  else if(B.p===3){
    B.chairGlow=Math.min(1,B.chairGlow+.006);const dist=Math.abs(game.x-B.chairX);B.fi=Math.max(.05,.5-dist/600);B.fr=Math.max(20,B.fr-.1);
    updateBossAttacks();
    if(!game.locked&&!B.sit){B.attackTimer++;if(B.attackTimer>=110){B.attackTimer=0;bossSpawnAttack()}}
    if(!B.sit&&game.x>B.chairX+90){game.x=B.chairX;game.dir=-1}
    const sitDist=Math.abs(game.x-B.chairX);
    if(!B.sit&&sitDist<=110){B.msg='Press E to sit down.';B.msgt=5;ui.prompt.textContent='PRESS E TO SIT DOWN';ui.prompt.classList.remove('hidden')}
    else if(!B.sit&&sitDist<260){B.msg='Walk toward the chair.';B.msgt=5;ui.prompt.textContent='WALK TO THE CHAIR';ui.prompt.classList.remove('hidden')}
  }
  else{
    if(B.sceneFade>0&&B.sceneFade<1){B.sceneFade=Math.min(1,B.sceneFade+.008);B.col=Math.max(B.col,B.sceneFade)}
    bossEndingStep();
  }
  // The right edge remains an intentional escape route: players may keep
  // running and leave the encounter, or stay to face the fog to completion.
  if(B&&B.p===1&&!game.locked&&!B.defeated&&game.x>=895){beginMemoryRoute();return}
  if(B&&B.p===2&&!game.locked&&game.x>=895)bossStageAdvance();
}
function drawBossChair(){
  if(!B||B.p<2)return;const cx=B.chairX,cy=420;
  if(B.chairGlow>0){const gg=ctx.createRadialGradient(cx,cy-20,10,cx,cy-20,140);gg.addColorStop(0,`rgba(244,228,193,${.55*B.chairGlow})`);gg.addColorStop(1,'rgba(244,228,193,0)');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(cx,cy-20,140,0,7);ctx.fill()}
  drawRockingChair(cx,cy);
  if(B.chairGlow>.3){ctx.save();ctx.globalAlpha=B.chairGlow*.35;ctx.fillStyle='#d4a85a';ctx.fillRect(cx-28,cy-11,56,4);ctx.restore()}
}
function drawBossFog(){
  if(!B||B.p===4)return;const bx=B.fx+B.shake*(Math.random()-.5),by=330,r=B.fr,redFlash=B.hitFlash>0?B.hitFlash/15:0,fogAlpha=B.p>=3?.3:1;
  for(let i=0;i<6;i++){const layer=i/6;ctx.fillStyle=`rgba(${20+redFlash*80},8,${24+redFlash*20},${(.8-layer*.1)*fogAlpha})`;ctx.beginPath();ctx.arc(bx+Math.sin(B.t/15+i)*15,by+Math.cos(B.t/18+i)*10,r*(1-layer*.15),0,7);ctx.fill()}
  const pulse=.3+Math.sin(B.t/20)*.2,rg=ctx.createRadialGradient(bx,by,5,bx,by,r*.6);rg.addColorStop(0,`rgba(${107+redFlash*80},26,26,${pulse*B.fi*fogAlpha})`);rg.addColorStop(1,'rgba(107,26,26,0)');ctx.fillStyle=rg;ctx.beginPath();ctx.arc(bx,by,r*.6,0,7);ctx.fill();
}
function drawBossAttacks(){
  if(!B||(B.p!==1&&B.p!==5&&B.p!==3))return;
  B.attacks.forEach(a=>{
    const memory=B.p!==1,impact=a.t>=19,alpha=impact?Math.max(0,1-(a.t-19)/16):.35+.2*Math.sin(a.t*.7),groundY=428;
    if(!impact){
      const r=12+(18-a.t)*1.4;ctx.strokeStyle=memory?`rgba(155,130,87,${alpha})`:`rgba(194,76,47,${alpha})`;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(a.x,groundY,r,r*.28,0,0,7);ctx.stroke();
      ctx.fillStyle=memory?`rgba(115,93,67,${alpha*.22})`:`rgba(103,25,30,${alpha*.22})`;ctx.beginPath();ctx.ellipse(a.x,groundY,r,r*.28,0,0,7);ctx.fill();
    }else{
      ctx.fillStyle=memory?`rgba(22,21,25,${alpha*.8})`:`rgba(13,5,17,${alpha*.8})`;ctx.fillRect(a.x-11,252,22,176);
      ctx.fillStyle=memory?`rgba(139,112,63,${alpha*.4})`:`rgba(128,35,32,${alpha*.5})`;ctx.fillRect(a.x-4,282,8,146);
      ctx.fillStyle=memory?`rgba(196,157,83,${alpha*.5})`:`rgba(196,65,41,${alpha*.65})`;ctx.beginPath();ctx.ellipse(a.x,groundY,28*alpha+8,7*alpha+3,0,0,7);ctx.fill();
    }
  });
}
function drawBossHpBar(){
  const bx=280,by=90,bw=400,bh=22;ctx.fillStyle='rgba(10,5,12,.85)';ctx.fillRect(bx-3,by-3,bw+6,bh+6);ctx.strokeStyle='#6b1a1a';ctx.lineWidth=2;ctx.strokeRect(bx-3,by-3,bw+6,bh+6);const pct=B.hp/B.maxHp,hg=ctx.createLinearGradient(bx,0,bx+bw,0);hg.addColorStop(0,'#8b1a1a');hg.addColorStop(.5,'#c44a2a');hg.addColorStop(1,'#8b1a1a');ctx.fillStyle=hg;ctx.fillRect(bx,by,bw*pct,bh);ctx.fillStyle=`rgba(255,80,40,${.15+Math.sin(Date.now()/200)*.1})`;ctx.fillRect(bx,by,bw*pct,bh);ctx.strokeStyle='#d4bd8a44';ctx.lineWidth=1;ctx.strokeRect(bx,by,bw,bh);ctx.fillStyle='#d4bd8a';ctx.font='11px Courier New';ctx.textAlign='center';ctx.fillText(`FOG INTEGRITY ${Math.ceil(B.hp)} / ${B.maxHp}`,bx+bw/2,by+15);ctx.textAlign='left';
}
function drawBossArena(){
  if(!B)return;ctx.save();if(game.shake>0)ctx.translate((Math.random()-.5)*game.shake,(Math.random()-.5)*game.shake);
  if(B.p===5){drawMemoryRouteBackdrop();drawMemoryPursuer();drawBossAttacks();ctx.fillStyle='#0008';ctx.beginPath();ctx.ellipse(game.x,431,22,5,0,0,7);ctx.fill();drawPixelPerson(game.x,440);if(B.msg&&B.msgt>0){ctx.fillStyle='rgba(216,189,122,.9)';ctx.font='14px Georgia';ctx.textAlign='center';ctx.fillText(B.msg,480,60);ctx.textAlign='left'}ctx.fillStyle='#d4bd8a88';ctx.font='11px Courier New';ctx.fillText(`MEMORY PASSAGE · ${B.routeIndex+1} / 2`,28,34);ctx.restore();return}
  // The room warms continuously from the first post-seat line, instead of
  // waiting for the full epilogue before changing its atmosphere.
  const c=Math.max(0,Math.min(1,B.col||0)),mix=(a,b)=>Math.round(a+(b-a)*c),rgb=(a,b)=>`rgb(${mix(a[0],b[0])},${mix(a[1],b[1])},${mix(a[2],b[2])})`;
  let bg=ctx.createLinearGradient(0,0,0,540);bg.addColorStop(0,rgb([26,14,31],[129,133,119]));bg.addColorStop(.6,rgb([13,7,18],[175,159,117]));bg.addColorStop(1,rgb([5,3,10],[92,86,75]));ctx.fillStyle=bg;ctx.fillRect(0,0,960,540);const pulse=.15+Math.sin(Date.now()/800)*.08;ctx.fillStyle=`rgba(107,26,26,${pulse*B.fi*(1-c)})`;ctx.fillRect(0,0,960,540);ctx.fillStyle=rgb([36,24,40],[148,139,109]);ctx.fillRect(0,80,960,350);ctx.fillStyle=rgb([10,5,8],[76,71,61]);for(let i=0;i<18;i++){const x=40+i*52+(i%3?10:0),y=120+(i%4)*70;ctx.beginPath();ctx.arc(x,y,4,0,7);ctx.fill()}
  ctx.fillStyle=rgb([10,5,12],[72,67,58]);ctx.fillRect(0,430,960,110);B.fb.forEach(f=>{if(f.life>.3){ctx.globalAlpha=f.life*.25*(1-c*.75);if(f.type===0){ctx.fillStyle='#c44a1a';ctx.beginPath();ctx.arc(f.x,f.y,30+f.life*20,0,7);ctx.fill()}else if(f.type===1){ctx.fillStyle='#000';ctx.fillRect(f.x-10,f.y-30,20,60)}else{ctx.fillStyle='#3a2a1a';ctx.fillRect(f.x,f.y,40,20)}ctx.globalAlpha=1}});
  // Keep the chair anchored after Fred sits.  The old code redrew it at a
  // different baseline (382), which made it jump behind the floor and look
  // as if it had vanished during the music transition.  It now stays on the
  // same grounded line as the pre-interaction chair until the elder model is
  // revealed.
  if(!B.sit)drawBossChair();
  else if(!B.elderReveal)drawRockingChair(B.chairX,420);
  drawBossFog();ctx.fillStyle='#0008';ctx.beginPath();ctx.ellipse(B.sit?B.chairX:game.x,431,22,5,0,0,7);ctx.fill();
  if(B.sit&&B.elderReveal){if(!drawElderRockerModel(B.chairX,430)){drawRockingChair(B.chairX,420);drawElderFred(B.chairX,420,'seated')}}
  else if(!B.sit)drawPixelPerson(game.x,440);drawBossAttacks();
  if(B.p===1)drawBossHpBar();if(B.msg&&B.msgt>0){ctx.fillStyle=`rgba(216,189,122,${Math.min(1,B.msgt/30)})`;ctx.font='14px Georgia';ctx.textAlign='center';ctx.fillText(B.msg,480,60);ctx.textAlign='left'}ctx.fillStyle='#d4bd8a88';ctx.font='11px Courier New';ctx.fillText(['','BATTLE · RESIST','PASSAGE · FOLLOW','ACCEPT · SIT',''][B.p]||'',28,34);if(B.white>0){ctx.fillStyle=`rgba(244,228,193,${B.white})`;ctx.fillRect(0,0,960,540)}ctx.restore();
}
function bossRenderLoop(){if(game.boss==='final'&&B)drawBossArena();requestAnimationFrame(bossRenderLoop)}
requestAnimationFrame(bossRenderLoop);
document.addEventListener('keydown',e=>{if(!B||game.boss!=='final')return;if((e.key==='1'||e.key===' ')&&B.p===1){bossAttack();e.preventDefault()}if((e.key==='e'||e.key==='E'||e.key==='Enter')&&B.p===3&&!B.sit){bossSitDown();e.preventDefault()}});
setInterval(()=>{if(game.boss==='final'&&B)updateBoss()},30);

// The illustrated shelter already carries the cot, radio and tunnel mouth.
// Avoid stacking the earlier placeholder props over the painted scene.
const fredShelterObjectBase=drawObject;
drawObject=function(x,t){
  if(game.scene===5&&art.shelter&&art.shelter.complete&&art.shelter.naturalWidth&&
    (t==='bed'||t==='radio'||t==='tunnel'))return;
  fredShelterObjectBase(x,t);
};

// Act 7 now uses the detailed square illustration as its complete visual
// layer. Remove the old placeholder luggage, clock and green gate blocks that
// were painted on top of it; the square interaction remains location-based
// and is now described as an open route through the rubble.
const fredAct7ObjectBase=drawObject;
drawObject=function(x,t){
  if(game.scene===6&&(t==='luggage'||t==='clock'||t==='gate'))return;
  fredAct7ObjectBase(x,t);
};

/* -------------------------------------------------------------------------
   M-key story jump menu.
   Checkpoints are recorded when a scene is first entered during this run.
   Moving forward keeps the current mist value; moving backward restores the
   value saved for that scene. Boss encounters deliberately block the menu.
-------------------------------------------------------------------------- */
let jumpMarks=Object.create(null),jumpScene=-1,jumpMenuOpen=false,jumpMenuLocked=false;
const jumpPoints=[
  ['HOME · RADIO','The first broadcast'],
  ['RESIDENTIAL STREET · DOOR','The voice beside the door'],
  ['GROCERY SHOP · MIRROR','Bread and the reflection'],
  ['FIELD CLINIC · LAMP','The temporary hospital'],
  ['SCHOOL · PHOTOGRAPH','The classroom memory'],
  ['SHELTER · SIGNAL','Tune the radio and follow the maze'],
  ['SQUARE · GATE','The final question before the fog'],
  ['MORNING · ENDING','The chair and the peace after war']
];
const jumpStyle=document.createElement('style');jumpStyle.textContent=`
  .jump-menu{position:absolute;inset:0;z-index:20;display:grid;place-items:center;background:rgba(5,6,6,.9);backdrop-filter:blur(3px);color:#d8c9a6}
  .jump-card{width:min(680px,90%);max-height:88%;overflow:auto;padding:28px 30px;background:linear-gradient(180deg,#151613,#0b0c0b);border:1px solid #756447;box-shadow:12px 12px 0 #0008,0 0 45px #000}
  .jump-card h2{margin:0;color:#dbc99f;font:700 21px Georgia,serif;letter-spacing:.14em;text-align:center}.jump-card .jump-note{margin:10px 0 20px;text-align:center;color:#8b8779;font-size:10px;line-height:1.6}
  .jump-points{display:grid;grid-template-columns:1fr 1fr;gap:8px}.jump-point{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;padding:12px 14px;min-height:60px}.jump-point small{color:#8c8776;font-size:9px;letter-spacing:.04em}.jump-point.current{border-color:#d1b475;color:#111;background:#d0bb8b}.jump-point.current small{color:#4c4435}.jump-point.locked{opacity:.35}.jump-close{display:block;margin:18px auto 0;padding:9px 18px;font-size:10px}.jump-home{margin-top:8px;border-color:#8b7652;color:#d5bd8e}@media(max-width:650px){.jump-card{padding:20px 16px}.jump-points{grid-template-columns:1fr}.jump-card h2{font-size:17px}}
`;document.head.appendChild(jumpStyle);
const jumpMenu=document.createElement('div');jumpMenu.id='jumpMenu';jumpMenu.className='jump-menu hidden';jumpMenu.innerHTML='<div class="jump-card"><h2>STORY POINTS</h2><p class="jump-note">M · JUMP TO A RECORDED STORY POINT<br>FORWARD JUMPS KEEP M · BACKWARD JUMPS RESTORE THAT POINT’S M</p><div class="jump-points"></div><button class="jump-close jump-home" type="button">RETURN TO MAIN MENU</button><button class="jump-close" type="button">CANCEL · M</button></div>';document.querySelector('#game').appendChild(jumpMenu);
const jumpPointsBox=jumpMenu.querySelector('.jump-points'),jumpNote=jumpMenu.querySelector('.jump-note');
function rememberJumpScene(){
  if(!game.started||game.ending)return;
  if(jumpScene!==game.scene){if(jumpMarks[game.scene]===undefined)jumpMarks[game.scene]=game.mist;jumpScene=game.scene}
}
function refreshJumpMenu(){
  rememberJumpScene();
  jumpPointsBox.innerHTML='';
  jumpPoints.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.className='jump-point';if(i===game.scene)b.classList.add('current');b.dataset.scene=i;b.innerHTML=`<span>${String(i+1).padStart(2,'0')} · ${p[0]}</span><small>${p[1]} · M ${jumpMarks[i]??'—'}</small>`;b.onclick=()=>jumpToScene(i);jumpPointsBox.appendChild(b)});
  jumpNote.innerHTML=`M · JUMP TO A RECORDED STORY POINT<br>FORWARD JUMPS KEEP M · BACKWARD JUMPS RESTORE THAT POINT’S M<br><span style="color:#b99055">CURRENT M: ${game.mist}</span>`;
}
function closeJumpMenu(){if(!jumpMenuOpen)return;jumpMenuOpen=false;jumpMenu.classList.add('hidden');if(jumpMenuLocked){game.locked=false;jumpMenuLocked=false}canvas.parentElement.focus()}
function returnToMainMenuFromJump(){closeJumpMenu();returnToTitle()}
jumpMenu.querySelector('.jump-home').onclick=returnToMainMenuFromJump;
jumpMenu.querySelector('.jump-close:not(.jump-home)').onclick=closeJumpMenu;
function openJumpMenu(){
  if(!game.started||game.ending)return;
  if(game.boss||(typeof B!=='undefined'&&B)){ui.prompt.textContent='M · SHORTCUT DISABLED DURING THE BOSS FIGHT';ui.prompt.classList.remove('hidden');setTimeout(()=>{if(game.boss)ui.prompt.classList.add('hidden')},1600);return}
  jumpMenuOpen=true;jumpMenuLocked=!game.locked;game.locked=true;refreshJumpMenu();jumpMenu.classList.remove('hidden');
}
function jumpToScene(target){
  if(target===game.scene){closeJumpMenu();return}
  const from=game.scene,backward=target<from;
  rememberJumpScene();
  if(!backward){for(let i=from+1;i<=target;i++)if(jumpMarks[i]===undefined)jumpMarks[i]=game.mist}
  if(backward&&jumpMarks[target]!==undefined)game.mist=jumpMarks[target];
  closeJumpMenu();
  // Clear scene-local overlays and transient interactions before repositioning.
  ['dialogue','choice','puzzle','tuning','soundMaze'].forEach(id=>document.querySelector(`#${id}`)?.classList.add('hidden'));
  game.next=null;game.interact=null;game.keys={};game.fade=0;game.fadeDir=0;game.flash=0;game.shake=0;game.wobble=0;game.boss=false;game.ending=false;game.clarity=3;game.event=0;game.mirrorState=0;game.mirrorBusy=false;game.homeDamaged=false;game.clinicLight=0;game.photoComplete=false;game.photoLiftAt=0;game.photoQuestionTriggered=false;game.blackboardAnswer=null;game.blackboardOpen=false;game.clinicPapers=[false,false,false];game.photoPieces=[false,false,false,false,false,false];game.reactionPose='idle';game.reactionFx='';game.reactionMove=false;game.scene=target;game.x=target===0?520:80;game.dir=1;game.locked=false;updateHUD();
  if(target===7){game.scene=6;finish();return}
  if(target===0){say('BROADCAST','…This is a temporary broadcast station… Is anyone still alive? …',()=>walkToRadio());return}
  sceneArrival();
}
const fredBaseResetForJump=reset;
reset=function(){jumpMarks=Object.create(null);jumpScene=-1;closeJumpMenu();fredBaseResetForJump();rememberJumpScene()};
$('#startBtn').onclick=reset;
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='m'&&!e.repeat){e.preventDefault();if(jumpMenuOpen)closeJumpMenu();else openJumpMenu()}if(jumpMenuOpen&&e.key==='Escape'){e.preventDefault();closeJumpMenu()}});
setInterval(rememberJumpScene,120);

/* -------------------------------------------------------------------------
   Contextual playtest hints.
   A scene gets one hint after ten seconds without a successful item
   interaction, or after five consecutive empty canvas clicks. The hint stays
   visible during play and clears when the player interacts, changes scene, or
   enters a blocking overlay.
 -------------------------------------------------------------------------- */
const assistHint=$('#assistHint');
const assistState={scene:-1,lastItemAt:0,emptyClicks:0,shown:false};

function assistReset(scene=game.scene){
  assistState.scene=scene;assistState.lastItemAt=performance.now();assistState.emptyClicks=0;assistState.shown=false;
  assistHint.classList.add('hidden');
}
function assistClear(){assistState.lastItemAt=performance.now();assistState.emptyClicks=0;assistState.shown=false;assistHint.classList.add('hidden')}
function assistMarkInteraction(){if(!game.started)return;assistClear()}
function assistMessage(){
  const s=game.scene;
  if(s===0){
    if(game.event===0)return 'HINT · THE RADIO STILL HAS POWER · WALK TO IT AND PRESS E';
    if(game.event===1)return 'HINT · LISTEN FOR THE CALL FROM THE RUINS · SEARCH THE RIGHT SIDE AND PRESS E';
    if(game.event===2)return 'HINT · THE WAY OUT IS THE BROKEN WINDOW · GO RIGHT AND PRESS E';
  }
  if(s===1){
    if(game.event===0)return 'HINT · FOLLOW THE SOUND BESIDE THE WOODEN DOOR · GO TO THE DOOR AND PRESS E';
    if(game.scene1ContinueHint)return 'HINT · THE STREET IS OPEN AGAIN · KEEP MOVING RIGHT';
  }
  if(s===2){
    if(!(game.event&1))return 'HINT · TAKE THE LAST PIECE OF BREAD · SEARCH THE LEFT SIDE AND PRESS E';
    if(!(game.event&2))return 'HINT · LOOK INTO THE CRACKED MIRROR · SEARCH THE RIGHT SIDE AND PRESS E';
    return 'HINT · BOTH MEMORIES ARE FOUND · KEEP MOVING RIGHT TO LEAVE THE SHOP';
  }
  if(s===3){
    if(!(game.event&1))return 'HINT · PULL THE CLINIC LIGHT CORD · GO TO THE LAMP AND PRESS E';
    if(!(game.event&2))return 'HINT · READ THE PAPER BESIDE THE BED · GO TO THE CLINIC TABLE AND PRESS E';
    const found=game.clinicPapers?.filter(Boolean).length||0;
    if(found<3)return `HINT · SEARCH THE ROOM FOR 3 PAPER FRAGMENTS · ${found} / 3 FOUND`;
    return 'HINT · THE CLINIC RECORD IS COMPLETE · CLOSE IT, THEN MOVE RIGHT';
  }
  if(s===4){
    if(game.blackboardAnswer===null)return 'HINT · CLICK THE BLACKBOARD TO ANSWER THE QUESTION';
    const found=game.photoPieces?.filter(Boolean).length||0;
    if(found<6)return `HINT · COLLECT THE SIX PHOTO FRAGMENTS · ${found} / 6 FOUND`;
    return 'HINT · THE PHOTO IS RESTORED · KEEP MOVING RIGHT TO LEAVE THE SCHOOL';
  }
  if(s===5){
    if(game.event<2)return 'HINT · WALK RIGHT TO THE TUNNEL SKETCH · PRESS E TO FOLLOW THE STEADY SIGNAL';
    return 'HINT · THE SIGNAL IS CLEAR · KEEP MOVING RIGHT TO THE EXIT';
  }
  if(s===6)return 'HINT · FOLLOW THE OPEN ROUTE ACROSS THE SQUARE · GO RIGHT AND PRESS E';
  return '';
}
function assistSuppressed(){
  return !game.started||game.ending||game.scene>=7||game.sceneIntro>0||game.fadeDir||game.locked||game.next||game.boss||(typeof B!=='undefined'&&B);
}
function assistTick(){
   if(!assistHint||!game.started)return;
  if(assistState.scene!==game.scene)assistReset();
  const now=performance.now();
   if(assistSuppressed()){
     assistState.lastItemAt=now;assistState.emptyClicks=0;assistState.shown=false;
     assistHint.classList.add('hidden');
     return;
   }
   if(!assistState.shown&&(now-assistState.lastItemAt>=10000||assistState.emptyClicks>=5)){
    const message=assistMessage();
    if(message){assistHint.textContent=message;assistHint.classList.remove('hidden');assistState.shown=true}
  }
}
function assistCanvasPoint(e){
  const rect=canvas.getBoundingClientRect();
  return {x:(e.clientX-rect.left)/rect.width*canvas.width,y:(e.clientY-rect.top)/rect.height*canvas.height};
}
function assistHitCanvasItem(p){
  if(game.scene===3){
    if(game.clinicRecord)return true;
    for(let i=0;i<clinicPaperSpots.length;i++){
      const spot=clinicPaperSpots[i],hit=spot.hit||spot.w;
      if(!game.clinicPapers?.[i]&&Math.abs(p.x-spot.x)<hit*.72&&Math.abs(p.y-spot.y)<hit*.55)return true;
    }
  }
  if(game.scene===4){
    if(game.blackboardAnswer===null&&p.x>=685&&p.x<=940&&p.y>=48&&p.y<=260)return true;
    for(let i=0;i<schoolPhotoSpots.length;i++){
      const spot=schoolPhotoSpots[i],hit=spot.hit||spot.w;
      if(!game.photoPieces?.[i]&&Math.abs(p.x-spot.x)<hit*.72&&Math.abs(p.y-spot.y)<hit*.55)return true;
    }
  }
  return false;
}
function assistCanvasClick(e){
  if(!game.started||game.ending||game.scene>=7||game.locked||game.fadeDir||e.target!==canvas)return;
  if(assistHitCanvasItem(assistCanvasPoint(e))){assistMarkInteraction();return}
  assistState.emptyClicks++;
}
canvas.addEventListener('click',assistCanvasClick);
document.addEventListener('click',e=>{
  if(e.target.closest('.choice button,.socket,#mazeDirections button,#mazeListen'))assistMarkInteraction();
},true);
const fredAssistOfferInteraction=offerInteraction;
offerInteraction=function(label,action){fredAssistOfferInteraction(label,()=>{assistMarkInteraction();action()})};
setInterval(assistTick,250);
