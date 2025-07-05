import { ArrowFunction } from './ArrowFunction';
import ClassDefault from './ClassDefault';
import { ClassNamed } from './ClassNamed';
import FunctionDefault from './FunctionDefault';
import { FunctionNamed } from './FunctionNamed';

function App() {
  return (
    <div>
      <ClassDefault />
      <ClassNamed />
      <FunctionDefault />
      <FunctionNamed />
      <ArrowFunction />
    </div>
  );
}

export default App;
