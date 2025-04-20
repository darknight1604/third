import {
  addDoc,
  collection,
  doc,
  firebase,
  getDocs,
  query,
  where,
} from '@react-native-firebase/firestore';
import {IGetListNoteRequest, INote} from '@third/models/note';
import {IReposioty} from '@third/repositories/iRepository';

const db = firebase.firestore();

class RemoteRepository implements IReposioty<INote> {
  private static instance: RemoteRepository;

  private constructor() {}

  async getList(params: IGetListNoteRequest): Promise<INote[]> {
    const noteCollectionRef = this.getCollection();

    const q = query(
      noteCollectionRef,
      where('createdDate', '>=', params.createdDateFrom),
      where('createdDate', '<=', params.createdDateTo),
    );
    const result: INote[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(document => {
      result.push({...document.data(), id: document.id});
    });

    return result;
  }

  static getInstance(): RemoteRepository {
    if (!RemoteRepository.instance) {
      RemoteRepository.instance = new RemoteRepository();
    }
    return RemoteRepository.instance;
  }

  async save(params: unknown, onPost?: () => void) {
    const noteCollectionRef = this.getCollection();
    await addDoc(noteCollectionRef, params);

    onPost?.();
    return;
  }

  getCollection = () => {
    // Step 1: Point to the document 'dev' inside 'third'
    const thirdDevDocRef = doc(db, 'third', 'dev');

    // Step 2: Then, point to 'note' collection under that doc
    return collection(thirdDevDocRef, 'note');
  };
}

export default RemoteRepository;
