var canva=document.getElementById("lienzo")
var papel=canva.getContext("2d")
var anchoWindow=window.innerWidth
var anchoLienzo=anchoWindow<340?anchoWindow*0.8:300
var banderasT=document.getElementById('banderasP')
var bombasT=document.getElementById('bombasP')
var flagActive = false
var run = true
var bombasN = 0
var banderasC=0
var vasillasN = 0
var mapaI = []
var mapaF = []
var mapaG = []
var cantidadCeldas
var anchoCelda
var inicio

canva.width=anchoLienzo
canva.height=anchoLienzo

function resetB() {
  if(confirm('Volver a empezar?')){
    limpiarMapa()
  }
}

function celdasC() {
let n=prompt('Cantidad de casillas al cuadrado', '4-15')
if (!(n > 3 && n <= 15)) {
   return 7
}else{
  return n
}
}


function flagA() {
  let btn=document.getElementById('flag').style
  if (mapaF[0].length>0&&flagActive==false) {
    flagActive=true
    btn.background='green'
  }else{
    flagActive=false
    btn.background='white'
  }
}


function aleatorio(min,max) {
    return Math.round((Math.random()*(max-min))+min)
}




function actionSwitch(xp,yp,type) {
switch (type) {
  case 0:
    mapaI[yp][xp] = 0
    break;
  case 1:
    if (mapaG[yp][xp] == -1) {
      abrirMina(xp, yp)
    }
    break
  case 2:
    return mapaG[yp][xp] == "🚩" ? 1 : 0
    break;
  default:
     return mapaI[yp][xp] == "💣" ? 1 : 0
    break;
}
return 0
}



function acciones(xr,yr,type) {
  let arrizq = 0
  let arr = 0
  let arrdere = 0
  let izq = 0
  let dere = 0
  let abaizq = 0
  let aba = 0
  let abadere = 0


  if (xr>0&&yr>0) {
    arrizq=actionSwitch(xr-1,yr-1,type)
  }
  
  
  
  if (yr>0) {
  arr = actionSwitch(xr,yr-1,type)
  }
   
   
  if (xr<cantidadCeldas-1&&yr>0) {
     arrdere = actionSwitch(xr+1,yr-1,type)
   }
   
   
  if (xr>0) {
        izq = actionSwitch(xr-1,yr,type)
}
 
   
   
  if (xr<cantidadCeldas-1) {
        dere=actionSwitch(xr+1,yr,type)
  } 
  
  
  
  if (xr>0&&yr<cantidadCeldas-1) {
       abaizq = actionSwitch(xr-1,yr+1,type)
  }
    
    
    
  if (yr<cantidadCeldas-1) {
    aba=actionSwitch(xr,yr+1,type)
  } 
   
   
   
  if (xr<cantidadCeldas-1&&yr<cantidadCeldas-1) {
    abadere=actionSwitch(xr+1,yr+1,type)
  }
  
   return arrizq+arr+arrdere+izq+dere+abaizq+aba+abadere
}




      
      
function limpiarMapa() {
  let valor
  inicio=false
  bombasN=0
  banderasC=0
  cantidadCeldas=celdasC()
  anchoCelda=anchoLienzo/cantidadCeldas
  run=true
  bombasT.innerHTML='bombas:'+bombasN
  banderasT.innerHTML='banderas:'+banderasC
  for (let vertical = 0; vertical < cantidadCeldas; vertical++) {
    mapaI[vertical]=[]
    mapaF[vertical]=[]
    mapaG[vertical]=[]
  for (let horizontal = 0; horizontal < cantidadCeldas; horizontal++) {
    
    mapaG[vertical][horizontal]=-1
    valor=aleatorio(0,2)>1?"💣":0
    mapaI[vertical].push(valor)
  }}
  flagA()
  drawMap()
}






function drawMap() {
colorMosaico=0
for (let vertical = 0; vertical < cantidadCeldas; vertical++) {
for (let horizontal = 0; horizontal < cantidadCeldas; horizontal++) {
  
let inX = horizontal * anchoCelda
let inY = vertical * anchoCelda
let vCasilla=mapaG[vertical][horizontal]
papel.beginPath()
if (vCasilla!=-1) {
  papel.beginPath()
  papel.fillStyle = '#E4A97E'
  papel.fillRect(inX, inY, anchoCelda, anchoCelda)
switch (vCasilla) {
  case '💣':
    papel.fillText("💣", (inX) + anchoCelda /5, (inY) + anchoCelda / 1.5)
    break
  case '🚩':
    papel.fillStyle = colorMosaico % 2 == 0 ? "#0cb46e" : "green"
papel.fillRect(inX, inY, anchoCelda, anchoCelda)
    papel.fillText("🚩", (inX) + anchoCelda / 4, (inY) + anchoCelda / 1.5)
    break;
  default:
  if (vCasilla!=0) {
    papel.fillStyle = 'black'
papel.fillText(vCasilla, (inX) + anchoCelda / 2.7, (inY) + anchoCelda / 1.5)
  }
    break
}
  
}else{
  
  papel.fillStyle = colorMosaico % 2 == 0 ? "#0cb46e" : "green"
papel.fillRect(inX, inY, anchoCelda, anchoCelda)
}
papel.fill()
papel.beginPath()
papel.moveTo(inX, 0)
papel.lineTo(inX, anchoLienzo)
papel.stroke()
papel.beginPath()
papel.moveTo(0, inY)
papel.lineTo(anchoLienzo, inY)
papel.stroke()
colorMosaico++
if (horizontal == cantidadCeldas-1&&cantidadCeldas%2==0) {
  colorMosaico++
}
}
}

}








function crearMapa(xi,yi) {
    mapaI[yi][xi]=0
    vasillasN=0
    acciones(xi,yi,0)
     for (let vertical = 0; vertical < cantidadCeldas; vertical++) {
         for (let horizontal = 0; horizontal < cantidadCeldas; horizontal++) {
           let val=mapaI[vertical][horizontal]
           mapaF[vertical].push(val)
           if (val==0) {
                mapaF[vertical][horizontal]=acciones(horizontal,vertical)
            } else if (val == '💣') {
              bombasN++
              
            }
        }}
        banderasC=bombasN
        bombasT.innerHTML='bombas:'+bombasN
        abrirMina(xi,yi,1)
}









function abrirMina(x,y,n) {
  if (run) {
    if (!inicio) {
        inicio=true
        crearMapa(x,y)
    }else{
    let valor = mapaF[y][x]
    let vCasilla=mapaG[y][x]
    papel.beginPath()
    papel.fill()
    papel.beginPath()
    papel.font=anchoCelda/2+"px Arial"
    papel.fillStyle='blue'
    
    if (!flagActive||!n) {
      vasillasN++
         switch (valor) {
      case '💣':
     mapaG=mapaF.slice()
     drawMap()
     alert('perdiste')
     run=false
     break
      case 0:
        mapaG[y][x]=0
        acciones(x,y,1)
       break;
      default:
       mapaG[y][x]=valor
        break
        }
  if (vasillasN + bombasN == cantidadCeldas * cantidadCeldas&&run) {
  alert('Ganaste')
  run = false

}         

    }else if (vCasilla=='🚩') {
      mapaG[y][x]=-1
      banderasC++
      drawMap()
    }else if(vCasilla==-1){
      mapaG[y][x]='🚩'
      banderasC--
    }else if(vCasilla>=-1&&acciones(x,y,2)==vCasilla){
      acciones(x,y,1)
    }
    papel.fill()
    banderasT.innerHTML='banderas:'+banderasC
  drawMap()
    }
    
}
}



canva.addEventListener("click",(event)=>{
let Cx=Math.floor(event.offsetX/anchoCelda)
let Cy=Math.floor(event.offsetY/anchoCelda)

abrirMina(Cx,Cy,1)
})



limpiarMapa()

