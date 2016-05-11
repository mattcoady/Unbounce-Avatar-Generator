var myC = document.getElementsByTagName('canvas')[0];
var ctx = myC.getContext('2d');
//noinspection JSUnresolvedVariable
var DOMURL = window.URL || window.webkitURL || window;

function mkElm(elm, attr, text, append){
  var thisElm = document.createElement(elm);

  if(typeof elm !== 'string'){
    console.error('First item must be element'); return;
  }

  if(typeof attr === 'string'){
    append = text;
    text = attr;
    attr = null;
  }
  if(typeof attr !== 'undefined' && attr !== null) {
    for (var i = 0; i < attr.length; i++) {
      thisElm.setAttribute(attr[i][0], attr[i][1]);
    }
  }
  if(typeof text !== 'undefined' && text !== null){
    thisElm.innerText = text;
  }
  if(typeof append !== 'undefined' && append !== null){
    for(var i = 0; i < append.length; i++){
      thisElm.appendChild(append[i]);
    }
  }

  return thisElm;
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var deftF = {
  'male': {
    'head':        { 'color': '#f0c7b1',     'type': 0},
    'hair':        { 'color': '#000000',     'type': 0},
    'bangs':       { 'color': '#000000',     'type': 0},
    'accessories': { 'color': '#000000',     'type': 0},
    'cheeks':      { 'color': '#ffc0c0',     'type': 0},
    'facial':      { 'color': '#000000',     'type': 0},
    'pupil':       { 'color': '#000000',     'type': 0},
    'mouth':       { 'color': '#ffffff',     'type': 0},
    'eyes':        { 'color': '#ffffff',     'type': 0},
    'lips':        { 'color': '#000000',     'type': 0},
    'nose':        { 'color': '#000000',     'type': 0},
    'skin':        { 'color': '#f0c7b1',     'type': 0}
  },

  'female': {
    'head':        { 'color': '#f0c7b1',     'type': 0},
    'hair':        { 'color': '#000000',     'type': 0},
    'bangs':       { 'color': '#000000',     'type': 0},
    'accessories': { 'color': '#000000',     'type': 0},
    'cheeks':      { 'color': '#ffc0c0',     'type': 0},
    'facial':      { 'color': 'transparent', 'type': 0},
    'pupil':       { 'color': '#6CDF85',     'type': 0},
    'mouth':       { 'color': '#ffffff',     'type': 0},
    'eyes':        { 'color': '#000000',     'type': 0},
    'lips':        { 'color': '#000000',     'type': 0},
    'nose':        { 'color': '#000000',     'type': 0},
    'skin':        { 'color': '#f0c7b1',     'type': 0}
  },

  'genders': [
    'male',
    'female'
  ],

  'current': 'male'
};

var tF = deftF;

var dropDowns = {
  "male": [
    { "label": "Hair",        "options": ["1", "2", "3", "4", "5", "6"] },
    { "label": "Eyes",        "options": ["1", "2", "3", "4", "5", "6", "7"] },
    { "label": "Mouth",       "options": ["1", "2", "3"] },
    { "label": "Nose",        "options": ["1", "2", "3"] },
    { "label": "Cheeks",      "options": ["none", "1", "2", "3"] },
    { "label": "Accessories", "options": ["none", "1"] },
    { "label": "Facial",      "options": ["none", "1"] }
  ],
  "female": [
    { "label": "Hair",        "options": ["1", "2", "3", "4", "5", "6"] },
    { "label": "Bangs",       "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
    { "label": "Eyes",        "options": ["1", "2", "3", "4", "5", "6", "7"] },
    { "label": "Mouth",       "options": ["1", "2", "3"] },
    { "label": "Nose",        "options": ["1", "2", "3"] },
    { "label": "Cheeks",      "options": ["none", "1", "2", "3"] },
    { "label": "Accessories", "options": ["none", "1"] }
  ]
};

var colorPickers = {
  "male":
    [
      { "label": "Skin Color",  "type": "skin",   "default": deftF.male.skin.color },
      { "label": "Hair Color",  "type": "hair",   "default": deftF.male.hair.color },
      { "label": "Eyes",        "type": "eyes",   "default": deftF.male.eyes.color },
      { "label": "Pupils",      "type": "pupil",  "default": deftF.male.pupil.color },
      { "label": "Mouth",       "type": "mouth",  "default": deftF.male.mouth.color },
      { "label": "Lips",        "type": "lips",   "default": deftF.male.lips.color },
      { "label": "Cheeks",      "type": "cheeks", "default": deftF.male.cheeks.color },
      { "label": "Facial Hair", "type": "facial", "default": deftF.male.facial.color }
    ],
  "female":
    [
      { "label": "Skin Color",  "type": "skin",   "default": deftF.female.skin.color },
      { "label": "Hair Color",  "type": "hair",   "default": deftF.female.hair.color },
      { "label": "Eyes",        "type": "eyes",   "default": deftF.female.eyes.color },
      { "label": "Pupils",      "type": "pupil",  "default": deftF.female.pupil.color },
      { "label": "Mouth",       "type": "mouth",  "default": deftF.female.mouth.color },
      { "label": "Lips",        "type": "lips",   "default": deftF.female.lips.color },
      { "label": "Cheeks",      "type": "cheeks", "default": deftF.female.cheeks.color },
      { "label": "Facial Hair", "type": "facial", "default": deftF.female.facial.color }
    ]
};

function genderForm(){
  var genderCont = document.getElementsByClassName('gender')[0];
  var itemCont, label, option, header;

  header = mkElm('h2', 'Gender');

  itemCont = mkElm('form',[
    ['class','gender-form']
  ]);

  for(var i = 0; i < tF.genders.length; i++){
    option = mkElm('input', [
      ['type','radio'],
      ['id','gender-' + tF.genders[i]],
      ['name','gender'],
      ['value', tF.genders[i]]
    ]);

    if(tF.current === tF.genders[i]){
      option.setAttribute('checked','checked')
    }

    option.addEventListener('change',function(){
      setVals();
      drawHead(tF);
      ddComp(dropDowns[tF.current]);
    });

    label = mkElm('label',[
      ['for','gender-'+tF.genders[i]]
    ],tF.genders[i].capitalize());

    itemCont.appendChild(option);
    itemCont.appendChild(label);
  }

  genderCont.appendChild(header);
  genderCont.appendChild(itemCont);

}

function ddComp(dropDowns) {
  var optCont = document.getElementsByClassName('options')[0];
  var itemCont, label, select, option, header;

  jQuery(optCont).empty();

  header = mkElm('h2', 'Options');
  optCont.appendChild(header);

  for(var i = 0; i < dropDowns.length; i++){
    var dd = dropDowns[i];

    label = mkElm('label',[['for','select-' + dd.label.toLowerCase()]], dd.label, null);
    select = mkElm('select',[['name',dd.label.toLowerCase()], ['id','select-' + dd.label.toLowerCase()]], null, null);
    select.addEventListener('change',function () {
      setVals();
      drawHead(tF);
    });
    itemCont = mkElm('div',[['class','item-container']], null, [label, select]);

    for(var x = 0; x < dd.options.length; x++){
      option = mkElm('option',[['value', x.toString()]], dd.options[x], null);
      select.appendChild(option);
    }

    optCont.appendChild(itemCont);

  }
}

function colorComp(colorPickers){
  var itemCont, label, input, cP, header;


  //header = document.createElement('h2');
  //header.innerHTML = 'Color';
  //cComp.appendChild(header);

  header = mkElm('h2',[['class','header']],'Color');

  var cComp = document.getElementsByClassName('colors')[0];
  jQuery(cComp).empty();
  cComp.appendChild(header);


  for(var i = 0; i < colorPickers[tF.current].length; i++){
    cP = colorPickers[tF.current][i];

    itemCont = document.createElement('div');
    itemCont.className = 'item-container';

    label = document.createElement('label');
    label.setAttribute('for','picker-' + cP.type);
    label.innerText = cP.label;

    input = document.createElement('input');
    input.setAttribute('type','text');
    input.id = 'picker-' + cP.type;
    input.setAttribute('data-type',cP.type);

    itemCont.appendChild(label);
    itemCont.appendChild(input);
    cComp.appendChild(itemCont);

    $('#picker-' + cP.type).spectrum({
      color: cP.default,
      move: function(){}
    }).on('move.spectrum', function(e, color) {
      //debugger;
      tF[tF.current][e.target.getAttribute('data-type')].color = color.toHexString();
      drawHead(tF);
    });


  }
}

function initUI(){
  genderForm();
  ddComp(dropDowns[tF.current]);
  colorComp(colorPickers);
}

function setVals(){
  tF.current = jQuery('input:checked', '.gender-form').val();
  tF[tF.current].accessories.type = parseInt($('#select-accessories').val());
  tF[tF.current].cheeks.type      = parseInt($('#select-cheeks').val());
  tF[tF.current].facial.type      = parseInt($('#select-facial').val());
  tF[tF.current].mouth.type       = parseInt($('#select-mouth').val());
  tF[tF.current].hair.type        = parseInt($('#select-hair').val());
  tF[tF.current].bangs.type        = parseInt($('#select-bangs').val());
  tF[tF.current].eyes.type        = parseInt($('#select-eyes').val());
  tF[tF.current].lips.type        = parseInt($('#select-lips').val());
  tF[tF.current].nose.type        = parseInt($('#select-nose').val());
}

function drawHead (tF) {
  document.getElementsByClassName('svg-container')[0].innerHTML = getFace(tF);

  ctx.clearRect(0, 0, myC.width, myC.height);
  var head = new Image();
  var svg = new Blob([getFace(tF)], {type: 'image/svg+xml;charset=utf-8'});
  //noinspection JSUnresolvedFunction
  var url = DOMURL.createObjectURL(svg);

  head.onload = function () {
    ctx.drawImage(head, 0, 0);
    //noinspection JSUnresolvedFunction
    DOMURL.revokeObjectURL(url);
  };

  head.src = url;
}

var button = document.getElementById('btn-download');
button.addEventListener('click', function () {

  //head.src = url;
  button.href = myC.toDataURL('image/png');

});




drawHead(tF);
initUI();