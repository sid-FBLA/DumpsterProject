import java.lang.Math;
//import java.util.*;

public class DumpsterProject {

    public static void main(String[] args) {
    	double[] results = findMin();
    	double minCost = results[0];
    	double x = results[1];
    	double y = results[2];
    	double z = results[3];

    	System.out.println("Minimum Cost: " + round(minCost,2) + " " +
    						"Minimum X: " + round(x,2) + " " + 
    						"Min Y: " + round(y,2) + " " +
    						"Min Z: " + round(z,2) + " " +
    						"");
    }
    
    public static double getCost(double x, double z) {
    	
    	double c = Get_c(x);
    	double b = get_b(z, c);
    	double y = get_y(x, z);
    	
    	if( b <=0 || y <=0 )
    		return -1.0;
    			
    	double sideCost = 2 * 0.7 / 144 * (z * (y-b) + 0.5 *(0.7*z+z)*b );
    	double frontCost = 0.7 / 144 * (x-2 * 0.1046) * z;
    	double backCost = 0.7 / 144 * (x-2 * 0.1046) * ( 0.7 * z + c);
    	
    	double bottomCost = 0.90 / 144 * (x-2 * 0.1046) * (y-2 * 0.1046);
    	double lidCost = 50.0; 
    	
    	double weldingCost = 0.18 / 6 * ( c + 0.7* z + z + y - 2*0.1046 + x - 2* 0.1046);
    	
    	return sideCost + frontCost + backCost + bottomCost + lidCost + weldingCost; 
    		
    	
    }
    
    public static double fixed_area = 72 * Math.sqrt(15 * 15 + 12 * 12 );
    
    public static double Get_c(double x)
    {
    	return fixed_area / x;
    }
    
    public static double get_b(double z, double c)
    {
    	double before = c*c - 0.09 * z * z;
    	if( before <= 0 )
    		return -1.0;
    	
    	return Math.sqrt(before);
    }
    
    
    public static double get_y(double x, double z)
    {
    	double sideArea = GetSideArea(x);
    	double c = Get_c(x);
    	double b = get_b(z, c);
    	
    	if( b <= 0 )
    		return -1.0;
    	
    	double y = ( sideArea - 0.5 * (0.7 * z + z ) * b) / z + b;
    	
    	
    	return y;
    }
    
    public static double GetSideArea( double x)
    {
    	return 202320 / x; 
    }
    
    private static double round (double value, int precision) {
        int scale = (int) Math.pow(10, precision);
        return (double) Math.round(value * scale) / scale;
    }
    
    public static double[] findMin() {
    	double x;
    	double y,z;
    	double o;
    	double cost = Double.MAX_VALUE;
    	double costNew;
    	double xMin = 0, zMin= 0, yMin = 0;
 
    	for (x=0.001; x<=200; x+=0.01) {
    		for (z=1; z<=100; z+=0.01) {
    			costNew = getCost(x, z);
    			if( costNew < 0 )
    				continue; 
    			
    			if (costNew <= cost) {
    				cost = costNew;
    				xMin = x;
    				yMin = get_y(x, z);
    				zMin = z;
    				
    				System.out.println("New Minimum Cost: " + cost + " with " + round(xMin,2) + " " + round(yMin,2) + " " + round(zMin,2));
    			}
    		}
    	
    	}
    	
    	return new double[] {cost, xMin, yMin, zMin};
    }
}