const cnv = document.querySelector('#canvas'),
      ctx = cnv.getContext('2d');
      cnv.width = 1160;
      cnv.height = 600;

// OBIEKTY Z DANYMI
const task = {
  X: [5, 255, 255, 505, 505, 755, 755, 1005],
  Y: [190, 90, 290, 190, 390, 90, 290, 190],
  name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  duration: []
//  predecessors: ['A', 'A', 'B', 'C', 'C', 'D', 'D', 'E', 'F', 'G'],
//  successors:   ['B', 'C', 'D', 'D', 'E', 'F', 'G', 'G', 'H', 'H']
};

const dependencies = {
  X: [task.X[0]+160, task.X[0]+160, task.X[1]+160, task.X[1]+160, task.X[1]+160, task.X[3]+160, task.X[3]+160, task.X[3]+160, task.X[6]+160, task.X[6]+160],
  Y: [task.Y[0]+30, task.Y[0]+50, task.Y[1]+50, task.Y[2]+30, task.Y[2]+50, task.Y[3]+30, task.Y[3]+50, task.Y[4]+30, task.Y[5]+50, task.Y[6]+30],
  direction: [-45, 45, 45, -45, 45, -45, 45, -45, 45, -45],
  relation: [],
  delay: []
};


// TABELE Z DANYMI
let   relType = ['FS', 'SS', 'FF', 'SF'],
      language = ['EN'];
const inputsL = [task.X[0]+1, task.X[0]+51, task.X[0]+101, task.X[0]+1, task.X[0]+51, task.X[0]+101,
                 task.X[1]+1, task.X[1]+51, task.X[1]+101, task.X[1]+1, task.X[1]+51, task.X[1]+101,
                 task.X[2]+1, task.X[2]+51, task.X[2]+101, task.X[2]+1, task.X[2]+51, task.X[2]+101,
                 task.X[3]+1, task.X[3]+51, task.X[3]+101, task.X[3]+1, task.X[3]+51, task.X[3]+101,
                 task.X[4]+1, task.X[4]+51, task.X[4]+101, task.X[4]+1, task.X[4]+51, task.X[4]+101,
                 task.X[5]+1, task.X[5]+51, task.X[5]+101, task.X[5]+1, task.X[5]+51, task.X[5]+101,
                 task.X[6]+1, task.X[6]+51, task.X[6]+101, task.X[6]+1, task.X[6]+51, task.X[6]+101,
                 task.X[7]+1, task.X[7]+51, task.X[7]+101, task.X[7]+1, task.X[7]+51, task.X[7]+101],
      inputsT = [task.Y[0]+61, task.Y[0]+61, task.Y[0]+61, task.Y[0]+111, task.Y[0]+111, task.Y[0]+111,
                 task.Y[1]+61, task.Y[1]+61, task.Y[1]+61, task.Y[1]+111, task.Y[1]+111, task.Y[1]+111,
                 task.Y[2]+61, task.Y[2]+61, task.Y[2]+61, task.Y[2]+111, task.Y[2]+111, task.Y[2]+111,
                 task.Y[3]+61, task.Y[3]+61, task.Y[3]+61, task.Y[3]+111, task.Y[3]+111, task.Y[3]+111,
                 task.Y[4]+61, task.Y[4]+61, task.Y[4]+61, task.Y[4]+111, task.Y[4]+111, task.Y[4]+111,
                 task.Y[5]+61, task.Y[5]+61, task.Y[5]+61, task.Y[5]+111, task.Y[5]+111, task.Y[5]+111,
                 task.Y[6]+61, task.Y[6]+61, task.Y[6]+61, task.Y[6]+111, task.Y[6]+111, task.Y[6]+111,
                 task.Y[7]+61, task.Y[7]+61, task.Y[7]+61, task.Y[7]+111, task.Y[7]+111, task.Y[7]+111];

// LICZBY LOSOWE
function randomNumber(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};


// GENEROWANIE CZASÓW
function genDuration() {
  task.duration.splice(0,8);
  for (let i=0; i<8; i++) {
    task.duration.push(randomNumber(0,20));
  }
};


// GENEROWANIE RELACJI
function genRel() {
  dependencies.delay.splice(0,10);
  dependencies.relation.splice(0,10);
    for (let i=0; i<10; i++) {
    dependencies.delay.push(randomNumber(-10,10));
    dependencies.relation.push(randomNumber(0,relType.length-1));
  }
};


// ZADANIA
function newTask() {
  ctx.clearRect(0,0,cnv.width,cnv.height); 
  for (let i=0, max=task.X.length; i<max; i++) {
  const w = 150,
        h = 75;
  ctx.strokeRect(task.X[i], task.Y[i], w, h);
  ctx.strokeRect(task.X[i] + w/3, task.Y[i], w/3, h);
  ctx.strokeRect(task.X[i], task.Y[i] + h/3, w, h/3);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.font = 'bold 16px Arial';
  ctx.fillStyle = 'darkblue';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(task.name[i], task.X[i] + w/6, task.Y[i] + h/2);
  ctx.fillText(task.duration[i], task.X[i] + w/2, task.Y[i] + h/2); //2*h/3 - h/6 = h/2
  }
};

// RELACJE
function newRel() {
  for (let i=0, max=dependencies.X.length; i<max; i++) {
  let size = 110,
      arrowHead = size * .05;
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = 'black';
  ctx.save();
  ctx.translate(dependencies.X[i], dependencies.Y[i]);
  ctx.rotate(dependencies.direction[i] * Math.PI / 180);
  ctx.translate(-dependencies.X[i], -dependencies.Y[i]);
  ctx.moveTo(dependencies.X[i], dependencies.Y[i]);
  ctx.lineTo(dependencies.X[i] + size, dependencies.Y[i]);
  ctx.lineTo(dependencies.X[i] + size - arrowHead, dependencies.Y[i] - arrowHead);
  ctx.moveTo(dependencies.X[i] + size, dependencies.Y[i]);
  ctx.lineTo(dependencies.X[i] + size - arrowHead, dependencies.Y[i] + arrowHead);
  if (dependencies.delay[i] == 0) {
    ctx.fillText(relType[dependencies.relation[i]], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
  else if (dependencies.delay[i] > 0) {
    ctx.fillText(relType[dependencies.relation[i]] + "+" + dependencies.delay[i], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
  else {
    ctx.fillText(relType[dependencies.relation[i]] + dependencies.delay[i], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
  ctx.stroke();
  ctx.restore();
  }
};


// Czyszczenie canvas między rysowaniem
function clearCnv() {
  ctx.clearRect(0,0,cnv.width,cnv.height); 
};


// INPUTY W ZADANIACH

let k = 0,
    l = 6,
    contents = '',
    element;

//for (i=0; i<inputsL.length; i++) {
//  let element = `<input id="R${i}" type="text" name="R${i}" style="top:${inputsT[i]}px; left:${inputsL[i]}px">`;
//  contents = contents + element;
//}

for (let i=0, max=task.name.length; i<max; i++) {
  for (j=k; j<l; j++) { 
    if (j%6 == 0) {
      element = `<input id="ES${task.name[i]}F" placeholder="ES" onblur='placeholder="ES"' onfocus='placeholder=""' class="inp" style="top:${inputsT[j]}px; left:${inputsL[j]}px">`;
    } else
    if (j%6 == 1) {
      element = `<input id="TF${task.name[i]}F" placeholder="TF" onblur='placeholder="TB"' onfocus='placeholder=""' class="inp" style="top:${inputsT[j]}px; left:${inputsL[j]}px">`;
    } else
    if (j%6 == 2) {
      element = `<input id="EF${task.name[i]}F" placeholder="EF" onblur='placeholder="EF"' onfocus='placeholder=""' class="inp" style="top:${inputsT[j]}px; left:${inputsL[j]}px">`;
    } else
    if (j%6 == 3) {
      element = `<input id="LS${task.name[i]}F" placeholder="LS" onblur='placeholder="LS"' onfocus='placeholder=""' class="inp" style="top:${inputsT[j]}px; left:${inputsL[j]}px">`;
    } else
    if (j%6 == 4) {
      element = `<input id="FF${task.name[i]}F" placeholder="FF" onblur='placeholder="FB"' onfocus='placeholder=""' class="inp" style="top:${inputsT[j]}px; left:${inputsL[j]}px">`;
    } else
    if (j%6 == 5) {
      element = `<input id="LF${task.name[i]}F" placeholder="LF" onblur='placeholder="LF"' onfocus='placeholder=""' class="inp" style="top:${inputsT[j]}px; left:${inputsL[j]}px">`;
    }
    contents = contents + element;
  }
  k+=6;
  l+=6;
};

document.querySelector('form').innerHTML = contents;


// CZYSZCZENIE INPUTÓW

function clear() {
  let table;
  for (let i=0, max=inputsL.length; i<max; i++) {
    table = document.querySelectorAll('.inp');
    table[i].value = '';
  }
}


// OBLICZANIE WYNIKÓW

function calc() {

// obliczneia dla A
ESA = 0;
EFA = ESA + task.duration[0];
LSA = 0;
LFA = EFA;
TFA = 0;
FFA = 0;

// obliczneia dla B
if (dependencies.relation[0] == 0) {
  ESB = EFA + dependencies.delay[0];
} 
else if (dependencies.relation[0] == 1) {
  ESB = ESA + dependencies.delay[0];
} 
else if (dependencies.relation[0] == 2) {
  ESB = EFA + dependencies.delay[0] - task.duration[1];
}
else if (dependencies.relation[0] == 3) {
  ESB = ESA + dependencies.delay[0] - task.duration[1];
}

EFB = ESB + task.duration[1];


// obliczenia dla C
if (dependencies.relation[1] == 0) {
  ESC = EFA + dependencies.delay[1];
} 
else if (dependencies.relation[1] == 1) {
  ESC = ESA + dependencies.delay[1];
} 
else if (dependencies.relation[1] == 2) {
  ESC = EFA + dependencies.delay[1] - task.duration[2];
}
else if (dependencies.relation[1] == 3) {
  ESC = ESA + dependencies.delay[1] - task.duration[2];
}

EFC = ESC + task.duration[2];

    
// obliczenia dla D z B
if (dependencies.relation[2] == 0) {
  ESDB = EFB + dependencies.delay[2];
} 
else if (dependencies.relation[2] == 1) {
  ESDB = ESB + dependencies.delay[2];
} 
else if (dependencies.relation[2] == 2) {
  ESDB = EFB + dependencies.delay[2] - task.duration[3];
}
else if (dependencies.relation[2] == 3) {
  ESDB = ESB + dependencies.delay[2] - task.duration[3];
}

// obliczenia dla D z C
if (dependencies.relation[3] == 0) {
  ESDC = EFC + dependencies.delay[3];
} 
else if (dependencies.relation[3] == 1) {
  ESDC = ESC + dependencies.delay[3];
} 
else if (dependencies.relation[3] == 2) {
  ESDC = EFC + dependencies.delay[3] - task.duration[3];
}
else if (dependencies.relation[3] == 3) {
  ESDC = ESC + dependencies.delay[3] - task.duration[3];
}

ESD = Math.max(ESDB, ESDC);
EFD = ESD + task.duration[3];

  
// obliczneia dla E
if (dependencies.relation[4] == 0) {
  ESE = EFC + dependencies.delay[4];
} 
else if (dependencies.relation[4] == 1) {
  ESE = ESC + dependencies.delay[4];
} 
else if (dependencies.relation[4] == 2) {
  ESE = EFC + dependencies.delay[4] - task.duration[4];
}
else if (dependencies.relation[4] == 3) {
  ESE = ESC + dependencies.delay[4] - task.duration[4];
}

EFE = ESE + task.duration[4];


// obliczneia dla F
if (dependencies.relation[5] == 0) {
  ESF = EFD + dependencies.delay[5];
} 
else if (dependencies.relation[5] == 1) {
  ESF = ESD + dependencies.delay[5];
} 
else if (dependencies.relation[5] == 2) {
  ESF = EFD + dependencies.delay[5] - task.duration[5];
}
else if (dependencies.relation[5] == 3) {
  ESF = ESD + dependencies.delay[5] - task.duration[5];
}

EFF = ESF + task.duration[5];
  
  
// obliczenia dla G z D
if (dependencies.relation[6] == 0) {
  ESGD = EFD + dependencies.delay[6];
} 
else if (dependencies.relation[6] == 1) {
  ESGD = ESD + dependencies.delay[6];
} 
else if (dependencies.relation[6] == 2) {
  ESGD = EFD + dependencies.delay[6] - task.duration[6];
}
else if (dependencies.relation[6] == 3) {
  ESGD = ESD + dependencies.delay[6] - task.duration[6];
}

// obliczenia dla G z E
if (dependencies.relation[7] == 0) {
  ESGE = EFE + dependencies.delay[7];
} 
else if (dependencies.relation[7] == 1) {
  ESGE = ESE + dependencies.delay[7];
} 
else if (dependencies.relation[7] == 2) {
  ESGE = EFE + dependencies.delay[7] - task.duration[6];
}
else if (dependencies.relation[7] == 3) {
  ESGE = ESE + dependencies.delay[7] - task.duration[6];
}

ESG = Math.max(ESGD, ESGE);
EFG = ESG + task.duration[6];

  
// obliczenia dla H z F
if (dependencies.relation[8] == 0) {
  ESHF = EFF + dependencies.delay[8];
} 
else if (dependencies.relation[8] == 1) {
  ESHF = ESF + dependencies.delay[8];
} 
else if (dependencies.relation[8] == 2) {
  ESHF = EFF + dependencies.delay[8] - task.duration[7];
}
else if (dependencies.relation[8] == 3) {
  ESHF = ESF + dependencies.delay[8] - task.duration[7];
}

// obliczenia dla H z G
if (dependencies.relation[9] == 0) {
  ESHG = EFG + dependencies.delay[9];
} 
else if (dependencies.relation[9] == 1) {
  ESHG = ESG + dependencies.delay[9];
} 
else if (dependencies.relation[9] == 2) {
  ESHG = EFG + dependencies.delay[9] - task.duration[7];
}
else if (dependencies.relation[9] == 3) {
  ESHG = ESG + dependencies.delay[9] - task.duration[7];
}

ESH = Math.max(ESHF, ESHG);
EFH = ESH + task.duration[7];  
LSH = ESH;
LFH = EFH;
TFH = 0;
FFH = 0;
  
  
// Powrót
  
// Obliczenia dla G
if (dependencies.relation[9] == 0) {
  LFG = LSH - dependencies.delay[9];
  FFG = ESH - EFG - dependencies.delay[9];
} 
else if (dependencies.relation[9] == 1) {
  LFG = LSH - dependencies.delay[9] + task.duration[6];
  FFG = ESH - ESG - dependencies.delay[9];
} 
else if (dependencies.relation[9] == 2) {
  LFG = LFH - dependencies.delay[9];
  FFG = EFH - EFG - dependencies.delay[9];
}
else if (dependencies.relation[9] == 3) {
  LFG = LFH - dependencies.delay[9] + task.duration[6];
  FFG = EFH - ESG - dependencies.delay[9];
}

LSG = LFG - task.duration[6];
TFG = LSG - ESG;

  
// Obliczenia dla F
if (dependencies.relation[8] == 0) {
  LFF = LSH - dependencies.delay[8];
  FFF = ESH - EFF - dependencies.delay[8];
} 
else if (dependencies.relation[8] == 1) {
  LFF = LSH - dependencies.delay[8] + task.duration[5];
  FFF = ESH - ESF - dependencies.delay[8];
} 
else if (dependencies.relation[8] == 2) {
  LFF = LFH - dependencies.delay[8];
  FFF = EFH - EFF - dependencies.delay[8];
}
else if (dependencies.relation[8] == 3) {
  LFF = LFH - dependencies.delay[8] + task.duration[5];
  FFF = EFH - ESF - dependencies.delay[8];
}

LSF = LFF - task.duration[5];
TFF = LSF - ESF;


//  Obliczenia dla E
if (dependencies.relation[7] == 0) {
  LFE = LSG - dependencies.delay[7];
  FFE = ESG - EFE - dependencies.delay[7];
} 
else if (dependencies.relation[7] == 1) {
  LFE = LSG - dependencies.delay[7] + task.duration[4];
  FFE = ESG - ESE - dependencies.delay[7];
} 
else if (dependencies.relation[7] == 2) {
  LFE = LFG - dependencies.delay[7];
  FFE = EFG - EFE - dependencies.delay[7];
}
else if (dependencies.relation[7] == 3) {
  LFE = LFG - dependencies.delay[7] + task.duration[4];
  FFE = EFG - ESE - dependencies.delay[7];
}

LSE = LFE - task.duration[4];
TFE = LSE - ESE;


// Obliczenia dla D z F
if (dependencies.relation[5] == 0) {
  LFDF = LSF - dependencies.delay[5];
  FFDF = ESF - EFD - dependencies.delay[5];
} 
else if (dependencies.relation[5] == 1) {
  LFDF = LSF - dependencies.delay[5] + task.duration[3];
  FFDF = ESF - ESD - dependencies.delay[5];
} 
else if (dependencies.relation[5] == 2) {
  LFDF = LFF - dependencies.delay[5];
  FFDF = EFF - EFD - dependencies.delay[5];
}
else if (dependencies.relation[5] == 3) {
  LFDF = LFF - dependencies.delay[5] + task.duration[3];
  FFDF = EFF - ESD - dependencies.delay[5];
}


// Obliczenia dla D z G
if (dependencies.relation[6] == 0) {
  LFDG = LSG - dependencies.delay[6];
  FFDG = ESG - EFD - dependencies.delay[6];
} 
else if (dependencies.relation[6] == 1) {
  LFDG = LSG - dependencies.delay[6] + task.duration[3];
  FFDG = ESG - ESD - dependencies.delay[6];
} 
else if (dependencies.relation[6] == 2) {
  LFDG = LFG - dependencies.delay[6];
  FFDG = EFG - EFD - dependencies.delay[6];
}
else if (dependencies.relation[6] == 3) {
  LFDG = LFG - dependencies.delay[6] + task.duration[3];
  FFDG = EFG - ESD - dependencies.delay[6];
}

LFD = Math.min(LFDF, LFDG);
LSD = LFD - task.duration[3];
TFD = LSD - ESD;
FFD = Math.min(FFDF, FFDG)
  
// Obliczenia dla C z D
if (dependencies.relation[3] == 0) {
  LFCD = LSD - dependencies.delay[3];
  FFCD = ESD - EFC - dependencies.delay[3];
} 
else if (dependencies.relation[3] == 1) {
  LFCD = LSD - dependencies.delay[3] + task.duration[2];
  FFCD = ESD - ESC - dependencies.delay[3];
} 
else if (dependencies.relation[3] == 2) {
  LFCD = LFD - dependencies.delay[3];
  FFCD = EFD - EFC - dependencies.delay[3];
}
else if (dependencies.relation[3] == 3) {
  LFCD = LFD - dependencies.delay[3] + task.duration[2];
  FFCD = EFD - ESC - dependencies.delay[3];
}


// Obliczenia dla C z E
if (dependencies.relation[4] == 0) {
  LFCE = LSE - dependencies.delay[4];
  FFCE = ESE - EFC - dependencies.delay[4];
} 
else if (dependencies.relation[4] == 1) {
  LFCE = LSE - dependencies.delay[4] + task.duration[2];
  FFCE = ESE - ESC - dependencies.delay[4];
} 
else if (dependencies.relation[4] == 2) {
  LFCE = LFE - dependencies.delay[4];
  FFCE = EFE - EFC - dependencies.delay[4];
}
else if (dependencies.relation[4] == 3) {
  LFCE = LFE - dependencies.delay[4] + task.duration[2];
  FFCE = EFE - ESC - dependencies.delay[4];
}

LFC = Math.min(LFCD, LFCE);
LSC = LFC - task.duration[2];
TFC = LSC - ESC;
FFC = Math.min(FFCD, FFCE);

  
// Obliczenia dla B
if (dependencies.relation[2] == 0) {
  LFB = LSD - dependencies.delay[2];
  FFB = ESD - EFB - dependencies.delay[2];
} 
else if (dependencies.relation[2] == 1) {
  LFB = LSD - dependencies.delay[2] + task.duration[1];
  FFB = ESD - ESB - dependencies.delay[2];
} 
else if (dependencies.relation[2] == 2) {
  LFB = LFD - dependencies.delay[2];
  FFB = EFD - EFB - dependencies.delay[2];
}
else if (dependencies.relation[2] == 3) {
  LFB = LFD - dependencies.delay[2] + task.duration[1];
  FFB = EFD - ESB - dependencies.delay[2];
}

LSB = LFB - task.duration[1];
TFB = LSB - ESB;

};

// WPROWADZANIE ROZWIĄZANIA
function solve() {
  document.getElementById('ESAF').value = ESA;
  document.getElementById('EFAF').value = EFA;
  document.getElementById('LSAF').value = LSA;
  document.getElementById('LFAF').value = LFA;
  document.getElementById('TFAF').value = TFA;
  document.getElementById('FFAF').value = FFA;
  
  document.getElementById('ESBF').value = ESB;
  document.getElementById('EFBF').value = EFB;
  document.getElementById('LSBF').value = LSB;
  document.getElementById('LFBF').value = LFB;
  document.getElementById('TFBF').value = TFB;
  document.getElementById('FFBF').value = FFB;
  
  document.getElementById('ESCF').value = ESC;
  document.getElementById('EFCF').value = EFC;
  document.getElementById('LSCF').value = LSC;
  document.getElementById('LFCF').value = LFC;
  document.getElementById('TFCF').value = TFC;
  document.getElementById('FFCF').value = FFC;
  
  document.getElementById('ESDF').value = ESD;
  document.getElementById('EFDF').value = EFD;
  document.getElementById('LSDF').value = LSD;
  document.getElementById('LFDF').value = LFD;
  document.getElementById('TFDF').value = TFD;
  document.getElementById('FFDF').value = FFD;
  
  document.getElementById('ESEF').value = ESE;
  document.getElementById('EFEF').value = EFE;
  document.getElementById('LSEF').value = LSE;
  document.getElementById('LFEF').value = LFE;
  document.getElementById('TFEF').value = TFE;
  document.getElementById('FFEF').value = FFE;

  document.getElementById('ESFF').value = ESF;
  document.getElementById('EFFF').value = EFF;
  document.getElementById('LSFF').value = LSF;
  document.getElementById('LFFF').value = LFF;
  document.getElementById('TFFF').value = TFF;
  document.getElementById('FFFF').value = FFF;

  document.getElementById('ESGF').value = ESG;
  document.getElementById('EFGF').value = EFG;
  document.getElementById('LSGF').value = LSG;
  document.getElementById('LFGF').value = LFG;
  document.getElementById('TFGF').value = TFG;
  document.getElementById('FFGF').value = FFG;

  document.getElementById('ESHF').value = ESH;
  document.getElementById('EFHF').value = EFH;
  document.getElementById('LSHF').value = LSH;
  document.getElementById('LFHF').value = LFH;
  document.getElementById('TFHF').value = TFH;
  document.getElementById('FFHF').value = FFH;
};

// SPRAWDZANIE POPRAWNOŚCI
function check() {
  if (parseInt(document.getElementById('ESAF').value) !== ESA) {document.getElementById('ESAF').value = "Error"};
  if (parseInt(document.getElementById('EFAF').value) !== EFA) {document.getElementById('EFAF').value = "Error"};
  if (parseInt(document.getElementById('LSAF').value) !== LSA) {document.getElementById('LSAF').value = "Error"};
  if (parseInt(document.getElementById('LFAF').value) !== LFA) {document.getElementById('LFAF').value = "Error"};
  if (parseInt(document.getElementById('TFAF').value) !== TFA) {document.getElementById('TFAF').value = "Error"};
  if (parseInt(document.getElementById('FFAF').value) !== FFA) {document.getElementById('FFAF').value = "Error"};
  
  if (parseInt(document.getElementById('ESBF').value) !== ESB) {document.getElementById('ESBF').value = "Error"};
  if (parseInt(document.getElementById('EFBF').value) !== EFB) {document.getElementById('EFBF').value = "Error"};
  if (parseInt(document.getElementById('LSBF').value) !== LSB) {document.getElementById('LSBF').value = "Error"};
  if (parseInt(document.getElementById('LFBF').value) !== LFB) {document.getElementById('LFBF').value = "Error"};
  if (parseInt(document.getElementById('TFBF').value) !== TFB) {document.getElementById('TFBF').value = "Error"};
  if (parseInt(document.getElementById('FFBF').value) !== FFB) {document.getElementById('FFBF').value = "Error"};

  if (parseInt(document.getElementById('ESCF').value) !== ESC) {document.getElementById('ESCF').value = "Error"};
  if (parseInt(document.getElementById('EFCF').value) !== EFC) {document.getElementById('EFCF').value = "Error"};
  if (parseInt(document.getElementById('LSCF').value) !== LSC) {document.getElementById('LSCF').value = "Error"};
  if (parseInt(document.getElementById('LFCF').value) !== LFC) {document.getElementById('LFCF').value = "Error"};
  if (parseInt(document.getElementById('TFCF').value) !== TFC) {document.getElementById('TFCF').value = "Error"};
  if (parseInt(document.getElementById('FFCF').value) !== FFC) {document.getElementById('FFCF').value = "Error"};
  
  if (parseInt(document.getElementById('ESDF').value) !== ESD) {document.getElementById('ESDF').value = "Error"};
  if (parseInt(document.getElementById('EFDF').value) !== EFD) {document.getElementById('EFDF').value = "Error"};
  if (parseInt(document.getElementById('LSDF').value) !== LSD) {document.getElementById('LSDF').value = "Error"};
  if (parseInt(document.getElementById('LFDF').value) !== LFD) {document.getElementById('LFDF').value = "Error"};
  if (parseInt(document.getElementById('TFDF').value) !== TFD) {document.getElementById('TFDF').value = "Error"};
  if (parseInt(document.getElementById('FFDF').value) !== FFD) {document.getElementById('FFDF').value = "Error"};

  if (parseInt(document.getElementById('ESEF').value) !== ESE) {document.getElementById('ESEF').value = "Error"};
  if (parseInt(document.getElementById('EFEF').value) !== EFE) {document.getElementById('EFEF').value = "Error"};
  if (parseInt(document.getElementById('LSEF').value) !== LSE) {document.getElementById('LSEF').value = "Error"};
  if (parseInt(document.getElementById('LFEF').value) !== LFE) {document.getElementById('LFEF').value = "Error"};
  if (parseInt(document.getElementById('TFEF').value) !== TFE) {document.getElementById('TFEF').value = "Error"};
  if (parseInt(document.getElementById('FFEF').value) !== FFE) {document.getElementById('FFEF').value = "Error"};
  
  if (parseInt(document.getElementById('ESFF').value) !== ESF) {document.getElementById('ESFF').value = "Error"};
  if (parseInt(document.getElementById('EFFF').value) !== EFF) {document.getElementById('EFFF').value = "Error"};
  if (parseInt(document.getElementById('LSFF').value) !== LSF) {document.getElementById('LSFF').value = "Error"};
  if (parseInt(document.getElementById('LFFF').value) !== LFF) {document.getElementById('LFFF').value = "Error"};
  if (parseInt(document.getElementById('TFFF').value) !== TFF) {document.getElementById('TFFF').value = "Error"};
  if (parseInt(document.getElementById('FFFF').value) !== FFF) {document.getElementById('FFFF').value = "Error"};
  
  if (parseInt(document.getElementById('ESGF').value) !== ESG) {document.getElementById('ESGF').value = "Error"};
  if (parseInt(document.getElementById('EFGF').value) !== EFG) {document.getElementById('EFGF').value = "Error"};
  if (parseInt(document.getElementById('LSGF').value) !== LSG) {document.getElementById('LSGF').value = "Error"};
  if (parseInt(document.getElementById('LFGF').value) !== LFG) {document.getElementById('LFGF').value = "Error"};
  if (parseInt(document.getElementById('TFGF').value) !== TFG) {document.getElementById('TFGF').value = "Error"};
  if (parseInt(document.getElementById('FFGF').value) !== FFG) {document.getElementById('FFGF').value = "Error"};
  
  if (parseInt(document.getElementById('ESHF').value) !== ESH) {document.getElementById('ESHF').value = "Error"};
  if (parseInt(document.getElementById('EFHF').value) !== EFH) {document.getElementById('EFHF').value = "Error"};
  if (parseInt(document.getElementById('LSHF').value) !== LSH) {document.getElementById('LSHF').value = "Error"};
  if (parseInt(document.getElementById('LFHF').value) !== LFH) {document.getElementById('LFHF').value = "Error"};
  if (parseInt(document.getElementById('TFHF').value) !== TFH) {document.getElementById('TFHF').value = "Error"};
  if (parseInt(document.getElementById('FFHF').value) !== FFH) {document.getElementById('FFHF').value = "Error"};
};


//  ŚCIEŻKA KRYTYCZNA

// tabele zadań i relacji ze ściezki krytycznej i pozostałych 
let redT = [],
    blackT = [],
    redD = [],
    blackD = [];

// napełnianie tabel do ścieżki krytycznej
function calcCP() {
  redT = [];
  blackT = [];
  redD = [];
  blackD = [];
  
  if (TFA == 0) {redT.push(0)} else {blackT.push(0)};
  if (TFB == 0) {redT.push(1)} else {blackT.push(1)};
  if (TFC == 0) {redT.push(2)} else {blackT.push(2)};
  if (TFD == 0) {redT.push(3)} else {blackT.push(3)};
  if (TFE == 0) {redT.push(4)} else {blackT.push(4)};
  if (TFF == 0) {redT.push(5)} else {blackT.push(5)};
  if (TFG == 0) {redT.push(6)} else {blackT.push(6)};
  if (TFH == 0) {redT.push(7)} else {blackT.push(7)};
  
  if (TFB == 0) {redD.push(0)} else {blackD.push(0)};
  if (TFC == 0) {redD.push(1)} else {blackD.push(1)};
  if (TFB == 0) {redD.push(2)} else {blackD.push(2)};
  if (TFC == 0 && TFD ==0) {redD.push(3)} else {blackD.push(3)};
  if (TFE == 0) {redD.push(4)} else {blackD.push(4)};
  if (TFF == 0) {redD.push(5)} else {blackD.push(5)};
  if (TFD == 0 && TFG ==0) {redD.push(6)} else {blackD.push(6)};
  if (TFE == 0) {redD.push(7)} else {blackD.push(7)};
  if (TFF == 0) {redD.push(8)} else {blackD.push(8)};
  if (TFG == 0) {redD.push(9)} else {blackD.push(9)};
};

//wyświetlanie zadań krytycznych
function drawCP() {
  const w = 150,
        h = 75;
  
  for (let k=0, max=redT.length; k<max; k++) {
    let i = redT[k];
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(task.X[i], task.Y[i], w, h);
    ctx.strokeRect(task.X[i] + w/3, task.Y[i], w/3, h);
    ctx.strokeRect(task.X[i], task.Y[i] + h/3, w, h/3);
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'darkblue';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(task.name[i], task.X[i] + w/6, task.Y[i] + h/2);
    ctx.fillText(task.duration[i], task.X[i] + w/2, task.Y[i] + h/2); 
  }
  
  for (let j=0, max=blackT.length; j<max; j++) {
    let i = blackT[j];
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(task.X[i], task.Y[i], w, h);
    ctx.strokeRect(task.X[i] + w/3, task.Y[i], w/3, h);
    ctx.strokeRect(task.X[i], task.Y[i] + h/3, w, h/3);
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'darkblue';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(task.name[i], task.X[i] + w/6, task.Y[i] + h/2);
    ctx.fillText(task.duration[i], task.X[i] + w/2, task.Y[i] + h/2); 
  }
};

//rysowanie ralecji na ścieżce krytycznej
function drawRelCP() {
    let size = 110,
        arrowHead = size * .05;
    for (let k=0, max=redD.length; k<max; k++) {
    let i = redD[k];
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'red';
    ctx.save();
    ctx.translate(dependencies.X[i], dependencies.Y[i]);
    ctx.rotate(dependencies.direction[i] * Math.PI / 180);
    ctx.translate(-dependencies.X[i], -dependencies.Y[i]);
    ctx.moveTo(dependencies.X[i], dependencies.Y[i]);
    ctx.lineTo(dependencies.X[i] + size, dependencies.Y[i]);
    ctx.lineTo(dependencies.X[i] + size - arrowHead, dependencies.Y[i] - arrowHead);
    ctx.moveTo(dependencies.X[i] + size, dependencies.Y[i]);
    ctx.lineTo(dependencies.X[i] + size - arrowHead, dependencies.Y[i] + arrowHead);
    if (dependencies.delay[i] == 0) {
      ctx.fillText(relType[dependencies.relation[i]], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
    else if (dependencies.delay[i] > 0) {
      ctx.fillText(relType[dependencies.relation[i]] + "+" + dependencies.delay[i], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
    else {
      ctx.fillText(relType[dependencies.relation[i]] + dependencies.delay[i], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
    ctx.stroke();
    ctx.restore();
  }
  
  for (let j=0, max=blackD.length; j<max; j++) {
    let i = blackD[j];
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'black';
    ctx.save();
    ctx.translate(dependencies.X[i], dependencies.Y[i]);
    ctx.rotate(dependencies.direction[i] * Math.PI / 180);
    ctx.translate(-dependencies.X[i], -dependencies.Y[i]);
    ctx.moveTo(dependencies.X[i], dependencies.Y[i]);
    ctx.lineTo(dependencies.X[i] + size, dependencies.Y[i]);
    ctx.lineTo(dependencies.X[i] + size - arrowHead, dependencies.Y[i] - arrowHead);
    ctx.moveTo(dependencies.X[i] + size, dependencies.Y[i]);
    ctx.lineTo(dependencies.X[i] + size - arrowHead, dependencies.Y[i] + arrowHead);
    if (dependencies.delay[i] == 0) {
      ctx.fillText(relType[dependencies.relation[i]], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
    else if (dependencies.delay[i] > 0) {
      ctx.fillText(relType[dependencies.relation[i]] + "+" + dependencies.delay[i], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
    else {
      ctx.fillText(relType[dependencies.relation[i]] + dependencies.delay[i], dependencies.X[i] + size/2, dependencies.Y[i] - 10)}
    ctx.stroke();
    ctx.restore(); 
  }
};


// Onload
window.addEventListener("load", function() {loadLangSettings(), loadDependenciesSettings(), genDuration(), genRel(), newTask(), newTask(), newRel()}, false);

// Button new
document.querySelector("#new").addEventListener("click", function() {genDuration(), genRel(), clearCnv(), newTask(), newRel(), clear()}, false);

// Button Clear
document.querySelector("#clear").addEventListener("click", function() {clearCnv(), newTask(), newRel(), clear()}, false);

// Button Check
document.querySelector('#check').addEventListener("click", function() {calc(), check()}, false);

// Button Solve
document.querySelector('#solve').addEventListener("click", function() {calc(), solve(), clearCnv(), calcCP(), drawCP(), drawRelCP()}, false);

// Button About
document.querySelector('#about').addEventListener("click", function() {
  if (document.querySelector('#info')) {
		return;
	} else {
    if (document.querySelector('#setting')) {
      document.querySelector('footer').removeChild(document.querySelector('#setting'));
    }
  const about = document.createElement('div');
  about.id = 'info';
  about.innerHTML = '<p><span class="fat">Open<span class="orange">CPM</span></span> version: 1.1.8 </p><p>Download OpenCPM source code from <a href="https://github.com/kawalec/OpenCPM">GitHub.</a></p><p>Contact: <a href="mailto:kawalec@gmail.com">kawalec@gmail.com</a></p>';
  document.querySelector("footer").appendChild(about);
  const close = document.createElement('div');
  close.id = 'close_about';
  document.querySelector("#info").appendChild(close);
  close.onclick = function () {
    const parent = document.querySelector('footer');
    parent.removeChild(about);
    };
  }
}, false);


// button Setings
document.querySelector('#settings').addEventListener("click", function() {
 if (document.querySelector('#setting')) {
	 return;
 } else {
    if (document.querySelector('#info')) {
      document.querySelector('footer').removeChild(document.querySelector('#info'));
    }
  const settings = document.createElement('div');
  settings.id = 'setting';
  settings.innerHTML = '<p><span class="fat">Language:</span><div class="flag"><label><input id="EN" class="flag_input" type="radio" name="language" value="EN" checked><img src="images/EN.png"></label></div><div class="flag"><label><input id="PL" class="flag_input" type="radio" name="language" value="PL"><img src="images/PL.png"></label></div></p><p><span class="fat">Available dependencies:</span><div class="depend"><label>FS<input type="checkbox" id="FS" name="dependencies" value="FS" disabled="disabled" checked></label></div><div class="depend"><label>SS<input type="checkbox" id="SS" name="dependencies" value="SS"></label></div><div class="depend"><label>FF<input type="checkbox" id="FF" name="dependencies" value="FF"></label></div><div class="depend"><label>SF<input type="checkbox" id="SF" name="dependencies" value="SF"></label></div></p>';
  document.querySelector('footer').appendChild(settings);
   
  const close = document.createElement('div');
  close.id = 'close_settings';
  document.querySelector('#setting').appendChild(close);
  close.onclick = function () {
    const parent = document.querySelector('footer');
    parent.removeChild(settings);
  };
   
  const save = document.createElement('div');
  save.id = 'save';
  save.innerHTML = 'Save';
  save.onclick = saveSettings;
  document.querySelector('#setting').appendChild(save);

 };
  
  // Pobieranie aktualnych wartości z tabel do checkboxów dla języka i relacji
  if (language[0] == 'EN') {
    document.querySelector('#EN').checked = true;
    document.querySelector('#PL').checked = false;
  } else if (language[0] == 'PL'){
    document.querySelector('#EN').checked = false;
    document.querySelector('#PL').checked = true;  
  }
  
  if (relType.indexOf('FS') !== -1) {
    document.querySelector('#FS').checked = true;
  } else {
    document.querySelector('#FS').checked = false;
  }
  
  if (relType.indexOf('SS') !== -1) {
    document.querySelector('#SS').checked = true;
  } else {
    document.querySelector('#SS').checked = false;
  }
  
  if (relType.indexOf('FF') !== -1) {
    document.querySelector('#FF').checked = true;
  } else {
    document.querySelector('#FF').checked = false;
  }
  
  if (relType.indexOf('SF') !== -1) {
    document.querySelector('#SF').checked = true;
  } else {
    document.querySelector('#SF').checked = false;
  }

}, false);


// Akcja na przycisku zapisz z formularza do tabeli i localstorage
function saveSettings() {
  let EN = document.querySelector('#EN').checked,
      PL = document.querySelector('#PL').checked,
      FS = document.querySelector('#FS').checked,
      SS = document.querySelector('#SS').checked,
      FF = document.querySelector('#FF').checked,
      SF = document.querySelector('#SF').checked;
  
  // Save language
  if (EN == true) {
    localStorage.setItem('language', 'EN');
    language[0] = 'EN';
  } else {
    localStorage.setItem('language', 'PL');
    language[0] = 'PL';
  }
  
  changeLanguage();
  
  
// Save dependencies
  if (FS == true) {
    localStorage.setItem('FS', 'yes');
    if (relType.indexOf('FS') == -1) {
      relType.push('FS');
    }
    
  } else {
    localStorage.setItem('FS', 'no');
    if (relType.indexOf('FS') !== -1) {
      relType.splice(relType.indexOf('FS'), 1);
    }
  }
  
  if (SS == true) {
    localStorage.setItem('SS', 'yes');
    if (relType.indexOf('SS') == -1) {
      relType.push('SS');
    }
    
  } else {
    localStorage.setItem('SS', 'no');
    if (relType.indexOf('SS') !== -1) {
      relType.splice(relType.indexOf('SS'), 1);
    }
  }
  
  if (FF == true) {
    localStorage.setItem('FF', 'yes');
    if (relType.indexOf('FF') == -1) {
      relType.push('FF');
    }
    
  } else {
    localStorage.setItem('FF', 'no');
    if (relType.indexOf('FF') !== -1) {
      relType.splice(relType.indexOf('FF'), 1);
    }
  }
  
    if (SF == true) {
    localStorage.setItem('SF', 'yes');
    if (relType.indexOf('SF') == -1) {
      relType.push('SF');
    }
    
  } else {
    localStorage.setItem('SF', 'no');
    if (relType.indexOf('SF') !== -1) {
      relType.splice(relType.indexOf('SF'), 1);
    }
  }
//  document.querySelector('footer').removeChild(document.querySelector('#setting'));
};

function changeLanguage() {
  if (language[0] == 'EN') {
    document.querySelector('#new').innerHTML = "New";
    document.querySelector('#clear').innerHTML = "Clear";
    document.querySelector('#check').innerHTML = "Check";
    document.querySelector('#solve').innerHTML = "Solve";
    let cpm = document.querySelector('#cpm');
    cpm.innerHTML = "What is CPM?";
		cpm.addEventListener('click', function() {
			window.location.href="https://en.wikipedia.org/wiki/Critical_path_method";
		}, false);
    document.querySelector('#about').innerHTML = "About OpenCPM";
    document.querySelector('#settings').innerHTML = "Settings";
		document.querySelector('footer').innerHTML = '<span id="footer_desc"><span class="fat">Open<span class="orange">CPM</span></span> is the open source online application to practice Critical Path Method.</span><span id="footer_license">Copyright © 2018 GNU GPL</span><span id="footer_author">Author: <a href="http://www.kawalec.eu">Paweł Kawalec</a></span>';
		document.querySelector('#legend').src = "images/legend_en.png";

  } else if (language[0] == 'PL') {
    document.querySelector('#new').innerHTML = "Nowy";
    document.querySelector('#clear').innerHTML = "Wyczyść";
    document.querySelector('#check').innerHTML = "Sprawdź";
    document.querySelector('#solve').innerHTML = "Rozwiąż";
    let cpm = document.querySelector('#cpm');
    cpm.innerHTML = "Czym jest CPM?";
		cpm.addEventListener('click', function() {
			window.location.href="https://pl.wikipedia.org/wiki/%C5%9Acie%C5%BCka_krytyczna";
		}, false);
    document.querySelector('#about').innerHTML = "O OpenCPM";
    document.querySelector('#settings').innerHTML = "Ustawienia";
		document.querySelector('footer').innerHTML = '<span id="footer_desc"><span class="fat">Open<span class="orange">CPM</span></span> jest darmową aplikacją online do ćwiczenia Metody Ścieżki Krytycznej.</span><span id="footer_license">Copyright © 2018 GNU GPL</span><span id="footer_author">Autor: <a href="http://www.kawalec.eu">Paweł Kawalec</a></span>';
		document.querySelector('#legend').src = "images/legend_pl.png";
  }
};


// na onload pobiera wpis w local storage i jeśli jest to ustawia odpowiedni język menu
function loadLangSettings() {
  language[0] = localStorage.getItem("language");
  changeLanguage();  
  };

// Pobieranie z Local storage do tabeli i do formularza
function loadDependenciesSettings() {

  if (localStorage.getItem("FS") == "yes") {
    if (relType.indexOf('FS') == -1) {
      relType.push('FS');
    }
  } else if (localStorage.getItem("FS") == "no"){ 
    relType.splice(relType.indexOf('FS'), 1);
  }
  
  if (localStorage.getItem("SS") == "yes") {
    if (relType.indexOf('SS') == -1) {
      relType.push('SS');
    }
  } else if (localStorage.getItem("SS") == "no"){ 
    relType.splice(relType.indexOf('SS'), 1);
  }

  if (localStorage.getItem("FF") == "yes") {
    if (relType.indexOf('FF') == -1) {
      relType.push('FF');
    }
  } else if (localStorage.getItem("FF") == "no"){ 
    relType.splice(relType.indexOf('FF'), 1);
  }
  
  if (localStorage.getItem("SF") == "yes") {
    if (relType.indexOf('SF') == -1) {
      relType.push('SF');
    }
  } else if (localStorage.getItem("SF") == "no"){ 
    relType.splice(relType.indexOf('SF'), 1);
  }
};