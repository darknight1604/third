### Setup Absolute path - 20250410

- Define path in tsconfig.json
- Install package `npm install --save-dev babel-plugin-module-resolver`
- Update your `babel.config.js`:

```javascript
module.exports = {
  // Something ...
  // Update like below
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
```

### Setup firebase - 20250403

#### General

`npm i @react-native-firebase/app`

#### iOS

- Register app bundle id
- Download then add file `GoogleService-Info.plist` into project by XCode
- Update file /ios/first_host_app/AppDelegate.swift:

```swift
import Firebase
```

```swift
override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure() <-- Add this line>

    // Some code below
  }
```

- Update file ios/Podfile:

```swift
target 'first_host_app' do
  // Some code
  <-- This two lines below -->
  use_frameworks! :linkage => :static
  $RNFirebaseAsStaticFramework = true
  <-- This two lines below -->

  use_react_native!(
    // Some code
  )

  // Some code below
end
```

- Run command:

```shell
cd ios/
pod install --repo-update
cd ..
npx react-native run-ios
```

#### Android

1. Download file `google-services.json` then put it in `android/app/google-services.json`. Need to check app id, namespace of file `MainActivity.kt` and `MainApplication.kt`
2. Update file `android/build.gradle`:

```
dependencies {
    ...
    classpath 'com.google.gms:google-services:4.4.2'
}
```

3. Update file `android/app/build.gradle`:

```
apply plugin: 'com.google.gms.google-services'
///
dependencies {
  implementation platform('com.google.firebase:firebase-bom:33.12.0')
  implementation 'com.google.firebase:firebase-analytics'

  ...
}
```

4. Run these commands:

```
cd android && ./gradlew clean && cd ..
npm run android
```
