import { useEffect, useState } from 'react';
import { EXAMPLES } from './examples.js';
import { decodeContent, encodeContent } from './share.js';

const DEFAULT = `<p>Inline: \\(E = mc^2\\) and $a^2 + b^2 = c^2$</p>
<p>Display:</p>
$$\\int_0^\\infty e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}$$
\\[\\ce{H2O} \\quad \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\]`;

const inline = [['$', '$'], ['\\(', '\\)']];
const display = [['$$', '$$'], ['\\[', '\\]']];

const VERSIONS = {
  'MathJax 2.7.9': `
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: { inlineMath: ${JSON.stringify(inline)}, displayMath: ${JSON.stringify(display)}, processEscapes: true },
    TeX: { extensions: ["mhchem.js"] }
  });
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@2.7.9/MathJax.js?config=TeX-MML-AM_CHTML"></script>`,
  'MathJax 3.2.2': `
<script>
  window.MathJax = {
    loader: { load: ['[tex]/mhchem'] },
    tex: { inlineMath: ${JSON.stringify(inline)}, displayMath: ${JSON.stringify(display)}, processEscapes: true, packages: { '[+]': ['mhchem'] } }
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js"></script>`,
  'MathJax 4.1.3': `
<script>
  window.MathJax = {
    loader: { load: ['[tex]/mhchem'] },
    tex: { inlineMath: ${JSON.stringify(inline)}, displayMath: ${JSON.stringify(display)}, processEscapes: true, packages: { '[+]': ['mhchem'] } }
  };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@4.1.3/tex-mml-chtml.js"></script>`,
};

const buildDoc = (head, content) => `<!doctype html><html><head><meta charset="utf-8">
<style>body{font-family:sans-serif;padding:12px;margin:0}</style>${head}</head>
<body>${content}</body></html>`;

async function readHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  const example = EXAMPLES[params.get('example')];
  const shared = params.get('c');
  if (!example && !shared) return null;
  history.replaceState(null, '', location.pathname + location.search);
  return example ? example.content : decodeContent(shared);
}

export default function App() {
  const [text, setText] = useState(() => localStorage.getItem('mj-content') ?? DEFAULT);
  const [content, setContent] = useState(text);
  const [copied, setCopied] = useState(false);

  const load = (value) => {
    setText(value);
    setContent(value);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setContent(text);
      localStorage.setItem('mj-content', text);
    }, 500);
    return () => clearTimeout(t);
  }, [text]);

  useEffect(() => {
    const onHash = () =>
      readHash()
        .then((value) => value != null && load(value))
        .catch(() => {});
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const share = async () => {
    const url = `${location.origin}${location.pathname}#c=${await encodeContent(text)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <>
      <div className="toolbar">
        <span id="examples-label" className="toolbar-label">
          Examples:
        </span>
        <div role="group" aria-labelledby="examples-label" className="examples">
          {Object.entries(EXAMPLES).map(([key, example]) => (
            <button type="button" key={key} onClick={() => load(example.content)}>
              {example.label}
            </button>
          ))}
        </div>
        <button type="button" className="share" onClick={share} aria-live="polite">
          {copied ? 'Link copied!' : 'Copy share link'}
        </button>
      </div>
      <label htmlFor="editor" className="editor-label">
        Your LaTeX / MathML / HTML content
      </label>
      <textarea
        id="editor"
        className="editor"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste HTML / LaTeX content"
        spellCheck={false}
      />
      <div className="previews">
        {Object.entries(VERSIONS).map(([name, head]) => (
          <figure key={name} className="preview">
            <figcaption>{name}</figcaption>
            <iframe title={`${name} rendering preview`} srcDoc={buildDoc(head, content)} loading="lazy" />
          </figure>
        ))}
      </div>
    </>
  );
}
