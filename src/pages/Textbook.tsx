/**
 * Textbook have 2 conditions:
 * auth and not auth => get this flag from userSlice
 *
 *
 */

import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../store/store';

const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Textbook() {
  const isAuth = AppUseSelector((store) => store.user.isAuth);
  return <div>{isAuth ? <div>Textbook true</div> : <div>Textbook false</div>}</div>;
}
