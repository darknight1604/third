import {
  addDoc,
  collection,
  doc,
  firebase,
  getDocs,
  query,
  where,
} from '@react-native-firebase/firestore';
import {showSnackbar} from '@third/components/global-snackbar/GlobalSnackbarService';
import {DATE_TIME_FORMAT, DURATION_FETCH_NOTE} from '@third/constants';
import {
  CreateNoteRequest,
  IGetListNoteRequest,
  INote,
} from '@third/models/note';
import dayjs from 'dayjs';
import {uploadImage} from './fileUploader';

const listNote: INote[] = [];
let fetchTime: dayjs.Dayjs | undefined;
const db = firebase.firestore();

export const getListNote = async (queryParams: IGetListNoteRequest) => {
  if (fetchTime) {
    const now = dayjs();
    const diffInMinutes = now.diff(fetchTime, 'minute');
    if (diffInMinutes < DURATION_FETCH_NOTE) {
      return listNote;
    }
  }
  if (!queryParams.createdDateFrom || !queryParams.createdDateTo) {
    return listNote;
  }
  const noteCollectionRef = getCollection();

  const q = query(
    noteCollectionRef,
    where('createdDate', '>=', queryParams.createdDateFrom),
    where('createdDate', '<=', queryParams.createdDateTo),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(document => {
    listNote.push({...document.data(), id: document.id});
  });

  fetchTime = dayjs();
  return listNote;
};

// If exist imageUrl, upload image then get image url create note. Otherwise, only create note
export const createNote = (params: CreateNoteRequest, onPost?: () => void) => {
  try {
    if (params.imageUrl) {
      uploadImage(params.imageUrl, (publicUrl, refPath) => {
        if (!publicUrl) {
          return;
        }
        postNote(
          {...params, imageUrl: publicUrl, imageRefPath: refPath},
          onPost,
        );
      });
      return;
    }

    postNote(params, onPost);
    return;
  } catch (error) {
    console.error('Firebase error:', error);
    showSnackbar('Your request has been failed');
  }
};

// Just simple create note document with params
const postNote = (params: CreateNoteRequest, onPost?: () => void) => {
  try {
    const noteCollectionRef = getCollection();
    const createdDate = dayjs(params.createdDate);

    addDoc(noteCollectionRef, {
      ...params,
      date: createdDate.format(DATE_TIME_FORMAT.DATE),
      createdDate: createdDate.valueOf(),
    }).then(() => {
      showSnackbar('Your request has been successfully');
      onPost?.();
    });
  } catch (error) {
    console.error('Firebase error:', error);
    showSnackbar('Your request has been failed');
  }
};

const getCollection = () => {
  // Step 1: Point to the document 'dev' inside 'third'
  const thirdDevDocRef = doc(db, 'third', 'dev');

  // Step 2: Then, point to 'note' collection under that doc
  return collection(thirdDevDocRef, 'note');
};
