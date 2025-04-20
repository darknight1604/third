export interface INote {
  id?: string;
  value?: string;
  note?: string;
  createdDate?: string;
  imageUrl?: string;
  imageRefPath?: string;
  date?: string;
  isLocal?: boolean;
}

export interface CreateNoteRequest extends Omit<INote, 'id'> {}

export interface IGetListNoteRequest {
  createdDateFrom?: number;
  createdDateTo?: number;
}

export interface INoteValueByDate {
  date: string;
  notes: INote[];
}

export interface IChartDataByMonth {
  datas?: INoteValueByDate[];
  month?: number;
}
export interface IGetChartDateRequest {
  fromDate?: number;
  toDate?: number;
}
