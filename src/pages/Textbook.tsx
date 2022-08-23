/**
 * Textbook have 2 conditions:
 * auth and not auth => get this flag from userSlice
 * Components: 
 * 1. Header
 * 2. Footer
 * 3. WordCard
 * 4. 
 *
 */

import { useAppSelector } from '../hooks/storeHooks';

export default function Textbook() {
  const isAuth = useAppSelector((store) => store.user.isAuth);
  return <div>{isAuth ? <div>Textbook true</div> : <div>Textbook false</div>}</div>;
}
