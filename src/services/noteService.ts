import {
  addDoc,
  collection,
  doc,
  firebase,
} from '@react-native-firebase/firestore';
import {showSnackbar} from '@third/components/global-snackbar/GlobalSnackbarService';
import CreateNoteRequest from '@third/models/note';

const db = firebase.firestore();

export const createNote = (params: CreateNoteRequest, onPost?: () => void) => {
  try {
    // Step 1: Point to the document 'dev' inside 'third'
    const thirdDevDocRef = doc(db, 'third', 'dev');

    // Step 2: Then, point to 'note' collection under that doc
    const noteCollectionRef = collection(thirdDevDocRef, 'note');

    addDoc(noteCollectionRef, params).then(() => {
      showSnackbar('Your request has been successfully');
      onPost?.();
    });
  } catch (error) {
    console.error('Firebase error:', error);
    showSnackbar('Your request has been failed');
  }
};
