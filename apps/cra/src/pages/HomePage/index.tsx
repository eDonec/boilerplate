import { useLocation } from 'react-router-dom';

import { Button } from 'core-ui';

import { useAppSelector, useLoadingDispatch } from 'hooks/reduxHooks';

import { decrementCounter, incrementCounter } from '_redux/slices/counter';
import { setCounterAsync } from '_redux/slices/counter/thunk';

const HomePage = () => {
  const count = useAppSelector((state) => state.counter.count);
  const { isLoading, dispatch, classicDispatch } = useLoadingDispatch();

  const increment = () => {
    classicDispatch(incrementCounter());
  };

  const decrement = () => {
    classicDispatch(decrementCounter());
  };

  const setAsync = () => {
    dispatch(setCounterAsync(300));
  };

  useLocation();

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='mb-4'>CRA + Tailwind CSS + TypeScript + Redux Tookit</h1>

      <h2 className='my-3'>Redux Counter : {count}</h2>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Button disabled={count === 0 || isLoading} onClick={decrement}>
            Decrement
          </Button>
          <Button disabled={isLoading} onClick={increment}>
            Increment
          </Button>
        </div>
        <Button onClick={setAsync} isLoading={isLoading}>
          Set Counter to 300 Async
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
