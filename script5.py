from scipy.optimize import minimize, NonlinearConstraint
import numpy as np

def F(X):
    x, y, z = X
    b = ((((72*(15**2+12**2)**0.5)/x)**2 - (0.3*z)**2) ** 0.5);
    c = 72 * (15 ** 2 + 12 ** 2) ** 0.5 / x
    return (0.7 / 144) * (2 * ((z * (y - b)) + (b * (0.7 * z + z)) / 2) + (x - 2 * 0.1046)
    * (0.7 * z + (72 * (15 ** 2 + 12 ** 2) ** 0.5) / x) + (x - 2 * 0.1046) * z) + (0.9 / 144) * ((x - 2 * 0.1046)
    * (y - 2 * 0.1046)) + (0.18 / 6) * (c + 0.7 * z) + (0.18 / 6) * (z) + (0.18 / 6) * (y - 2 * 0.1046 + x - 2 * 0.1046) + 50

def constraint(X):
    x, y, z = X
    b = ((((72*(15**2+12**2)**0.5)/x)**2 - (0.3*z)**2) ** 0.5);
    return (z * (y - b) + ((0.7 * z + z) * b) / 2) * x - 202320

def test(x, y, z):
    b = ((((72*(15**2+12**2)**0.5)/x)**2 - (0.3*z)**2) ** 0.5);
    c = 72 * (15 ** 2 + 12 ** 2) ** 0.5 / x;
    return (0.7 / 144) * (2 * ((z * (y - b)) + (b * (0.7 * z + z)) / 2) + (x - 2 * 0.1046)
    * (0.7 * z + (72 * (15 ** 2 + 12 ** 2) ** 0.5) / x) + (x - 2 * 0.1046) * z) + (0.9 / 144) * ((x - 2 * 0.1046)
    * (y - 2 * 0.1046)) + (0.18 / 6) * (c + 0.7 * z) + (0.18 / 6) * (z) + (0.18 / 6) * (y - 2 * 0.1046 + x - 2 * 0.1046) + 50

initial_guess = [72, 58, 50]

constraint = NonlinearConstraint(constraint, 0, 0)

solution = minimize(F, initial_guess, constraints=[constraint])

print(test(72, 58, 50));
print(solution)
