/******
 *
 * THIS FILE IS WIP - DO NOT USE
 *
 ******/

/**
 * converts a hex colour string to an RGBA tuple
 * @param  {string} color hex colour of the form '#ff00ff' or '#f0f'
 * @return {array}       a tuple containing the RGBA values, A will always be 1
 */
const parseHex = (color) => {  
  if (typeof color === 'function') color = color();
  const parts = color.charAt(0) === '#' ? color.substring(1) : color;
  const len = parts.length;
  const pairLength = len / 3;
  const re = new RegExp(`(.{${pairLength}})`, 'g');
  return parts
    .match(re)
    .map( v => parseInt(v.length === 1 ? v+v : v, 16) )
    .concat(1);
};

const pad2 = str => str.length < 2 ? pad2('0' + str) : str;

const toHex = (tuple) => {
  let temp = tuple.slice();
  let alpha = temp.pop();
  temp = temp.map( v => ~~v );
  // console.log('toHex', tuple, temp, alpha);
  if (alpha < 1) {
    return `rgba(${temp[0]}, ${temp[1]}, ${temp[2]}, ${alpha})`;
  }

  return '#' + temp
    .map(v => pad2(v.toString(16)))
    .join('')    
};

const mixColor = (a, b, amount) => {
  let tupleA = parseHex(a);
  let tupleB = parseHex(b);
  
  // console.log('mixColor', tupleA, tupleB, amount);
  // console.log(toHex(tupleA.map( (val, idx) => (val * (1-amount)) + (tupleB[idx] * amount) )));
  // REMOVEME:
  // 
  // Force alpha down a little so we get an rgba() conversion
  tupleB[3] = 0.9;
  tupleA[3] = 0.9;
  // 
  return toHex(
    tupleA.map( (val, idx) => (val * (1-amount)) + (tupleB[idx] * amount) )
  );
};

const get = (themeProp) => props => props.theme[themeProp];
const darken = (themeProp, amount) => props => mixColor(props.theme[themeProp], '#000', amount);
const lighten = (themeProp, amount) => props => mixColor(props.theme[themeProp], '#fff', amount);

const mix = (aProp, bProp, amount) => props => mixColor(theme(aProp), theme(bProp), amount);

export default {
  get,
  mix,
  darken,
  lighten
};