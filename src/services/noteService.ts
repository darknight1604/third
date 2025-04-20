import {showSnackbar} from '@third/components/global-snackbar/GlobalSnackbarService';
import {DATE_TIME_FORMAT, DURATION_FETCH_NOTE} from '@third/constants';
import {
  CreateNoteRequest,
  IChartDataByMonth,
  IGetChartDateRequest,
  IGetListNoteRequest,
  INote,
  INoteValueByDate,
} from '@third/models/note';
import {formatDate, getDatesInRange, parse} from '@third/utils/dateTimeUtil';
import {getStringValue} from '@third/utils/stringUtil';
import dayjs from 'dayjs';
import BaseService from './baseService';
import {uploadImage} from './fileUploader';
import {NoteLocalRepository, NoteRemoteRepository} from '@third/repositories';

export class NoteService extends BaseService<INote> {
  listNote: INote[];
  fetchTime: dayjs.Dayjs | undefined;
  currentQuery: IGetListNoteRequest | undefined;

  private static instance: NoteService;

  private constructor() {
    super(
      NoteLocalRepository.getInstance(),
      NoteRemoteRepository.getInstance(),
    );
    this.listNote = [];
  }

  static getInstance(): NoteService {
    if (!NoteService.instance) {
      NoteService.instance = new NoteService();
    }
    return NoteService.instance;
  }

  async getChartData({
    fromDate,
    toDate,
  }: IGetChartDateRequest): Promise<IChartDataByMonth | undefined> {
    const listDate = getDatesInRange(fromDate, toDate);
    const rawlistNote = await this.getListNote({
      createdDateFrom: dayjs(fromDate).valueOf(),
      createdDateTo: dayjs(toDate).valueOf(),
    });

    const datas = listDate.map(date => {
      const stringFormattedDate = formatDate(date, DATE_TIME_FORMAT.DATE);
      const filtered = rawlistNote.filter(
        note => note.date === stringFormattedDate,
      );

      const data: INoteValueByDate = {
        date: stringFormattedDate,
        notes: filtered,
      };
      return data;
    });
    const result: IChartDataByMonth = {datas};
    return result;
  }

  async getListNote(queryParams: IGetListNoteRequest) {
    if (this.fetchTime) {
      const now = dayjs();
      const diffInMinutes = now.diff(this.fetchTime, 'minute');
      if (
        diffInMinutes < DURATION_FETCH_NOTE &&
        this.currentQuery?.createdDateFrom === queryParams.createdDateFrom &&
        this.currentQuery?.createdDateTo === queryParams.createdDateTo
      ) {
        return this.listNote;
      }
    }
    if (!queryParams.createdDateFrom || !queryParams.createdDateTo) {
      return this.listNote;
    }

    const result: INote[] = await this.remoteRepo.getList(queryParams);

    this.fetchTime = dayjs();
    this.currentQuery = queryParams;
    this.listNote = [...result];
    return result;
  }

  createNote(params: CreateNoteRequest, onPost?: () => void) {
    try {
      if (params.imageUrl) {
        uploadImage(params.imageUrl, (publicUrl, refPath) => {
          if (!publicUrl) {
            return;
          }
          this.postNote(
            {...params, imageUrl: publicUrl, imageRefPath: refPath},
            onPost,
          );
        });
        return;
      }

      this.postNote(params, onPost);
      return;
    } catch (error) {
      console.error('Firebase error:', error);
      showSnackbar('Your request has been failed');
    }
  }

  private postNote(params: CreateNoteRequest, onPost?: () => void) {
    try {
      const createdDate = parse(getStringValue(params.createdDate));
      const newParams = {
        ...params,
        date: formatDate(createdDate, DATE_TIME_FORMAT.DATE),
        createdDate: createdDate.valueOf(),
      };

      this.remoteRepo.save(newParams, () => {
        showSnackbar('Your request has been successfully');
        onPost?.();
      });
    } catch (error) {
      console.error('Firebase error:', error);
      showSnackbar('Your request has been failed');
    }
  }
}
