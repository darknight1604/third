import {
  addDoc,
  collection,
  doc,
  firebase,
} from '@react-native-firebase/firestore';
import {showSnackbar} from '@third/components/global-snackbar/GlobalSnackbarService';
import CreateNoteRequest from '@third/models/note';
import {uploadImage} from './fileUploader';
import dayjs from 'dayjs';

const db = firebase.firestore();

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
    // Step 1: Point to the document 'dev' inside 'third'
    const thirdDevDocRef = doc(db, 'third', 'dev');

    // Step 2: Then, point to 'note' collection under that doc
    const noteCollectionRef = collection(thirdDevDocRef, 'note');

    addDoc(noteCollectionRef, {
      ...params,
      createdDateMiliseconds: dayjs(params.createdDate).valueOf(),
    }).then(() => {
      showSnackbar('Your request has been successfully');
      onPost?.();
    });
  } catch (error) {
    console.error('Firebase error:', error);
    showSnackbar('Your request has been failed');
  }
};
