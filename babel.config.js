module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@third': './src',
          '@components': './src/components',
          '@utils': './src/utils',
          '@localizations': './src/localizations',
          '@lotties': './src/assets/lotties',
          '@repositories': './src/assets/repositories',
          '@services': './src/assets/services',
        },
      },
    ],
  ],
};
