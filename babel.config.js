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
        },
      },
    ],
  ],
};
