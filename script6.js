// Define the cost function

let fixed_area = 72 * Math.sqrt(15 ** 2 + 12 ** 2);

function cost(x, y, z) {
   let c = get_c(x);
   let b = get_b(z, c);
    	
    	if( b <=0 || y <=0 )
    		return -1.0;
    			
    	let sideCost = 2 * 0.7 / 144 * (z * (y-b) + 0.5 *(0.7*z+z)*b );
    	let frontCost = 0.7 / 144 * (x-2 * 0.1046) * z;
    	let backCost = 0.7 / 144 * (x-2 * 0.1046) * ( 0.7 * z + c);
    	
    	let bottomCost = 0.90 / 144 * (x-2 * 0.1046) * (y-2 * 0.1046);
    	let lidCost = 50.0; 
    	
    	let weldingCost = 0.18 / 6 * ( c + 0.7* z + z + y - 2*0.1046 + x - 2* 0.1046);
    	
    	return sideCost + frontCost + backCost + bottomCost + lidCost + weldingCost; 
}

function get_b(x, z){
  const c = get_c(x, z);
  return Math.sqrt(c**2 - (0.3 * z) ** 2);
}

function get_c(x, z){
  const c = get_c(x, z);
  return fixed_area / x;
}

function get_y(x, z)
    {
    	let sideArea = GetSideArea(x);
    	let c = get_c(x);
    	let b = get_b(z, c);
    	
    	if( b <= 0 )
    		return -1.0;
    	
    	let y = ( sideArea - 0.5 * (0.7 * z + z ) * b) / z + b;
    	
    	
    	return y;
    }
    
    function GetSideArea(x)
    {
    	return 202320.0 / x; 
    }

// Define the constraint function
function constraint(x, y, z) {
  const b = get_b(x, z);
  return (z * (y - b) + ((0.7 * z + z) * b) / 2) * x - 202320;
}

// Take the partial derivative of the cost function with respect to x
function dCost_dx(x, y, z) {
  const b = get_b(x, z);
  return (0.7 / 144) * (2 * (0.7 * z + (fixed_area / x)) + z - (2 * 0.1046)) + (0.9 / 144) * (y - 2 * 0.1046) - (0.18 / 6) * (fixed_area / (x ** 2));
}

// Take the partial derivative of the cost function with respect to y
function dCost_dy(x, y, z) {
  const b = get_b(x, z);
  return (0.7 / 144) * (2 * z * (1 - b)) + (0.9 / 144) * (x - 2 * 0.1046) - (0.18 / 6);
}

// Take the partial derivative of the cost function with respect to z
function dCost_dz(x, y, z) {
  const b = get_b(x, z);
  return (0.7 / 144) * (2 * ((y - b) + (0.7 + 1) * b / 2) + (x - 2 * 0.1046) * (0.7 + (fixed_area / x)) + (x - 2 * 0.1046)) + (0.18 / 6) * (0.7 + 1);
}

// Take the partial derivative of the constraint function with respect to x
function dConstraint_dx(x, y, z) {
  const b = get_b(x, z);
  return z * (y - b) + ((0.7 * z + z) * b) / 2;
}

// Take the partial derivative of the constraint function with respect to y
function dConstraint_dy(x, y, z) {
  return z;
}

// Take the partial derivative of the constraint function with respect to z
function dConstraint_dz(x, y, z) {
  const b = get_b(x, z);
  return y - b + (0.7 + 1) * b / 2;
}

// Set the partial derivatives of the cost and constraint functions equal to zero
let x = 0;
let y = 0;
let z = 0;

// Use numerical methods to solve for x, y, and z
x = -dCost_dx(x, y, z) / dConstraint_dx(x, y, z);
y = -dCost_dy(x, y, z) / dConstraint_dy(x, y, z);
z = -dCost_dz(x, y, z) / dConstraint_dz(x, y, z);

//define second derivative functions
function d2Cost_dx2(x, y, z) {
  const b = get_b(x, z);
  return (0.7 / 144) * (2*b + 0.7 ) + (0.18/6);
}

function d2Cost_dxdy(x, y, z) {
  return 0;
}

function d2Cost_dxdz(x, y, z) {
  const b = get_b(x, z);
  return (0.7/144)*(2*b + 0.7 ) + (0.18/6);
}

function d2Cost_dy2(x, y, z) {
  return (0.9/144);
}

function d2Cost_dydz(x, y, z) {
  const b = get_b(x, z);
  return (0.7 / 144) * (1 - b) + (0.18 / 6);
}

function d2Cost_dz2(x, y, z) {
  const b = get_b(x, z);
  return (0.18 / 6) * (2);
}

// Check if the solution is a minimum, maximum, or saddle point
const H = [[d2Cost_dx2(x, y, z), d2Cost_dxdy(x, y, z), d2Cost_dxdz(x, y, z)],
          [d2Cost_dxdy(x, y, z), d2Cost_dy2(x, y, z), d2Cost_dydz(x, y, z)],
          [d2Cost_dxdz(x, y, z), d2Cost_dydz(x, y, z), d2Cost_dz2(x, y, z)]];
const detH = H[0][0] * (H[1][1] * H[2][2] - H[1][2] * H[2][1]) - H[0][1] * (H[1][0] * H[2][2] - H[1][2] * H[2][0]) + H[0][2] * (H[1][0] * H[2][1] - H[1][1] * H[2][0]);

if (detH > 0) {
  console.log("Solution is a minimum: x = " + x + ", y = " + y + ", z = " + z);
} else if (detH < 0) {
  console.log("Solution is a maximum: x = " + x + ", y = " + y + ", z = " + z);
} else {
  console.log(detH);
  console.log("Solution is a saddle point: x = " + x + ", y = " + y + ", z = " + z);
}

console.log("Minimum cost: ", cost(x, y, z));
