import { atom, AtomEffect } from 'recoil';

export default function createState<ValueType>({
  key,
  defaultValue,
  effects,
}: {
  key: string;
  defaultValue: ValueType;
  effects?: ReadonlyArray<AtomEffect<ValueType>>;
}) {
  const recoilState = atom<ValueType>({
    key,
    default: defaultValue,
    effects,
  });
  return recoilState;
};
