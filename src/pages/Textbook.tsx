/**
 * Textbook have 2 conditions:
 * auth and not auth => get this flag from userSlice
 *
 *
 */

import { useAppSelector } from '../hooks/storeHooks';

export default function Textbook() {
  const isAuth = useAppSelector((store) => store.user.isAuth);
  return <div>{isAuth ? <div>Textbook true</div> : <div>Textbook false</div>}</div>;
}
