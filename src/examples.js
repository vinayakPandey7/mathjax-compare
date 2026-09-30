export const EXAMPLES = {
  algebra: {
    label: 'Algebra',
    content: `<p>The quadratic formula solves \\(ax^2 + bx + c = 0\\):</p>
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
$$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$$`,
  },
  calculus: {
    label: 'Calculus',
    content: `$$\\int_0^\\infty e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}$$
$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$
$$\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$$
$$\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u$$`,
  },
  matrices: {
    label: 'Matrices',
    content: `$$A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}, \\quad
\\det A = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$$
$$\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$$`,
  },
  aligned: {
    label: 'Aligned equations',
    content: `$$\\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\\\
&= a^2 + ab + ba + b^2 \\\\
&= a^2 + 2ab + b^2
\\end{aligned}$$
$$f(x) = \\begin{cases} x^2 & \\text{if } x \\ge 0 \\\\ -x & \\text{if } x < 0 \\end{cases}$$`,
  },
  chemistry: {
    label: 'Chemistry (mhchem)',
    content: `$$\\ce{2H2 + O2 -> 2H2O}$$
$$\\ce{N2 + 3H2 <=> 2NH3}$$
$$\\ce{Ba^2+ + SO4^2- -> BaSO4 v}$$
$$\\ce{CaCO3 ->[\\Delta] CaO + CO2 ^}$$
<p>Units: \\(\\pu{123 kJ/mol}\\)</p>`,
  },
  text: {
    label: 'Text + inline math',
    content: `<h3>Pythagoras' theorem</h3>
<p>In a right triangle with legs $a$ and $b$ and hypotenuse $c$, we have $a^2 + b^2 = c^2$.
For example, if $a = 3$ and $b = 4$ then $c = \\sqrt{3^2 + 4^2} = 5$.</p>
<p>A price of \\$5 stays as text because the dollar sign is escaped.</p>`,
  },
  long: {
    label: 'Long equation',
    content: `<p>A long inline expression: \\((x_1 + x_2 + x_3 + x_4 + x_5 + x_6 + x_7 + x_8 + x_9 + x_{10} + x_{11} + x_{12} + x_{13} + x_{14} + x_{15})^2\\)</p>
$$f(x) = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + a_4 x^4 + a_5 x^5 + a_6 x^6 + a_7 x^7 + a_8 x^8 + a_9 x^9 + a_{10} x^{10} + a_{11} x^{11}$$`,
  },
  mathml: {
    label: 'MathML',
    content: `<math display="block">
  <mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup>
</math>
<math display="block">
  <mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>-</mo><mi>x</mi></mrow></msup></mrow></mfrac>
</math>`,
  },
};
