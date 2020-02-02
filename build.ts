import s from 'shelljs';
import './tsconfig.json';
const outDir = 'dist';

// s.rm('-rf', 'node_modules');
s.rm('-rf', outDir);
// s.mkdir(outDir);
