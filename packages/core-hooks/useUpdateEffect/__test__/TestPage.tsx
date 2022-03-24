import { useState } from 'react';

import useUpdateEffect from '../index';

const TestPage = () => {
  const [didUpdate, setDidUpdate] = useState(false);
  const [counter, setCounter] = useState(0);

  useUpdateEffect(() => {
    setDidUpdate(true);
  }, [counter]);

  return (
    <div>
      {didUpdate && <span>Updated</span>}
      <button onClick={() => setCounter(1)}>update</button>
    </div>
  );
};

export default TestPage;
