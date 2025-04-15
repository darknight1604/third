export interface INote {
  id?: string;
  value?: string;
  note?: string;
  createdDate?: string;
  imageUrl?: string;
  imageRefPath?: string;
  date?: string;
}

export interface CreateNoteRequest extends Omit<INote, 'id'> {}

export interface IGetListNoteRequest {
  createdDateFrom?: number;
  createdDateTo?: number;
}
