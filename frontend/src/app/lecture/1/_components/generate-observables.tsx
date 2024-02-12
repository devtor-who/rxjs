'use client';
import { ComponentProps, useEffect, useState } from 'react';
import { Observable, from, generate, of, range } from 'rxjs';

export function GenerateObservables() {
  return (
    <>
      <ObservableComponent obs={of(1, 2, 3, 4, 5)} lable="of(1, 2, 3, 4, 5)로 생성하기" />
      <ObservableComponent obs={from([6, 7, 8, 9, 10])} lable="from([6, 7, 8, 9, 10])로 생성하기" />
      <ObservableComponent obs={range(11, 5)} lable="range(11, 5)로 생성하기" />
      <ObservableComponent
        obs={generate({
          initialState: 0,
          condition: (x) => x < 30,
          iterate: (x) => x + 2,
        })}
        lable="generate()로 생성하기"
        description={`
  generate(15, x => x < 30, x => x + 2)와 같은 방식은 deprecated됨
  generate({ initialState: 0, condition: (x) => x < 30, iterate: (x) => x + 2 })와 같이 사용해야함
        `}
      />
    </>
  );
}

function ObservableComponent({
  obs, //
  lable,
  description,
}: Readonly<ComponentProps<'div'> & { obs: Observable<number>; lable: string; description?: string }>) {
  const [ofObservable, setOfObservable] = useState<number[]>([]);

  useEffect(() => {
    obs.subscribe((item) => setOfObservable((prev) => [...prev, item]));
  }, []);

  return (
    <div className="w-full flex flex-col items-start mb-12">
      <span className="text-2xl">{lable}</span>
      <pre className="my-2 bg-slate-800">{description}</pre>
      <div className="flex gap-x-2 text-sm">
        {ofObservable.map((value, i) => (
          <div key={i}>{value}</div>
        ))}
      </div>
    </div>
  );
}
