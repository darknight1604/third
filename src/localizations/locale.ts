import LocalizedStrings from 'react-native-localization';

export const locales = new LocalizedStrings({
  en: {
    createNote: 'Create Note',
    createDate: 'Create Date',
    note: 'Note',
    create: 'Create',
    valueInput: 'Value',
    valueInputPlaceholder: 'Type your value',
    requiredField: 'This is required field',
    confirmLabel: 'Confirm',
    noteValueTrackingChart: "Note's value",
  },
  vi: {
    createNote: 'Thêm chỉ số',
    createDate: 'Ngày tạo',
    note: 'Ghi chú',
    create: 'Tạo',
    valueInput: 'Chỉ số',
    requiredField: 'Đây là trường bắt buộc',
    valueInputPlaceholder: 'Nhập giá trị',
    confirmLabel: 'Xác nhận',
    noteValueTrackingChart: 'Chỉ số điện',
  },
});
