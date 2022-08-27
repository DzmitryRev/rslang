/**
 * Textbook have 2 conditions:
 * auth and not auth => get this flag from userSlice
 * Components:
 * 1. Header +
 * 2. Footer +
 * 3. WordCard +
 * 4. PetalButton +
 * 5. PrimaryButton +
 *
 */

/**
 * TODO:
 * 1. pagination
 * 2. usersWords
 * 3. logic for displaying difficult and learned words
 */

import axios from 'axios';
import { useEffect } from 'react';

import { API } from '../api/api';

import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { getWords, Groups, setGroup } from '../store/slices/textbookSlice';

export default function Textbook() {
  const dispach = useAppDispatch();

  //   API.signin({
  //     email: 'reer@mail.ru',
  //     password: '12345678',
  //   }).then(res => console.log(res));

  // auth flag
  const isAuth = useAppSelector((store) => store.user.isAuth);

  // userId
  const userId = useAppSelector((store) => store.user.userId);

  // token
  const token = useAppSelector((store) => store.user.token);

  // words
  const words = useAppSelector((store) => store.textbook.words);

  //current group
  const group = useAppSelector((store) => store.textbook.group);

  // current page
  const page = useAppSelector((store) => store.textbook.page);

  //   API.getUser(userId, token).then((res) => {
  //     console.log(res);
  //   });

  //   axios
  //     .get(`http://localhost:8080/users/${userId}/words`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  API.getUserWords(userId, token).then((res) => {
    console.log(res);
  });
  // reload on change group or page
  useEffect(() => {
    dispach(getWords({ page, group }));
  }, [group, page, dispach]);

  const availableGroups = Object.values(Groups).filter((item) => !isNaN(+item)) as number[];

  return (
    <div>
      {availableGroups.map((group) => {
        return (
          <div
            onClick={() => {
              dispach(setGroup(group));
            }}
            key={group}
          >
            {Groups[group]}
          </div>
        );
      })}
      {/* если isAuth то показываем кнопку сложные слова */}
      {words.map((word) => {
        /**
         * if(userWord.id === item.id)
         * difficult = item.difficult
         * AllInGames = item.opt.allinGames
         * trueInGames = item.opt.trueIngames
         * learned = item.opt.learned
         */
        return (
          //    если isAuth то отправляем флаг isAuth === true
          <div key={word.id}>
            {word.word} === {word.transcription} === {word.wordTranslate}
          </div>
        );
      })}
    </div>
  );
}
