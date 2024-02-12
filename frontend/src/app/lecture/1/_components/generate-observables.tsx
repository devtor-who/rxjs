'use client';
import { ComponentProps, useEffect, useState } from 'react';
import { Observable, from, fromEvent, generate, interval, of, range, timer } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';

export function GenerateObservables() {
  return (
    <>
      {/* 배열 스트림 */}
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

      {/* 시간 스트림 */}
      <ObservableComponent
        obs={interval(10000)}
        lable="interval(10000)로 생성하기"
        description={`10초에 한 번씩 실행되는 observable`}
      />
      <ObservableComponent
        obs={timer(3000)}
        lable="timer(3000)로 생성하기"
        description={`3초 뒤에 한 번만 실행되는 observable`}
      />

      {/* 이벤트 스트림 */}
      <EventObservableComponent
        obs={fromEvent(document, 'click')}
        lable="fromEvent(document, 'click')로 생성하기"
        description={`DOM 이벤트로 스트림 생성`}
      />

      {/* Ajax 스트림 */}
      <AjaxObservableComponent
        obs={ajax('http://localhost:3030/people/1')}
        lable="ajax('http://localhost:3030/people/1')로 생성하기"
        description={`ajax 통신으로 스트림 생성`}
      />

      {/* 직접 만드는 스트림 */}
      <ObservableComponent
        obs={
          new Observable((subscriber) => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            // 값을 다 발행한 뒤에는 compelte를 실행하여 메모리 해제
            subscriber.complete();
          })
        }
        lable="new Observable()로 생성하기"
        description={`직접 만드는 observable`}
      />
    </>
  );
}

type ObservableComponentProps = Readonly<
  ComponentProps<'div'> & {
    obs: Observable<number>; //
    lable: string;
    description?: string;
  }
>;

type EventObservableComponentProps = Readonly<
  ComponentProps<'div'> & {
    obs: Observable<Event>; //
    lable: string;
    description?: string;
  }
>;

type AjaxObservableComponentProps = Readonly<
  ComponentProps<'div'> & {
    obs: Observable<AjaxResponse<any>>; //
    lable: string;
    description?: string;
  }
>;

function ObservableComponent({ obs, lable, description }: ObservableComponentProps) {
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

function EventObservableComponent({ obs, lable, description }: EventObservableComponentProps) {
  const [ofObservable, setOfObservable] = useState<Event[]>([]);

  useEffect(() => {
    obs.subscribe((item) => setOfObservable((prev) => [...prev, item]));
  }, []);

  return (
    <div className="w-full flex flex-col items-start mb-12">
      <span className="text-2xl">{lable}</span>
      <pre className="my-2 bg-slate-800">{description}</pre>
      <div className="flex gap-x-2 text-sm">
        {ofObservable.map((value, i) => (
          <div key={i}>{value.timeStamp}</div>
        ))}
      </div>
    </div>
  );
}

function AjaxObservableComponent({ obs, lable, description }: AjaxObservableComponentProps) {
  const [ofObservable, setOfObservable] = useState<AjaxResponse<any>[]>([]);

  useEffect(() => {
    obs.subscribe((item) => setOfObservable((prev) => [...prev, item]));
  }, []);

  return (
    <div className="w-full flex flex-col items-start mb-12">
      <span className="text-2xl">{lable}</span>
      <pre className="my-2 bg-slate-800">{description}</pre>
      <div className="flex gap-x-2 text-sm">
        {ofObservable.map((value, i) => (
          <div key={i}>{JSON.stringify(value.response)}</div>
        ))}
      </div>
    </div>
  );
}
